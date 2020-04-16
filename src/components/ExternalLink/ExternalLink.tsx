import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'

export interface ExternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
  component?: React.ElementType<React.HTMLProps<HTMLAnchorElement>>
}

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  const classes = useStyles(props)
  const { className, component: Component = 'a', children, ...rest } = props

  return (
    <Component
      className={classNames(className, classes.root)}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}>
      {children}
    </Component>
  )
}

ExternalLink.defaultProps = {}

export default ExternalLink
