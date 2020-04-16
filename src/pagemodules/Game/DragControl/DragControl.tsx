import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { MoveSet, move } from 'game'
import {
  useDragDispatch,
  dragEnd,
  dragStart as dragStartControl,
  changeDirection,
} from './DragContext'

const arrowKeyDirMap: { [key: string]: MoveSet } = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowRight: 'right',
}

export interface DragControlProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const DragControl: React.FC<DragControlProps> = (props) => {
  const classes = useStyles(props)
  const { className } = props

  const dispatch = useDispatch()
  const controlDispatch = useDragDispatch()

  const [dragStart, setDragStart] = React.useState<{
    x: number
    y: number
  } | null>(null)
  const [dragDir, setDragDir] = React.useState<MoveSet | null>(null)
  const [controlFocused, setFocus] = React.useState(false)

  const nextValidMoves = useSelector((state) => state.board.nextValidMoves)

  // Handle keyboard control
  React.useEffect(() => {
    // if (!controlFocused) return
    let nextDir: null | MoveSet = null
    const handleKeyDown = (e: KeyboardEvent) => {
      const dir = arrowKeyDirMap[e.key]
      if (dir) {
        e.preventDefault()
        nextDir = dir
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const dir = arrowKeyDirMap[e.key]
      if (dir && nextDir === dir && nextValidMoves.includes(nextDir)) {
        dispatch(move(dir))
      } else {
        nextDir = null
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [controlFocused, nextValidMoves])

  // Handle mouse and touch control
  const handleDragMove = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      if (!dragStart) return

      const lp = 'touches' in e ? e.touches[0] : e
      const dx = lp.clientX - dragStart.x
      const dy = lp.clientY - dragStart.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d > 60) {
        const r = Math.atan2(dy, dx)
        const dir: MoveSet =
          Math.abs(r) < Math.PI * 0.25
            ? 'right'
            : Math.abs(r) > Math.PI * 0.75
            ? 'left'
            : r < 0
            ? 'up'
            : 'down'

        if (nextValidMoves.includes(dir)) {
          setDragDir(dir)
          controlDispatch(changeDirection(dir))
        } else {
          setDragDir(null)
          controlDispatch(changeDirection(null))
        }
      } else {
        setDragDir(null)
        controlDispatch(changeDirection(null))
      }
    },
    [dragStart, nextValidMoves],
  )

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (nextValidMoves.length > 0) {
      const lp = 'touches' in e ? e.touches[0] : e
      setDragStart({ x: lp.clientX, y: lp.clientY })
      controlDispatch(dragStartControl())
    }
  }

  const handleDragEnd = React.useCallback(() => {
    if (dragDir) {
      dispatch(move(dragDir))
    }

    controlDispatch(dragEnd())
    setDragStart(null)
    setDragDir(null)
  }, [dragDir])

  React.useEffect(() => {
    if (dragStart) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('touchmove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchend', handleDragEnd)
      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('touchmove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [dragStart, handleDragMove, handleDragEnd])

  return (
    <div
      tabIndex={0}
      className={classNames(className, classes.root)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    />
  )
}

DragControl.defaultProps = {}

export default DragControl
