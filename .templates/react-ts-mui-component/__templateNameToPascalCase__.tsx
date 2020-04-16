import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'

export interface __templateNameToPascalCase__Props {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
}

export const __templateNameToPascalCase__: React.FC<__templateNameToPascalCase__Props> = props => {
  const classes = useStyles(props)
  const { className } = props

  return (
    <div className={classNames(className, classes.root)}>
      __templateNameToPascalCase__ component
    </div>
  )
}

__templateNameToPascalCase__.defaultProps = {}

export default __templateNameToPascalCase__
