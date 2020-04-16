import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import CleanCSS from 'clean-css'
import { ServerStyleSheets, createGenerateClassName } from '@material-ui/core'

const generateClassName = createGenerateClassName({
  productionPrefix: 'yar',
  disableGlobal: true,
})

const sheets = new ServerStyleSheets({
  serverGenerateClassName: generateClassName,
})

const el = sheets.collect(React.createElement(App))

const html = ReactDOMServer.renderToString(el)
console.log(el)

console.log(html)
console.log(
  new CleanCSS({ level: { 2: { all: true } } }).minify(sheets.toString())
    .styles,
)
