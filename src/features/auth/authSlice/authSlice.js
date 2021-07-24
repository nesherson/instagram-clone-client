import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getLocalDateWithOffset } from '../../../util/date';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, fullname, username, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullname, username, password }),
      });

      let data = await response.json();

      if (response.status === 200) {
        const expirationTime = 3600000;
        const tokenExpirationDate = new Date(getLocalDateWithOffset().getTime() + expirationTime);
        const userData = JSON.stringify({
          userId: data.user.id,
          token: data.token,
          tokenExpirationDate: tokenExpirationDate.toISOString()
        });

        localStorage.setItem('userData', userData);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data = await response.json();

      if (response.status === 200) { 
        const expirationTime = 3600000;
        const tokenExpirationDate = new Date(getLocalDateWithOffset().getTime() + expirationTime);
        const userData = JSON.stringify({
          userId: data.user.id,
          token: data.token,
          tokenExpirationDate: tokenExpirationDate.toISOString()
        });

        localStorage.setItem('userData', userData);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  userId: null,
  email: '',
  fullname: '',
  username: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem('userData');
      state.userId = null;
      state.email = '';
      state.fullname = '';
      state.username = '';
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
    },
    [signupUser.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [signupUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.msg;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
    },
    [loginUser.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.msg;
    },
  },
});

export const selectAuthUser = (state) => state.auth;

export const { logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
