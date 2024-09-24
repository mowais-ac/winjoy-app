import { createSlice } from '@reduxjs/toolkit';
import { celebsData } from '../actions/celebs.actions';

const userInitialState: any = {
    celebsData: {
      creator:[],
      loading: true,
      data: [],
      error: false,
  },
};

export const celebsSlice: any = createSlice({
    name: 'celebs',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
        CreatorId: (state, action) => {
          state.creator = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(celebsData.pending, (state) => {
          state.homeData.error = false;
          state.homeData.loading = true;
        })
        .addCase(celebsData.fulfilled, (state, action) => {
          state.homeData.error = false;
          state.homeData.loading = false;
          state.homeData.data = action.payload;
        })
        .addCase(celebsData.rejected, (state) => {
          state.homeData.error = true;
          state.homeData.loading = false;
        });
    },
});

export const {CreatorId} =
celebsSlice.actions;