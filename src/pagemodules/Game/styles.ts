import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    boardContainer: {
      position: 'relative',
      alignSelf: 'center',
      maxWidth: 'calc(100vw - 32px)',
      width: ({ boardSize }: { boardSize: number }) =>
        boardSize * (120 - (boardSize - 4) * 10),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    board: {
      width: '100%',
    },
    debugCanvas: {
      position: 'absolute',
      top: 0,
      zIndex: 15,
    },
    dragControl: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
    },
  }),
  { name: 'Game', index: 1 },
)
