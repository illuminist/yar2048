import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import numeral from 'numeral'
import useStyles from './styles'
import Card from '@material-ui/core/Card'
import { RefMap2D } from 'hooks/useRefMap2D'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { useSpring, animated } from 'react-spring'
import { StoreState } from 'store'
import { NumberPair } from 'game'
import { useDragState } from '../DragControl/DragContext'

const pieceByIdSelector = createSelector(
  (state: StoreState) => state.board.pieces,
  (pieces) => _.keyBy(pieces, 'id'),
)

export interface PieceProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
  cellRefMap: RefMap2D<HTMLTableCellElement>
  tableEl: HTMLTableElement | null
  debugCanvasContext?: CanvasRenderingContext2D
  tableWidth?: number
  id: string
}

const defaultPosition = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
}

export const Piece: React.FC<PieceProps> = (props) => {
  const {
    className,
    id,
    tableEl,
    cellRefMap,
    debugCanvasContext: cv,
    tableWidth,
  } = props

  const pieceData = useSelector((state) => pieceByIdSelector(state)[id])
  const animationEnabled = useSelector((state) => state.settings.animation)

  const classes = useStyles({
    score: pieceData.score,
    animation: animationEnabled,
  })

  const [style, setStyle] = React.useState(defaultPosition)
  const [fromStyle, setFromStyle] = React.useState(defaultPosition)

  const { isDragging, direction } = useDragState()

  const getStyle = (cell: HTMLTableCellElement) => {
    const table = tableEl
    if (cell && table) {
      const cellRect = cell.getBoundingClientRect()
      const tableRect = table.getBoundingClientRect()

      return {
        top: cellRect.top - tableRect.top,
        left: cellRect.left - tableRect.left,
        width: cellRect.width,
        height: cellRect.height,
      }
    }
    return defaultPosition
  }

  React.useLayoutEffect(() => {
    const cell = cellRefMap(pieceData.position[0], pieceData.position[1])
      .current
    const table = tableEl
    if (cell && table) {
      const cellRect = cell.getBoundingClientRect()
      const tableRect = table.getBoundingClientRect()

      setStyle(getStyle(cell))
      const from = pieceData.moved?.from

      if (from) {
        const fromCell = cellRefMap(from[0], from[1])
        setFromStyle(getStyle(fromCell.current))
      }

      if (cv) {
        if (pieceData.moved) {
          const offset = parseInt(pieceData.id, 36) % 40
          const centerTo = [
            cellRect.left - tableRect.left + cellRect.width / 2 + offset,
            cellRect.top - tableRect.top + cellRect.height / 2 + offset,
          ] as NumberPair
          if (from) {
            const fromCell = cellRefMap(from[0], from[1])
            const fromRect = fromCell.current.getBoundingClientRect()
            const centerFrom = [
              fromRect.left - tableRect.left + fromRect.width / 2 + offset,
              fromRect.top - tableRect.top + fromRect.height / 2 + offset,
            ] as NumberPair

            cv.lineCap = 'round'
            cv.beginPath()
            cv.moveTo(...centerFrom)
            cv.lineTo(...centerTo)
            if (pieceData.removed) {
              cv.lineTo(centerTo[0] + 20, centerTo[1] + 20)
            }
            cv.stroke()
          } else if (from === null) {
            cv.fillText('A', ...centerTo)
          }
        }
      }
    }
  }, [
    pieceData.id,
    pieceData.position,
    pieceData.moved,
    pieceData.removed,
    tableWidth,
    cv,
    tableEl,
  ])

  const animatedStyle = useSpring({
    from:
      pieceData.moved?.from === null
        ? { ...style, width: 0, height: 0 }
        : fromStyle,
    to: isDragging
      ? {
          ...style,
          top:
            style.top -
            10 +
            (direction === 'up' ? -20 : direction === 'down' ? 20 : 0),
          left:
            style.left +
            (direction === 'left' ? -20 : direction === 'right' ? 20 : 0),
        }
      : style,
    delay: pieceData.moved?.from === null ? 100 : 0,
    config: { mass: 1, tension: 300, friction: 26 },
  })

  return (
    <Card
      elevation={0}
      component={animated.div}
      className={classNames(className, classes.root, {
        [classes.removed]: pieceData.removed,
      })}
      style={animationEnabled ? animatedStyle : style}>
      <span className={classes.scoreText}>
        {pieceData.score > 2048
          ? numeral(pieceData.score).format('0a')
          : pieceData.score}
      </span>
    </Card>
  )
}

Piece.defaultProps = {}

export default Piece
