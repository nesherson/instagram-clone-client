import { createSlice } from "@reduxjs/toolkit";

import { fetchComments, submitNewComment } from "../api/commentsAPI";

const initialState = {
  list: [],
  newCommentSubmitStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  commentsFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [submitNewComment.fulfilled]: (state) => {
      state.newCommentSubmitStatus.isFetching = false;
      state.newCommentSubmitStatus.isSuccess = true;
      state.newCommentSubmitStatus.isError = false;
    },
    [submitNewComment.pending]: (state) => {
      state.newCommentSubmitStatus.isFetching = true;
      state.newCommentSubmitStatus.isSuccess = false;
      state.newCommentSubmitStatus.isError = false;
    },
    [submitNewComment.rejected]: (state, action) => {
      state.newCommentSubmitStatus.isFetching = false;
      state.newCommentSubmitStatus.isSuccess = false;
      state.newCommentSubmitStatus.isError = true;
      state.newCommentSubmitStatus.errorMessage = action.payload.message;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.commentsFetchStatus.isFetching = false;
      state.commentsFetchStatus.isSuccess = true;
      state.commentsFetchStatus.isError = false;
      state.list = action.payload.comments;
    },
    [fetchComments.pending]: (state) => {
      state.commentsFetchStatus.isFetching = true;
      state.commentsFetchStatus.isSuccess = false;
      state.commentsFetchStatus.isError = false;
    },
    [fetchComments.rejected]: (state, action) => {
      state.commentsFetchStatus.isFetching = false;
      state.commentsFetchStatus.isSuccess = false;
      state.commentsFetchStatus.isError = true;
      state.commentsFetchStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectComments = (state) => state.comments.list;
export const selectNewCommentSubmitStatus = (state) => state.comments.newCommentSubmitStatus;
export const selectCommentsFetchStatus = (state) => state.comments.commentsFetchStatus;

export default commentsSlice.reducer;
