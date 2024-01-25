import { type QueryProducts } from "@/models/product.model"
import { SORTING_PRODUCT_TYPE } from "@/utils/constants/enums"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { merge } from "lodash-es"

const initialState: QueryProducts = {
  enterpriseId: '',
  isActive: true,
  keyword: '',
  page: 1,
  limit: 10,
  packageId: '',
  minimumQuantity: 0,
  maximumQuantity: 0,
  minimumPrice: 0,
  maximumPrice: 0,
  sortingProductOrder: SORTING_PRODUCT_TYPE.Newest,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductFilterParams: (state, action: PayloadAction<typeof initialState>) => {
      state = merge(state, action.payload)
    },
  },
})

export const { setProductFilterParams } = productSlice.actions