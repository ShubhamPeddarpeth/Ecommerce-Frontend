import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../config';

const initialState = {
  user: '',
  users: [],
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk('fetch/user', async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/user/profile?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the fetch all users async thunk
export const fetchAllUsers = createAsyncThunk('fetch/allUsers', async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = '';
      state.token = '';
      state.loading = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        // Fixed action parameter
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { signOut } = userReducer.actions;
export default userReducer.reducer;
