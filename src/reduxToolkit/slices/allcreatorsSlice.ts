import { createSlice } from '@reduxjs/toolkit';
import { fanjoyallData } from '../actions/allcreators.actions';


const userInitialState: any = {
    fanjoyallData: {
      cartCounter:[],
      loading: true,
      data: [],
      error: false,
  },
};

export const allcreatorsSlice: any = createSlice({
    name: 'fanjoyall',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
        ss: (state, action) => {
          state.cartCounter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fanjoyallData.pending, (state) => {
          state.fanjoyallData.error = false;
          state.fanjoyallData.loading = true;
        })
        .addCase(fanjoyallData.fulfilled, (state, action) => {
          state.fanjoyallData.error = false;
          state.fanjoyallData.loading = false;
          state.fanjoyallData.data = action.payload;
        })
        .addCase(fanjoyallData.rejected, (state) => {
          state.fanjoyallData.error = true;
          state.fanjoyallData.loading = false;
        });
    },
});

export const {ss} =
allcreatorsSlice.actions;