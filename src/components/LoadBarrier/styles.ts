import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles(
  (theme: Theme) => ({
    root: {},
    inProgress: {
      perspective: '200px',
    },
    childrenEnter: {
      opacity: 0,
      transform: 'translate3d(0, 1vw, -250px) rotate3d(1, 0, 0, 30deg)',
    },
    childrenEnterActive: {
      opacity: 1,
      transform: 'none',

      transition: 'opacity 1000ms ease-in, transform 1000ms ease-out',
    },
    childrenExit: {
      opacity: 1,
      transform: 'none',
    },
    childrenExitActive: {
      opacity: 0,
      transform: 'translate3d(0, 100px, -150px)',
      transition: 'opacity 300ms, transform 300ms ease-in',
    },
  }),
  { name: 'LoadBarrier', index: 1 },
)
