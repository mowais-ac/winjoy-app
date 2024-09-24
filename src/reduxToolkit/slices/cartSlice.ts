import { createSlice } from '@reduxjs/toolkit';
import { cartData } from '../actions/cart.actions';

const userInitialState: any = {
    cartData: {
      cartCounter:[],
      loading: true,
      data: [],
      error: false,
  },
};

export const cartSlice: any = createSlice({
    name: 'cart',
    initialState: userInitialState || {},
    reducers: {
        resetUserSlice: () => userInitialState,
        CART_COUNTER: (state, action) => {
          state.cartCounter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(cartData.pending, (state) => {
          state.cartData.error = false;
          state.cartData.loading = true;
        })
        .addCase(cartData.fulfilled, (state, action) => {
          state.cartData.error = false;
          state.cartData.loading = false;
          state.cartData.data = action.payload;
        })
        .addCase(cartData.rejected, (state) => {
          state.cartData.error = true;
          state.cartData.loading = false;
        });
    },
});

export const {CART_COUNTER} =
cartSlice.actions;