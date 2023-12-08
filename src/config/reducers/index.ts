import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { packageSlice } from './packages'

const rootReducers = combineReducers({
  // Add reducers here
  [packageSlice.name]: packageSlice.reducer,
  [authSlice.name]: authSlice.reducer,
})

export default rootReducers
