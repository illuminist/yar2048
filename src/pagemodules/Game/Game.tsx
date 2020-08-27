import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Board from './Board'
import useRefMap2D from 'hooks/useRefMap2D'
import { useSelector, useDispatch } from 'react-redux'
import Piece from './Piece'
import * as game from 'game'
import DragControl from './DragControl'
import { DragContextProvider } from './DragControl/DragContext'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import BottomToolbar from './BottomToolbar'
import useResizeObserver from 'hooks/useResizeObserver'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Theme } from '@material-ui/core'

export interface GameProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const Game: React.FC<GameProps> = (props) => {
  const { className } = props

  const tableRef = React.useRef<HTMLTableElement | null>(null)
  const cellRefMap = useRefMap2D<HTMLTableCellElement>()
  const pieces = useSelector((state) => state.board.pieces)
  const { boardSize } = useSelector((state) => state.board)
  const classes = useStyles({ boardSize })

  const debugDraw = false

  const dispatch = useDispatch()

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  canvasRef.current
    ?.getContext('2d')
    ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

  React.useLayoutEffect(() => {
    if (!pieces) {
      dispatch(game.newGame({ boardSize: 4 }))
    }
  }, [pieces])

  const [tableWidth, setTableWidth] = React.useState(0)
  useResizeObserver(tableRef.current, (e) => {

    setTableWidth(e.contentRect.width)
  })

  React.useLayoutEffect(() => {
    const table = tableRef.current
    if (table) {
      setTableWidth(table.getBoundingClientRect().width)
    }
  }, [tableRef.current])

  const matchXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

  if (!pieces) return null

  return (
    <DragContextProvider>
      <Container className={classNames(className, classes.root)} maxWidth="md">
        <Typography variant={matchXs ? 'h2' : 'h1'}>YAR2048</Typography>
        <Typography variant="caption" gutterBottom>
          Yet Another React 2048
        </Typography>
        <div className={classes.boardContainer}>
          <Board
            className={classes.board}
            ref={tableRef}
            cellRefs={cellRefMap}
          />
          {pieces.map(({ id }) => (
            <Piece
              id={id}
              cellRefMap={cellRefMap}
              tableEl={tableRef.current}
              tableWidth={tableWidth}
              debugCanvasContext={
                canvasRef.current?.getContext('2d') || undefined
              }
              key={id}
            />
          ))}
          {debugDraw && (
            <canvas
              className={classes.debugCanvas}
              ref={canvasRef}
              {..._.pick(
                tableRef.current?.getBoundingClientRect(),
                'height',
                'width',
              )}
            />
          )}
          <DragControl className={classes.dragControl} />
        </div>
        <BottomToolbar />
      </Container>
    </DragContextProvider>
  )
}

Game.defaultProps = {}

export default Game
