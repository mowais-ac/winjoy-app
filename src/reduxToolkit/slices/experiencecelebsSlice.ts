import { createSlice } from '@reduxjs/toolkit';
import { experiencecelebData } from '../actions/expericnecelebSlug.actions';

const userInitialState: any = {
    experiencecelebData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const experiencecelebsSlice: any = createSlice({
    name: 'experienceceleb',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(experiencecelebData.pending, (state) => {
          state.experiencecelebData.error = false;
          state.experiencecelebData.loading = true;
        })
        .addCase(experiencecelebData.fulfilled, (state, action) => {
          state.experiencecelebData.error = false;
          state.experiencecelebData.loading = false;
          state.experiencecelebData.data = action.payload;
        })
        .addCase(experiencecelebData.rejected, (state) => {
          state.experiencecelebData.error = true;
          state.experiencecelebData.loading = false;
        });
    },
});
