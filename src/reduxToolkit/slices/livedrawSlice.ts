import { createSlice } from '@reduxjs/toolkit';
import { livedrawData } from '../actions/livedraw.actions';

const userInitialState: any = {
    livedrawData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const livedrawSlice: any = createSlice({
    name: 'livedraw',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(livedrawData.pending, (state) => {
          state.livedrawData.error = false;
          state.livedrawData.loading = true;
        })
        .addCase(livedrawData.fulfilled, (state, action) => {
          state.livedrawData.error = false;
          state.livedrawData.loading = false;
          state.livedrawData.data = action.payload;
        })
        .addCase(livedrawData.rejected, (state) => {
          state.livedrawData.error = true;
          state.livedrawData.loading = false;
        });
    },
});
