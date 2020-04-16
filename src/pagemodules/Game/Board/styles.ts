import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'

export default makeStyles(
  (theme: Theme) => ({
    root: {},
    cell: {
      // width: ({ boardSize }: { boardSize: number }) => `${50 / boardSize}%`,
      paddingBottom: ({ boardSize }: { boardSize: number }) =>
        `${100 / boardSize}%`,
      backgroundColor: blueGrey['A100'],
      borderRadius: 8,
    },
    cellInner: {
      position: 'absolute',
      // width: '100%',
    },
  }),
  { name: 'Board', index: 1 },
)
