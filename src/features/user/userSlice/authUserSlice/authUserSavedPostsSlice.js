import { createSlice } from "@reduxjs/toolkit";

import { savePost, fetchSavedPosts } from "../../../posts/api/savedPostsAPI";

const initialState = {
  list: [],
  savedPostsFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  postSaveStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const authUserSavedPostsSlice = createSlice({
  name: "authUserSavedPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSavedPosts.fulfilled]: (state, action) => {
      state.savedPostsFetchStatus.isFetching = false;
      state.savedPostsFetchStatus.isSuccess = true;
      state.savedPostsFetchStatus.isError = false;
      state.list = action.payload.savedPosts;
    },
    [fetchSavedPosts.pending]: (state) => {
      state.savedPostsFetchStatus.isFetching = true;
      state.savedPostsFetchStatus.isSuccess = false;
      state.savedPostsFetchStatus.isError = false;
    },
    [fetchSavedPosts.rejected]: (state, action) => {
      state.savedPostsFetchStatus.isFetching = false;
      state.savedPostsFetchStatus.isSuccess = false;
      state.savedPostsFetchStatus.isError = true;
      state.savedPostsFetchStatus.errorMessage = action.payload.message;
    },
    [savePost.fulfilled]: (state) => {
      state.postSaveStatus.isFetching = false;
      state.postSaveStatus.isSuccess = true;
      state.postSaveStatus.isError = false;
    },
    [savePost.pending]: (state) => {
      state.postSaveStatus.isFetching = true;
      state.postSaveStatus.isSuccess = false;
      state.postSaveStatus.isError = false;
    },
    [savePost.rejected]: (state, action) => {
      state.postSaveStatus.isFetching = false;
      state.postSaveStatus.isSuccess = false;
      state.postSaveStatus.isError = true;
      state.postSaveStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectSavedPosts = (state) => state.authUserSavedPosts.list;
export const selectSavedPostsFetchStatus = (state) =>
  state.authUserSavedPosts.savedPostsFetchStatus;
export const selectPostSaveStatus = (state) =>
  state.authUserSavedPosts.postSaveStatus;

export default authUserSavedPostsSlice.reducer;
