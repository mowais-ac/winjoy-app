
import { homeData } from '../actions';
import { createSlice } from '@reduxjs/toolkit';


const userInitialState: any = {
    homeData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const homeSlice: any = createSlice({
    name: 'home',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(homeData.pending, (state) => {
          state.homeData.error = false;
          state.homeData.loading = true;
        })
        .addCase(homeData.fulfilled, (state, action) => {
          state.homeData.error = false;
          state.homeData.loading = false;
          state.homeData.data = action.payload;
        })
        .addCase(homeData.rejected, (state) => {
          state.homeData.error = true;
          state.homeData.loading = false;
        });
    },
});

//export default homeSlice.reducer;
