import {createSlice} from '@reduxjs/toolkit';
import {livePlanData} from '../actions/livePlans.action';

const userInitialState: any = {
  livePlanData: {
    loading: true,
    data: [],
    error: false,
  },
};

export const livePlanSlice: any = createSlice({
  name: 'livePlans',
  initialState: userInitialState || {},
  reducers: {
    resetUserSlice: () => userInitialState,
  },
  extraReducers: builder => {
    builder
      .addCase(livePlanData.pending, state => {
        state.livePlanData.error = false;
        state.livePlanData.loading = true;
      })
      .addCase(livePlanData.fulfilled, (state, action) => {
        state.livePlanData.error = false;
        state.livePlanData.loading = false;
        state.livePlanData.data = action.payload;
      })
      .addCase(livePlanData.rejected, state => {
        state.livePlanData.error = true;
        state.livePlanData.loading = false;
      });
  },
});
