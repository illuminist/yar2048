import React from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import Game from 'pagemodules/Game'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  StylesProvider,
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'
import { theme } from 'theme'
import { PersistGate } from 'redux-persist/integration/react'
import EntryLoading from 'components/EntryLoading'
import NoScript from 'components/NoScript'

const completedTheme = createMuiTheme(theme)
const generateClassName = createGenerateClassName({
  productionPrefix: 'yar',
  disableGlobal: true,
})

function App() {
  return (
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={completedTheme}>
          <CssBaseline>
            <NoScript />
            {/* <EntryLoading /> */}
            <PersistGate loading={<EntryLoading />} persistor={persistor}>
              <Game />
            </PersistGate>
          </CssBaseline>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  )
}

export default App
