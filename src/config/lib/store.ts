import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { packageSlice } from '../reducers/packages'

const store = configureStore({
  reducer: {
    package: packageSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
