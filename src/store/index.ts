import { configureStore, combineReducers } from '@reduxjs/toolkit'
import board from '../game'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settings from './settings'

const persistConfig = {
  key: 'game',
  storage,
}

export type StoreState = ReturnType<typeof store.getState>

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      board: board.reducer,
      settings: settings.reducer,
    }),
  ),
  preloadedState: {
    board: {},
  },
})

export const persistor = persistStore(store)
export default store
