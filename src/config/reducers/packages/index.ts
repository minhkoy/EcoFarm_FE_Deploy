import { type QueryMyRegisteredPackages, type QueryPackages } from '@/models/package.model'
import { EFX } from '@/utils/constants/constants'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash-es'

const initialQueryPackagesState: QueryPackages = {
  enterpriseId: '',
  isEnded: undefined,
  isStarted: undefined,
  priceFrom: 0,
  priceTo: 0,
  keyword: '',
  page: 1,
  limit: 10,
}

const initQueryMyRegisteredPackagesState: QueryMyRegisteredPackages = {
  keyword: '',
  page: EFX.DEFAULT_PAGE,
  limit: EFX.DEFAULT_LIMIT,
  enterpriseId: '',
  isActive: undefined,
  isFinished: undefined,
}

export const packageSlice = createSlice({
  name: 'package',
  initialState: initialQueryPackagesState,
  reducers: {
    setFilterParams: (state, action: PayloadAction<typeof initialQueryPackagesState>) => {
      state = merge(state, action.payload)
    },
  },
})

export const myPackageSlice = createSlice({
  name: 'myPackage',
  initialState: initQueryMyRegisteredPackagesState,
  reducers: {
    setMyPackagesFilterParams: (state, action: PayloadAction<typeof initQueryMyRegisteredPackagesState>) => {
      state = merge(state, action.payload)
    },
  },
})

export const { setFilterParams } = packageSlice.actions
export const { setMyPackagesFilterParams } = myPackageSlice.actions
