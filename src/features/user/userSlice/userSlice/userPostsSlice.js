import { createSlice } from "@reduxjs/toolkit";

import { fetchPostsByUserId } from "../../../posts/api/postsAPI";

const initialState = {
  list: [],
  userPostsFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostsByUserId.fulfilled]: (state, action) => {
      state.userPostsFetchStatus.isFetching = false;
      state.userPostsFetchStatus.isSuccess = true;
      state.userPostsFetchStatus.isError = false;
      state.list = action.payload.posts;
    },
    [fetchPostsByUserId.pending]: (state, action) => {
      state.userPostsFetchStatus.isFetching = true;
      state.userPostsFetchStatus.isSuccess = false;
      state.userPostsFetchStatus.isError = false;
    },
    [fetchPostsByUserId.rejected]: (state, action) => {
      state.userPostsFetchStatus.isFetching = false;
    state.userPostsFetchStatus.isSuccess = false;
      state.userPostsFetchStatus.isError = true;
      state.userPostsFetchStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectUserPosts = (state) => state.userPosts.list;
export const selectUserPostsFetchStatus = (state) =>
  state.userPosts.userPostsFetchStatus;

export default userPostsSlice.reducer;
