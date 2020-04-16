import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Link from '@material-ui/core/Link'
import InfoIcon from '@material-ui/icons/Info'

export interface NoScriptProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const NoScript: React.FC<NoScriptProps> = (props) => {
  const classes = useStyles(props)
  const { className } = props
  const Component = 'noscript'

  return (
    <Component
      suppressHydrationWarning
      className={classNames(className, classes.root)}>
      <Dialog open disablePortal classes={{ container: classes.forceOpacity }}>
        <DialogTitle>Javascript is disabled</DialogTitle>
        <DialogContent className={classes.content}>
          <InfoIcon className={classes.icon} />
          <DialogContentText>
            You need to enable JavaScript to run this app. Here are the{' '}
            <Link
              href="https://www.enable-javascript.com/"
              target="_blank"
              rel="noopener noreferrer">
              instructions how to enable JavaScript in your web browser
            </Link>
            .
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Component>
  )
}

NoScript.defaultProps = {}

export default NoScript
