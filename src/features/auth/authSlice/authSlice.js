import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLocalDateWithOffset } from "../../../util/date";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, fullname, username, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, username, password }),
      });

      let data = await response.json();

      if (response.status === 200) {
        const expirationTime = 3600000;
        const tokenExpirationDate = new Date(
          getLocalDateWithOffset().getTime() + expirationTime
        );
        const userData = JSON.stringify({
          userId: data.user.id,
          token: data.token,
          tokenExpirationDate: tokenExpirationDate.toISOString(),
        });

        localStorage.setItem("userData", userData);
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
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = await response.json();

      if (response.status === 200) {
        const expirationTime = 3600000;
        const tokenExpirationDate = new Date(
          getLocalDateWithOffset().getTime() + expirationTime
        );
        const userData = JSON.stringify({
          userId: data.user.id,
          token: data.token,
          tokenExpirationDate: tokenExpirationDate.toISOString(),
        });

        localStorage.setItem("userData", userData);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchAuthUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await fetch(`http://localhost:5000/users/authUser`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
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
  userId: null,
  email: "",
  fullname: "",
  username: "",
  profileImg: "",
  signupUserStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  loginUserStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  fetchAuthUserStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem("userData");
      state.userId = null;
      state.email = "";
      state.fullname = "";
      state.username = "";
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.signupUserStatus.isFetching = false;
      state.signupUserStatus.isSuccess = true;
      state.signupUserStatus.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
    },
    [signupUser.pending]: (state, action) => {
      state.signupUserStatus.isFetching = true;
      state.signupUserStatus.isSuccess = false;
      state.signupUserStatus.isError = false;
    },
    [signupUser.rejected]: (state, action) => {
      state.signupUserStatus.isFetching = false;
      state.signupUserStatus.isSuccess = false;
      state.signupUserStatus.isError = true;
      state.signupUserStatus.errorMessage = action.payload.msg;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loginUserStatus.isFetching = false;
      state.loginUserStatus.isSuccess = true;
      state.loginUserStatus.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
    },
    [loginUser.pending]: (state, action) => {
      state.loginUserStatus.isFetching = true;
      state.loginUserStatus.isSuccess = false;
      state.loginUserStatus.isError = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loginUserStatus.isFetching = false;
      state.loginUserStatus.isSuccess = false;
      state.loginUserStatus.isError = true;
      state.loginUserStatus.errorMessage = action.payload.msg;
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = false;
      state.fetchAuthUserStatus.isSuccess = true;
      state.fetchAuthUserStatus.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
      state.posts = action.payload.user.posts;
    },
    [fetchAuthUser.pending]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = true;
      state.fetchAuthUserStatus.isSuccess = false;
      state.fetchAuthUserStatus.isError = false;
    },
    [fetchAuthUser.rejected]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = false;
      state.fetchAuthUserStatus.isSuccess = false;
      state.fetchAuthUserStatus.isError = true;
      state.fetchAuthUserStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectAuthUser = (state) => state.auth;
export const selectSignupUserStatus = (state) => state.auth.signupUserStatus;
export const selectLoginUserStatus = (state) => state.auth.loginUserStatus;
export const selectFetchAuthUserStatus = (state) => state.auth.fetchAuthUserStatus;

export const { logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
