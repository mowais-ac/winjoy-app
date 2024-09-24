import { createSlice } from '@reduxjs/toolkit';
import { joingameshowData } from '../actions/joinGameshow.actions';


const userInitialState: any = {
    joingameshowData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const joinGameshowSlice: any = createSlice({
    name: 'joingameshow',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(joingameshowData.pending, (state) => {
          state.joingameshowData.error = false;
          state.joingameshowData.loading = true;
        })
        .addCase(joingameshowData.fulfilled, (state, action) => {
          state.joingameshowData.error = false;
          state.joingameshowData.loading = false;
          state.joingameshowData.data = action.payload;
        })
        .addCase(joingameshowData.rejected, (state) => {
          state.joingameshowData.error = true;
          state.joingameshowData.loading = false;
        });
    },
});