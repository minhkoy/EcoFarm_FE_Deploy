import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { packageSlice } from './packages'
import { singlePackageSlice } from './package'

const rootReducers = combineReducers({
  // Add reducers here
  [packageSlice.name]: packageSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [singlePackageSlice.name]: singlePackageSlice.reducer,
})

export default rootReducers
