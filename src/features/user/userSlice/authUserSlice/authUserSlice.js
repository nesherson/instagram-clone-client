import { createSlice } from "@reduxjs/toolkit";

import { fetchAuthUser } from '../api/userAPI';

const initialState = {
  userId: null,
  email: "",
  fullname: "",
  username: "",
  profileImg: "",
  fetchAuthUserStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = false;
      state.fetchAuthUserStatus.isSuccess = true;
      state.fetchAuthUserStatus.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
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

export const selectAuthUser = (state) => state.authUser;
export const selectFetchAuthUserStatus = (state) => state.authUser.fetchAuthUserStatus;

export default authUserSlice.reducer;
