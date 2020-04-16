import makeStyles from 'theme/makeStyles'
import { Theme } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'

const colorShade = [300, 500, 700] as const
const colorHue = [
  colors.yellow,
  colors.orange,
  colors.red,
  colors.pink,
  colors.purple,
  colors.indigo,
  colors.blue,
  colors.cyan,
  colors.teal,
  colors.green,
  colors.lime,
]

const pieceColors = colorHue.flatMap((h) =>
  colorShade.map((s) => {
    return h[s]
  }),
)

const getColor = (score: number) => {
  const i = Math.log2(score)
  return pieceColors[Math.floor(i % pieceColors.length)]
}

export default makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'absolute',
      backgroundColor: ({ score }: { score: number; animation: boolean }) =>
        getColor(score),
      color: ({ score }) => theme.palette.getContrastText(getColor(score)),
      borderRadius: 8,
      zIndex: 2,
      transition: ({ animation }) =>
        animation
          ? theme.transitions.create(['background-color', 'color'])
          : 'none',
    },
    removed: {
      // visibility: 'hidden',
      zIndex: 1,
    },
    scoreText: {
      color: 'inherit',
      fontSize: ({ score }) => (score < 1000 ? 48 : 36),
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
  { name: 'Piece', index: 1 },
)
