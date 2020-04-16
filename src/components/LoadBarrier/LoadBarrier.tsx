import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

export interface LoadBarrierProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const LoadBarrier: React.FC<LoadBarrierProps> = (props) => {
  const classes = useStyles(props)
  const { className, children } = props

  const [state, setState] = React.useState(false)
  const [entered, setEntered] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setState(true), 1)
  }, [])

  const handleEntered = React.useCallback(() => setEntered(true), [])

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.inProgress]: !entered,
      })}>
      <SwitchTransition>
        <CSSTransition
          key={state ? 'loaded' : 'loading'}
          classNames={{
            enter: classes.childrenEnter,
            enterActive: classes.childrenEnterActive,
            exit: classes.childrenExit,
            exitActive: classes.childrenExitActive,
          }}
          onEntered={handleEntered}
          timeout={1000}>
          {state ? children : <span>Loading</span>}
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

LoadBarrier.defaultProps = {}

export default LoadBarrier
