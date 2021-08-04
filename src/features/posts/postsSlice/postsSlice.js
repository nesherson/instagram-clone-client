import { createSlice } from "@reduxjs/toolkit";

import { fetchPosts, submitNewPost } from "../api/postsAPI";

const initialState = {
  list: [],
  postsFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  newPostSubmitStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.postsFetchStatus.isFetching = false;
      state.postsFetchStatus.isSuccess = true;
      state.postsFetchStatus.isError = false;
      state.list = action.payload.posts;
    },
    [fetchPosts.pending]: (state) => {
      state.postsFetchStatus.isFetching = true;
      state.postsFetchStatus.isSuccess = false;
      state.postsFetchStatus.isError = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.postsFetchStatus.isFetching = false;
      state.postsFetchStatus.isSuccess = false;
      state.postsFetchStatus.isError = true;
      state.postsFetchStatus.errorMessage = action.payload.message;
    },
    [submitNewPost.fulfilled]: (state) => {
      state.newPostSubmitStatus.isFetching = false;
      state.newPostSubmitStatus.isSuccess = true;
      state.newPostSubmitStatus.isError = false;
    },
    [submitNewPost.pending]: (state) => {
      state.newPostSubmitStatus.isFetching = true;
      state.newPostSubmitStatus.isSuccess = false;
      state.newPostSubmitStatus.isError = false;
    },
    [submitNewPost.rejected]: (state, action) => {
      state.newPostSubmitStatus.isFetching = false;
      state.newPostSubmitStatus.isSuccess = false;
      state.newPostSubmitStatus.isError = true;
      state.newPostSubmitStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectPosts = (state) => state.posts.list;
export const selectPostsFetchStatus = (state) => state.posts.postsFetchStatus;
export const selectNewPostSubmitStatus = (state) => state.posts.newPostSubmitStatus;

export default postsSlice.reducer;
