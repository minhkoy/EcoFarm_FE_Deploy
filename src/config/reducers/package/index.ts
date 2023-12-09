import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { QuerySinglePackage } from 'src/models/package.model'

const initialState: QuerySinglePackage = {
  id: '',
  code: '',
}

export const singlePackageSlice = createSlice({
  name: 'singlePackage',
  initialState,
  reducers: {
    setPackgageId: (state, action: PayloadAction<string>) => { 
      state.id = action.payload
      state.code = action.payload
    }
  }
})

export const { setPackgageId } = singlePackageSlice.actions
