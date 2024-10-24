import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../config';

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const fetchCartItem = createAsyncThunk(
  'cart/fetchCartItem',
  async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "carts/addItemToCart",
  async ({ productId, userId, cartQuantity }) => {
    try {
      const response = await axios.post(`${baseUrl}/carts`, {
        productId,
        userId,
        cartQuantity,
      });
      return response.data;
    } catch (error) {
      throw error; // Throw error to be handled by Redux Toolkit
    }
  }
);

export const deleteCart = createAsyncThunk(
  'carts/deleteCart',
  async (cartId) => {
    try {
      await axios.delete(`${baseUrl}/carts/${cartId}`);
      return cartId;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteAllCartsByUserId = createAsyncThunk(
  'cart/deleteCartAllCartsByUserId',
  async (userId) => {
    try {
      const response = await axios.delete(`${baseUrl}/carts/user/${userId}`);
      return response.data.deletedCount;
    } catch (error) {
      return error.message;
    }
  }
);

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = payload;
        state.error = null;
      })
      .addCase(fetchCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [...state.cart, { ...action.payload }];
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.error;
      })

      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((item) => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteAllCartsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCartsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.userId !== action.payload
        );
        state.error = null;
      });
  },
});

export default cartReducer.reducer;
