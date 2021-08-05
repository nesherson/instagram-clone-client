import { createSlice } from "@reduxjs/toolkit";

import { getLocalDateWithOffset } from "../../../util/date";

import { signupUser, loginUser } from "../authApi/authApi";

const initialState = {
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loginUserStatus.isSuccess = false;
      state.signupUserStatus.isSuccess = false;
      localStorage.removeItem("userData");
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
      const oneHourExpirationTime = 3600000;
      const tokenExpirationDate = new Date(
        getLocalDateWithOffset().getTime() + oneHourExpirationTime
      );
      const userData = JSON.stringify({
        userId: action.payload.user.id,
        token: action.payload.token,
        tokenExpirationDate: tokenExpirationDate.toISOString(),
      });

      localStorage.setItem("userData", userData);
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
      const oneHourExpirationTime = 3600000;
      const tokenExpirationDate = new Date(
        getLocalDateWithOffset().getTime() + oneHourExpirationTime
      );
      const userData = JSON.stringify({
        userId: action.payload.user.id,
        token: action.payload.token,
        tokenExpirationDate: tokenExpirationDate.toISOString(),
      });

      localStorage.setItem("userData", userData);
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
  },
});

export const selectAuthUser = (state) => state.auth;
export const selectSignupUserStatus = (state) => state.auth.signupUserStatus;
export const selectLoginUserStatus = (state) => state.auth.loginUserStatus;

export const { logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
