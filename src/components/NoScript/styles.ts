import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'fixed',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      // padding: theme.spacing(3),
    },
    icon: {
      alignSelf: 'center',
      width: 80,
      height: 80,
      marginBottom: theme.spacing(1),
    },
    forceOpacity: {
      opacity: '1 !important',
    },
  }),
  { name: 'NoScript', index: 1 },
)
