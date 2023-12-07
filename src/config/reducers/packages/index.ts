import { type QueryPackage } from '@/models/package.model'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep, merge } from 'lodash-es'

const initialState: QueryPackage = {
  keyword: '',
  page: 1,
  limit: 10,
}

export const { actions, reducer } = createSlice({
  name: 'package/slices',
  initialState,
  reducers: {
    setFilterParams: (state, action: PayloadAction<typeof initialState>) => {
      const previousState = cloneDeep(state)
      console.log('previousState', merge(previousState, action.payload))
      state = merge(previousState, action.payload)
      // state = action.payload
    },
  },
})

export const { setFilterParams } = actions
const packageReducer = reducer
export default packageReducer