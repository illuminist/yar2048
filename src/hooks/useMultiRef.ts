import * as React from 'react'

export const useMultiRef = <T extends any>() => {
  const refRefs = React.useRef<React.MutableRefObject<T>[]>([])
  let order = -1
  return {
    nextRef() {
      order += 1
      if (order >= refRefs.current.length) {
        const ref = {
          current: (undefined as any) as T,
        } as React.MutableRefObject<T>
        refRefs.current.push(ref)
        return ref
      }
      return refRefs.current[order]
    },
    currentRef() {
      return refRefs.current[order]
    },
    refs: refRefs,
  }
}

export default useMultiRef
