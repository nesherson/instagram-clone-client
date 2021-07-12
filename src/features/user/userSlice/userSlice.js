import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk(
  'user/signupUser',
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
        localStorage.setItem('token', data.token);
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
  'user/signupUser',
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
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserByToken = createAsyncThunk(
  'user/fetchUserByToken',
  async (token, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/auth/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      let data = await response.json();

      if (response.status === 200) {
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
  email: '',
  fullname: '',
  username: '',
  profileImg: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.email = action.payload.user.email;
      state.fullname = action.payload.user.fullname;
      state.username = action.payload.user.username;
    },
    [signupUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      return state;
    },
    [loginUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [fetchUserByToken.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
    },
    [fetchUserByToken.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchUserByToken.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
