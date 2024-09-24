
import { createSlice } from '@reduxjs/toolkit';
import { leaderboardData } from '../actions/leaderboard.actions';

const userInitialState: any = {
    leaderboardData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const leaderboardSlice: any = createSlice({
    name: 'leaderboard',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(leaderboardData.pending, (state) => {
          state.leaderboardData.error = false;
          state.leaderboardData.loading = true;
        })
        .addCase(leaderboardData.fulfilled, (state, action) => {
          state.leaderboardData.error = false;
          state.leaderboardData.loading = false;
          state.leaderboardData.data = action.payload;
        })
        .addCase(leaderboardData.rejected, (state) => {
          state.leaderboardData.error = true;
          state.leaderboardData.loading = false;
        });
    },
});
