import throttle from 'lodash/throttle'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ResizeObserver from 'resize-observer-polyfill'

type Callback = (element: ResizeObserverEntry, observer: ResizeObserver) => void
const storeMap = new WeakMap<
  HTMLElement,
  { off: () => void; callback: Set<Callback> }
>()

const useResizeObserver = <E extends HTMLElement>(
  el: E | null | undefined,
  callback: Callback,
) => {
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback
  React.useEffect(() => {
    if (el) {
      if (!storeMap.has(el)) {
        const ro = new ResizeObserver(
          throttle(
            (entries, observer) => {
              const store = storeMap.get(el)
              if (store) {
                ReactDOM.unstable_batchedUpdates(() => {
                  entries.forEach(e =>
                    store.callback.forEach(fn => fn(e, observer)),
                  )
                })
              }
            },
            100,
            { leading: false },
          ),
        )
        ro.observe(el)
        storeMap.set(el, {
          callback: new Set(),
          off: () => {
            ro.unobserve(el)
          },
        })
      }

      const store = storeMap.get(el)!
      const cbWrap: Callback = (e, o) => {
        callbackRef.current(e, o)
      }
      store.callback.add(cbWrap)

      return () => {
        const store = storeMap.get(el)!
        store.callback.delete(cbWrap)
        if (!store.callback.size) {
          store.off()
          storeMap.delete(el)
        }
      }
    }
  }, [el])
}

export default useResizeObserver
