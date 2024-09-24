

import { createSlice } from '@reduxjs/toolkit';
import { walletData } from '../actions/wallet.actions';


const userInitialState: any = {
    walletData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const walletSlice: any = createSlice({
    name: 'wallet',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(walletData.pending, (state) => {
          state.walletData.error = false;
          state.walletData.loading = true;
        })
        .addCase(walletData.fulfilled, (state, action) => {
          state.walletData.error = false;
          state.walletData.loading = false;
          state.walletData.data = action.payload;
        })
        .addCase(walletData.rejected, (state) => {
          state.walletData.error = true;
          state.walletData.loading = false;
        });
    },
});