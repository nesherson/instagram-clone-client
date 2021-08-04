import { createSlice } from "@reduxjs/toolkit";

import { fetchLikes, likePost } from "../postsApi/postsApi";

const initialState = {
  list: [],
  likesFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  likePostStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLikes.fulfilled]: (state, action) => {
      state.likesFetchStatus.isFetching = false;
      state.likesFetchStatus.isSuccess = true;
      state.likesFetchStatus.isError = false;
      state.list = action.payload.likes;
    },
    [fetchLikes.pending]: (state) => {
      state.likesFetchStatus.isFetching = true;
      state.likesFetchStatus.isSuccess = false;
      state.likesFetchStatus.isError = false;
    },
    [fetchLikes.rejected]: (state, action) => {
      state.likesFetchStatus.isFetching = false;
      state.likesFetchStatus.isSuccess = false;
      state.likesFetchStatus.isError = true;
      state.likesFetchStatus.errorMessage = action.payload.message;
    },
    [likePost.fulfilled]: (state, action) => {
      state.likePostStatus.isFetchking = false;
      state.likePostStatus.isSuccess = true;
      state.likePostStatus.isError = false;
    },
    [likePost.pending]: (state, action) => {
      state.likePostStatus.isFetchking = true;
      state.likePostStatus.isSuccess = false;
      state.likePostStatus.isError = false;
    },
    [likePost.rejected]: (state, action) => {
      state.likePostStatus.isFetchking = false;
      state.likePostStatus.isSuccess = false;
      state.likePostStatus.isError = true;
      state.likePostStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectLikes = (state) => state.likes.list;
export const selectLikePostStatus = (state) => state.likes.likePostStatus;
export const selectLikeFetchStatus = (state) => state.likes.likesFetchStatus;

export default likesSlice.reducer;
