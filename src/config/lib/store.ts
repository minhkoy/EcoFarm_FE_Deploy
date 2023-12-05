import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import filterReducer from '../reducers/filterReducer'

const store = configureStore({
  reducer: {
    filterParams: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(logger),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
