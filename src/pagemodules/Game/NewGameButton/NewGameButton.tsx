import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { newGame } from 'game'

type ValueType = {
  boardSize: number
  seed: string
}

const defaultValue: ValueType = { boardSize: 4, seed: '' }

export interface NewGameButtonProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const NewGameButton: React.FC<NewGameButtonProps> = (props) => {
  const classes = useStyles(props)
  const { className } = props

  const [open, setOpen] = React.useState(false)
  const handleClose = React.useCallback(() => setOpen(false), [])
  const handleOpen = React.useCallback(() => setOpen(true), [])

  const dispatch = useDispatch()
  const handleSubmit = (value: ValueType, a: any) => {
    dispatch(newGame(value))
    handleClose()
  }

  return (
    <>
      <Button
        className={classNames(className, classes.root)}
        color="primary"
        variant="contained"
        onClick={handleOpen}>
        New Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Formik initialValues={defaultValue} onSubmit={handleSubmit}>
          <Form>
            <DialogTitle>Create a new game</DialogTitle>
            <DialogContent>
              <FormGroup>
                <Field
                  required
                  as={TextField}
                  name="boardSize"
                  label="Board size"
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{
                    min: 4,
                    max: 10,
                    pattern: /\d*/,
                  }}
                />
                <Field
                  as={TextField}
                  name="seed"
                  label="Seed"
                  margin="normal"
                  variant="outlined"
                  helperText="Left blank for random seed"
                />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  )
}

NewGameButton.defaultProps = {}

export default NewGameButton
