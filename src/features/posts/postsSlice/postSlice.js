import { createSlice } from '@reduxjs/toolkit';

import { fetchPostById } from '../api/postsAPI';
import { fetchCommentsByPostId } from '../api/commentsAPI';
import { fetchLikesByPostId } from '../api/likesAPI';

const initialState = {
  id: null,
  imageUrl: '',
  caption: '',
  userId: '',
  likes: [],
  comments: [],
  user: {},
  postFetchStatus: {
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
  likesFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [fetchPostById.fulfilled]: (state, action) => {
      state.postFetchStatus.isFetching = false;
      state.postFetchStatus.isSuccess = true;
      state.postFetchStatus.isError = false;
      state.id = action.payload.post.id;
      state.imageUrl = action.payload.post.imageUrl;
      state.caption = action.payload.post.caption;
      state.likes = action.payload.post.likes;
      state.comments = action.payload.post.comments;
      state.user = action.payload.post.user;
    },
    [fetchPostById.pending]: (state, action) => {
      state.postFetchStatus.isFetching = true;
      state.isSuccess = false;
      state.postFetchStatus.isError = false;
    },
    [fetchPostById.rejected]: (state, action) => {
      state.postFetchStatus.isFetching = false;
      state.postFetchStatus.isSuccess = false;
      state.postFetchStatus.isError = true;
      state.postFetchStatus.errorMessage = action.payload.message;
    },
    [fetchCommentsByPostId.fulfilled]: (state, action) => {
      state.commentsFetchStatus.isFetching = false;
      state.commentsFetchStatus.isSuccess = true;
      state.commentsFetchStatus.isError = false;
      state.comments = action.payload.comments;
    },
    [fetchCommentsByPostId.pending]: (state, action) => {
      state.commentsFetchStatus.isFetching = true;
      state.commentsFetchStatus.isSuccess = false;
      state.commentsFetchStatus.isError = false;
    },
    [fetchCommentsByPostId.rejected]: (state, action) => {
      state.commentsFetchStatus.isFetching = false;
      state.commentsFetchStatus.isSuccess = false;
      state.commentsFetchStatus.isError = true;
      state.commentsFetchStatus.errorMessage = action.payload.message;
    },
    [fetchLikesByPostId.fulfilled]: (state, action) => {
      state.likesFetchStatus.isFetching = false;
      state.likesFetchStatus.isSuccess = true;
      state.likesFetchStatus.isError = false;
      state.likes = action.payload.likes;
    },
    [fetchLikesByPostId.pending]: (state, action) => {
      state.likesFetchStatus.isFetching = true;
      state.likesFetchStatus.isSuccess = false;
      state.likesFetchStatus.isError = false;
    },
    [fetchLikesByPostId.rejected]: (state, action) => {
      state.likesFetchStatus.isFetching = false;
      state.likesFetchStatus.isSuccess = false;
      state.likesFetchStatus.isError = true;
      state.likesFetchStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectPost = (state) => state.post;
export const selectPostUser = (state) => state.post.user;

export default postSlice.reducer;
