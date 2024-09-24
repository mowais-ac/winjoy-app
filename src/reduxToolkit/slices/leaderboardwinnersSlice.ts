import { createSlice } from '@reduxjs/toolkit';
import { leaderboardwinnersData } from '../actions/leaderboardwinners.actions';

const userInitialState: any = {
    leaderboardwinnersData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const leaderboardwinnersSlice: any = createSlice({
    name: 'leaderboardwinners',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(leaderboardwinnersData.pending, (state) => {
          state.leaderboardwinnersData.error = false;
          state.leaderboardwinnersData.loading = true;
        })
        .addCase(leaderboardwinnersData.fulfilled, (state, action) => {
          state.leaderboardwinnersData.error = false;
          state.leaderboardwinnersData.loading = false;
          state.leaderboardwinnersData.data = action.payload;
        })
        .addCase(leaderboardwinnersData.rejected, (state) => {
          state.leaderboardwinnersData.error = true;
          state.leaderboardwinnersData.loading = false;
        });
    },
});
