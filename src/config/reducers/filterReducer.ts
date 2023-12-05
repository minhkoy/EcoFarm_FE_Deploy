import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  q: '',
  page: 1,
  limit: 20,
}

export const filterSlice = createSlice({
  name: 'Filter-Params',
  initialState,
  reducers: {
    setFilterParams: (state, action: PayloadAction<typeof initialState>) => {
      state.q = action.payload.q
      state.page = action.payload.page
      state.limit = action.payload.limit
    },
  },
})

export const { setFilterParams } = filterSlice.actions
export default filterSlice.reducer
