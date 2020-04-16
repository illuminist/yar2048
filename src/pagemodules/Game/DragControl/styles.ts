import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles(
  (theme: Theme) => ({
    root: {
      userSelect: 'none',
      zIndex: 20,
      cursor: 'pointer',
      touchAction: 'none',
    },
  }),
  { name: 'DragControl', index: 1 },
)
