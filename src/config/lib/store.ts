import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import packageReducer from '../reducers/packages'

const store = configureStore({
  reducer: {
    package: packageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
