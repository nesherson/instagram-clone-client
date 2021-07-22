import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getLocalDateWithOffset } from '../../../util/date';

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
  'user/loginUser',
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

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));
    try {
      const response = await fetch('http://localhost:5000/users/user', {
        method: 'GET',
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

export const savePost = createAsyncThunk(
  'user/savePost',
  async ({userId, postId}, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));
    try {
      const response = await fetch(`http://localhost:5000/users/user/${userId}/save-post`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({postId})
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
  userId: null,
  email: '',
  fullname: '',
  username: '',
  profileImg: '',
  posts: [],
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem('userData');
      state.userId = null;
      state.email = '';
      state.fullname = '';
      state.username = '';
      state.profileImg = '';
      state.posts = [];
      state.isLoggedIn = false;
      state.isSuccess = false;
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
      state.isLoggedIn = true;

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
      state.errorMessage = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.isLoggedIn = true;
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
      state.errorMessage = action.payload.message;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
      state.posts = action.payload.user.posts;
    },
    [fetchUser.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false
    },
    [fetchUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [savePost.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [savePost.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false
    },
    [savePost.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectUser = (state) => state.user;

export const {logoutUser} = userSlice.actions;

export default userSlice.reducer;
