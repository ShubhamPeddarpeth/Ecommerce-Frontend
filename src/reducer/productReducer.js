import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../config';

//thunk action
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (productId = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/products?productId=${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProducts = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/products`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productsId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/products/${productsId}`);
      return productsId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProducts',
  async ({ productId, productData }, { rejectWithValue }) => {
    productId, productData;
    try {
      const response = await axios.put(
        `${baseUrl}/products/${productId}`,
        productData
      );
      response.data;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productReducer = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);

        state.error = null;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updateIndex = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (updateIndex !== -1) {
          state.products[updateIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productReducer.reducer;
