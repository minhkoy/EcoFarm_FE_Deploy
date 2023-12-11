import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { packageSlice } from './packages'
import { singlePackageSlice } from './package'
import { packageReviewsSlice } from './packageReviews'

const rootReducers = combineReducers({
  // Add reducers here
  [packageSlice.name]: packageSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [singlePackageSlice.name]: singlePackageSlice.reducer,
  [packageReviewsSlice.name]: packageReviewsSlice.reducer,
})

export default rootReducers
