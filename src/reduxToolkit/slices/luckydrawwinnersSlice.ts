
import { createSlice } from '@reduxjs/toolkit';
import { luckydrawwinnersData } from '../actions/luckydrawwinners.action';

const userInitialState: any = {
    luckydrawwinnersData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const luckydrawwinnersSlice: any = createSlice({
    name: 'luckydrawwinners',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(luckydrawwinnersData.pending, (state) => {
          state.luckydrawwinnersData.error = false;
          state.luckydrawwinnersData.loading = true;
        })
        .addCase(luckydrawwinnersData.fulfilled, (state, action) => {
          state.luckydrawwinnersData.error = false;
          state.luckydrawwinnersData.loading = false;
          state.luckydrawwinnersData.data = action.payload;
        })
        .addCase(luckydrawwinnersData.rejected, (state) => {
          state.luckydrawwinnersData.error = true;
          state.luckydrawwinnersData.loading = false;
        });
    },
});
