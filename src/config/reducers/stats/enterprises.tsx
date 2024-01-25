import { type QueryEnterpriseStats } from "@/models/stats.model";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash-es";

const initialState: QueryEnterpriseStats = {
  fromDate: undefined,
  toDate: undefined,
}

export const enterpriseStatsSlice = createSlice({
  name: 'enterpriseStats',
  initialState,
  reducers: {
    setEnterpriseStatsParam: (state, action: PayloadAction<typeof initialState>) => {
      state = merge(state, action.payload)
    },
  },
})

export const { setEnterpriseStatsParam } = enterpriseStatsSlice.actions