import { createSlice } from '@reduxjs/toolkit';
import { triviajoyallData } from '../actions/triviajoy.actions';


const userInitialState: any = {
    triviajoyallData: {
      cartCounter:[],
      loading: true,
      data: [],
      error: false,
  },
};

export const triviajoySlice: any = createSlice({
    name: 'triviajoyall',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
        ss: (state, action) => {
          state.cartCounter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(triviajoyallData.pending, (state) => {
          state.triviajoyallData.error = false;
          state.triviajoyallData.loading = true;
        })
        .addCase(triviajoyallData.fulfilled, (state, action) => {
          state.triviajoyallData.error = false;
          state.triviajoyallData.loading = false;
          state.triviajoyallData.data = action.payload;
        })
        .addCase(triviajoyallData.rejected, (state) => {
          state.triviajoyallData.error = true;
          state.triviajoyallData.loading = false;
        });
    },
});

export const {ss} =
triviajoySlice.actions;