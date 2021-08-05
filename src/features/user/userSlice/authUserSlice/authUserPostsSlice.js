import { createSlice } from "@reduxjs/toolkit";

import { fetchPostsByUserId } from "../../../posts/api/postsAPI";

const initialState = {
  list: [],
  authUserPostsFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const authUserPostsSlice = createSlice({
  name: "authUserPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostsByUserId.fulfilled]: (state, action) => {
      state.authUserPostsFetchStatus.isFetching = false;
      state.authUserPostsFetchStatus.isSuccess = true;
      state.authUserPostsFetchStatus.isError = false;
      state.list = action.payload.posts;
    },
    [fetchPostsByUserId.pending]: (state, action) => {
      state.authUserPostsFetchStatus.isFetching = true;
      state.authUserPostsFetchStatus.isSuccess = false;
      state.authUserPostsFetchStatus.isError = false;
    },
    [fetchPostsByUserId.rejected]: (state, action) => {
      state.authUserPostsFetchStatus.isFetching = false;
      state.authUserPostsFetchStatus.isSuccess = false;
      state.authUserPostsFetchStatus.isError = true;
      state.authUserPostsFetchStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectAuthUserPosts = (state) => state.authUserPosts.list;
export const selectaAuthUserPostsFetchStatus = (state) =>
  state.authUserPosts.authUserPostsFetchStatus;

export default authUserPostsSlice.reducer;
