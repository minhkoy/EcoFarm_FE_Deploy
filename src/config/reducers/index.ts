import { combineReducers } from '@reduxjs/toolkit'
import { packageSlice } from './packages'

const rootReducers = combineReducers({
  // Add reducers here
  [packageSlice.name]: packageSlice.reducer,
})

export default rootReducers
