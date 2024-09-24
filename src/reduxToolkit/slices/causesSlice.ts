import { createSlice } from '@reduxjs/toolkit';
import { causesSlugData } from '../actions/causesSlug.actions';


const userInitialState: any = {
    causesSlugData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const causesSlice: any = createSlice({
    name: 'causeSlug',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(causesSlugData.pending, (state) => {
          state.causesSlugData.error = false;
          state.causesSlugData.loading = true;
        })
        .addCase(causesSlugData.fulfilled, (state, action) => {
          state.causesSlugData.error = false;
          state.causesSlugData.loading = false;
          state.causesSlugData.data = action.payload;
        })
        .addCase(causesSlugData.rejected, (state) => {
          state.causesSlugData.error = true;
          state.causesSlugData.loading = false;
        });
    },
});
