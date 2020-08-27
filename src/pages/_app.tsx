import React from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from 'store'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  StylesProvider,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import { theme } from 'theme'
import { PersistGate } from 'redux-persist/integration/react'
import EntryLoading from 'components/EntryLoading'
import NextApp from 'next/app'
import Head from 'next/head'
import { generateClassName } from 'theme/makeStyles'
import { NoSsr } from '@material-ui/core'

const completedTheme = createMuiTheme(theme)

export class MyApp extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    const P = (
      <Provider store={store}>
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="title" content="YAR2048" />
          <meta name="description" content="Yet Another React 2048 Game" />
          <title>Yet Another React 2048</title>
        </Head>
        <StylesProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={completedTheme}>
            <CssBaseline>
              <NoSsr defer fallback={<EntryLoading />}>
                <PersistGate loading={<EntryLoading />} persistor={persistor}>
                  <Component {...pageProps} />
                </PersistGate>
              </NoSsr>
            </CssBaseline>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    )

    // if (process.browser) return <BrowserRouter>{P}</BrowserRouter>

    return P
  }
}

export default MyApp
