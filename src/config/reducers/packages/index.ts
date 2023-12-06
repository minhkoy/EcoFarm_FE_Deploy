import { type QueryPackage } from '@/models/package.model'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash-es'

const initialState: QueryPackage = {
  keyword: '',
  page: 1,
  limit: 20,
}

export const { actions, reducer } = createSlice({
  name: 'package/slices',
  initialState,
  reducers: {
    setFilterParams: (state, action: PayloadAction<typeof initialState>) => {
      const previousState = { ...state }
      const mergered = merge(previousState, action.payload)
      state = mergered
    },
  },
})

export const { setFilterParams } = actions
export const packageReducer = reducer
