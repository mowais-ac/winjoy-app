
import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../actions/getproducts.actions';

const userInitialState: any = {
    getProducts: {
      loading: true,
      data: [],
      error: false,
  },
};

export const getproductSlice: any = createSlice({
    name: 'getproduct',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
          state.getProducts.error = false;
          state.getProducts.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.getProducts.error = false;
          state.getProducts.loading = false;
          state.getProducts.data = action.payload;
        })
        .addCase(getProducts.rejected, (state) => {
          state.getProducts.error = true;
          state.getProducts.loading = false;
        });
    },
});
