import { combineReducers } from '@reduxjs/toolkit'
import { packageSlice } from './packages'
import { singlePackageSlice } from './package'

const rootReducers = combineReducers({
  // Add reducers here
  [packageSlice.name]: packageSlice.reducer,
  [singlePackageSlice.name]: singlePackageSlice.reducer,
})

export default rootReducers
