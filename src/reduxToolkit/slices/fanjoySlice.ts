
import { createSlice } from '@reduxjs/toolkit';
import { fanjoyData } from '../actions/fanjoy.actions';


const userInitialState: any = {
    fanjoyData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const fanjoySlice: any = createSlice({
    name: 'fanjoy',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fanjoyData.pending, (state) => {
          state.fanjoyData.error = false;
          state.fanjoyData.loading = true;
        })
        .addCase(fanjoyData.fulfilled, (state, action) => {
          state.fanjoyData.error = false;
          state.fanjoyData.loading = false;
          state.fanjoyData.data = action.payload;
        })
        .addCase(fanjoyData.rejected, (state) => {
          state.fanjoyData.error = true;
          state.fanjoyData.loading = false;
        });
    },
});
