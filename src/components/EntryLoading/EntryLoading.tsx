import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Board from 'pagemodules/Game/Board'
import useRefMap2D from 'hooks/useRefMap2D'
import Typography from '@material-ui/core/Typography'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import board, { PieceType } from 'game'
import { Provider } from 'react-redux'
import Piece from 'pagemodules/Game/Piece'
import settings from 'store/settings'

const pieces: PieceType[] = [
  { id: '1', position: [0, 0], score: 2 },
  { id: '2', position: [0, 0], score: 4 },
  { id: '3', position: [0, 0], score: 8 },
]
const store = configureStore({
  reducer: combineReducers({
    board: board.reducer,
    settings: settings.reducer,
  }),
  preloadedState: {
    board: {
      boardSize: 4,
      pieces,
    },
    settings: { animation: false },
  },
  devTools: false,
})

export interface EntryLoadingProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const EntryLoading: React.FC<EntryLoadingProps> = (props) => {
  const classes = useStyles(props)

  const tableRef = React.useRef<HTMLTableElement | null>(null)
  const cellRefMap = useRefMap2D<HTMLTableCellElement>()

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <div className={classes.boardContainer}>
          <Board
            ref={tableRef}
            cellRefs={cellRefMap}
            className={classes.board}
          />
          {pieces.map(({ id }) => (
            <Piece
              className={classNames(
                classes.piece,
                classes[('piece' + id) as keyof typeof classes],
              )}
              tableEl={tableRef.current}
              key={id}
              id={id}
              cellRefMap={cellRefMap}
            />
          ))}
        </div>
        <Typography className={classes.loadingText} variant="h6">
          Now Loading...
        </Typography>
      </div>
    </Provider>
  )
}

EntryLoading.defaultProps = {}

export default EntryLoading
