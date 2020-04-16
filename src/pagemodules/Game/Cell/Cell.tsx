import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'

export interface CellProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const Cell: React.FC<CellProps> = props => {
  const classes = useStyles(props)
  const { className } = props

  return (
    <div className={classNames(className, classes.root)}>
      Cell component
    </div>
  )
}

Cell.defaultProps = {}

export default Cell
