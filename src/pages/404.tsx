import * as React from 'react'
import NextRouter from 'next/router'

const NotFoundPage = () => {
  React.useEffect(() => {
    NextRouter.replace('/')
  }, [])

  return null
}

export default NotFoundPage
