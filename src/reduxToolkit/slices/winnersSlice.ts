import { createSlice } from '@reduxjs/toolkit';
import { winnersData } from '../actions/winners.actions';


const userInitialState: any = {
    winnersData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const winnersSlice: any = createSlice({
    name: 'winners',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(winnersData.pending, (state) => {
          state.winnersData.error = false;
          state.winnersData.loading = true;
        })
        .addCase(winnersData.fulfilled, (state, action) => {
          state.winnersData.error = false;
          state.winnersData.loading = false;
          state.winnersData.data = action.payload;
        })
        .addCase(winnersData.rejected, (state) => {
          state.winnersData.error = true;
          state.winnersData.loading = false;
        });
    },
});
