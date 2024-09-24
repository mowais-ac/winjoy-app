
import { createSlice } from '@reduxjs/toolkit';
import { gameshowwinnersData } from '../actions/gameshowwinners.actions';


const userInitialState: any = {
    gameshowwinnersData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const gameshowwinnersSlice: any = createSlice({
    name: 'gameshowwinners',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(gameshowwinnersData.pending, (state) => {
          state.gameshowwinnersData.error = false;
          state.gameshowwinnersData.loading = true;
        })
        .addCase(gameshowwinnersData.fulfilled, (state, action) => {
          state.gameshowwinnersData.error = false;
          state.gameshowwinnersData.loading = false;
          state.gameshowwinnersData.data = action.payload;
        })
        .addCase(gameshowwinnersData.rejected, (state) => {
          state.gameshowwinnersData.error = true;
          state.gameshowwinnersData.loading = false;
        });
    },
});
