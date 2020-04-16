import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'

const translateTo = (x: number, y: number) => {
  return `translate(${x * 50}px, ${y * 54}px)`
}

export default makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    boardContainer: {
      position: 'relative',
    },
    loadingText: {
      textAlign: 'center',
    },
    board: {
      width: 200,
    },
    piece: {
      width: '48px !important',
      height: '48px !important',
      marginTop: 2,
      marginRight: 2,
      animationTimingFunction: 'ease',
      animationDuration: '3s',
      animationDelay: '0.2s',
      animationIterationCount: 'infinite',
      // animationDirection: 'alternate',
    },
    piece1: {
      animationName: '$pieceAnim1',
    },
    piece2: {
      animationName: '$pieceAnim2',
    },
    piece3: {
      animationName: '$pieceAnim3',
    },
    '@keyframes pieceAnim1': {
      '0%': { transform: translateTo(0, 0) },
      '25%': { transform: translateTo(2, 0) },
      '50%': { transform: translateTo(2, 2) },
      '75%': { transform: translateTo(0, 2) },
    },
    '@keyframes pieceAnim2': {
      '0%': { transform: translateTo(1, 1) },
      '25%': { transform: translateTo(2, 1) },
      '50%': { transform: translateTo(2, 3) },
      '75%': { transform: translateTo(1, 3) },
      '100%': { transform: translateTo(1, 1) },
    },
    '@keyframes pieceAnim3': {
      '0%': { transform: translateTo(2, 0) },
      '25%': { transform: translateTo(3, 0) },
      '50%': { transform: translateTo(3, 3) },
      '75%': { transform: translateTo(2, 3) },
      '100%': { transform: translateTo(2, 0) },
    },
  }),
  { name: 'EntryLoading', index: 1 },
)
