import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import ExternalLink from 'components/ExternalLink'

export interface HelpDialogButtonProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

const homepageLink = 'https://github.com/illuminist'
const githubRepo = 'https://github.com/illuminist/yar2048'

export const HelpDialogButton: React.FC<HelpDialogButtonProps> = (props) => {
  const classes = useStyles(props)
  const { className } = props

  const [open, setOpen] = React.useState(false)
  const handleClose = React.useCallback(() => setOpen(false), [])
  const handleOpen = React.useCallback(() => setOpen(true), [])

  return (
    <>
      <IconButton
        className={classNames(className, classes.root)}
        onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yet Another React 2048</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" gutterBottom>
              Created by{' '}
              <ExternalLink component={Link} href={homepageLink}>
                Witsarut Sawetkanit
              </ExternalLink>
              . Based on{' '}
              <ExternalLink
                component={Link}
                href="https://itunes.apple.com/us/app/1024!/id823499224">
                1024 by Veewo Studio
              </ExternalLink>{' '}
              and conceptually similar to{' '}
              <ExternalLink component={Link} href="http://asherv.com/threes/">
                Threes by Asher Vollmer
              </ExternalLink>
              .
              <br />
              <br />
              <ExternalLink component={Link} href={githubRepo}>
                Github repository
              </ExternalLink>
            </Typography>
            <Typography variant="h5" gutterBottom>
              Rules and how to play
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use keyboard's arrow keys, mouse click and drag, or touch drag to
              slide tile pieces in 4 directions: up, down, left, and right. Each
              tile piece has score on it, sliding them into another tile piece
              with same score will combine both tile piece together.
              <br />
              <br />
              Try to reach a piece with 2048 score and so on!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Privacy policy
            </Typography>
            <Typography variant="body2" gutterBottom>
              No personal infomation is collected and send to the server. No
              cookie use. Only infomation is your game saved data that will be
              stored on your web browser's local storage and never sent to any
              third-party or us. This piece of data allow you to continue your
              game from where you left off.
              <br />
              <br />
              This policy is subjected to be changed in future.
            </Typography>
            <Typography variant="h5" gutterBottom>
              MIT License
            </Typography>
            <Typography variant="body2" gutterBottom>
              Copyright 2020 © Witsarut Sawetkanit (
              <ExternalLink component={Link} href={homepageLink}>
                {homepageLink}
              </ExternalLink>
              )
              <br />
              <br />
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
              <ul>
                <li>
                  The above copyright notice and this permission notice shall be
                  included in all copies or substantial portions of the
                  Software.
                </li>
              </ul>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Addition notes
            </Typography>
            <Typography variant="body2" gutterBottom>
              I wrote the policy myself, without any back about law and
              management knowledge, and my primary language isn't English. If
              you find any improvement and willing to help me to improve policy
              document, feel free to open an issue or pull request on{' '}
              <ExternalLink component={Link} href={githubRepo}>
                github repository page
              </ExternalLink>
              .
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

HelpDialogButton.defaultProps = {}

export default HelpDialogButton
