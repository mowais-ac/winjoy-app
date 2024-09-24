import { createSlice } from '@reduxjs/toolkit';
import { galleryData } from '../actions/gallery.actions';

const userInitialState: any = {
    galleryData: {
      loading: true,
      data: [],
      error: false,
  },
};

export const gallerySlice: any = createSlice({
    name: 'gallery',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(galleryData.pending, (state) => {
          state.galleryData.error = false;
          state.galleryData.loading = true;
        })
        .addCase(galleryData.fulfilled, (state, action) => {
          state.galleryData.error = false;
          state.galleryData.loading = false;
          state.galleryData.data = action.payload;
        })
        .addCase(galleryData.rejected, (state) => {
          state.galleryData.error = true;
          state.galleryData.loading = false;
        });
    },
});

