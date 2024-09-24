import { createSlice } from '@reduxjs/toolkit';
import { dealsjoyallData } from '../actions/dealsjoy.actions';


const userInitialState: any = {
    dealsjoyallData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const dealsjoySlice: any = createSlice({
    name: 'dealsjoyall',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,

    },
    extraReducers: (builder) => {
        builder
        .addCase(dealsjoyallData.pending, (state) => {
          state.dealsjoyallData.error = false;
          state.dealsjoyallData.loading = true;
        })
        .addCase(dealsjoyallData.fulfilled, (state, action) => {
          state.dealsjoyallData.error = false;
          state.dealsjoyallData.loading = false;
          state.dealsjoyallData.data = action.payload;
        })
        .addCase(dealsjoyallData.rejected, (state) => {
          state.dealsjoyallData.error = true;
          state.dealsjoyallData.loading = false;
        });
    },
});
