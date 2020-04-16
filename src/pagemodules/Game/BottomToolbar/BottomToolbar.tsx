import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import NewGameButton from '../NewGameButton'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import settings from 'store/settings'
import HelpDialogButton from '../HelpDialogButton'
import GithubLogo from 'svg/GithubLogo'

export interface BottomToolbarProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const BottomToolbar: React.FC<BottomToolbarProps> = (props) => {
  const classes = useStyles(props)
  const { className } = props

  const dispatch = useDispatch()
  const settingsData = useSelector((state) => state.settings)

  return (
    <Toolbar className={classNames(className, classes.root)} disableGutters>
      <NewGameButton />
      <HelpDialogButton />
      <IconButton edge="start">
        <GithubLogo />
      </IconButton>
      <FormControlLabel
        label="Animation"
        control={
          <Checkbox
            checked={settingsData.animation}
            onChange={(e) =>
              dispatch(settings.actions.set('animation', e.target.checked))
            }
          />
        }
      />
    </Toolbar>
  )
}

BottomToolbar.defaultProps = {}

export default BottomToolbar
