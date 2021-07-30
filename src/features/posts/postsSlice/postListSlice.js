import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "postList/fetchPosts",
  async (_, thunkAPI) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    try {
      const response = await fetch("http://localhost:5000/post/posts", {
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchCommentsByPostId = createAsyncThunk(
  "commentList/fetchCommentsByPostId",
  async (postId, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userData"));

      const response = await fetch(
        `http://localhost:5000/post/${postId}/comments`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  posts: [],
  postsFetchStatus: {
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

const postListSlice = createSlice({
  name: "postList",
  initialState,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.postsFetchStatus.isFetching = false;
      state.postsFetchStatus.isSuccess = true;
      state.postsFetchStatus.isError = false;
      state.posts = action.payload.posts;
    },
    [fetchPosts.pending]: (state, action) => {
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
    [fetchCommentsByPostId.fulfilled]: (state, action) => {
      state.commentsFetchStatus.isFetching = false;
      state.commentsFetchStatus.isSuccess = true;
      state.commentsFetchStatus.isError = false;
      const postId = action.payload.postId;
      const index = state.posts.findIndex((post) => post.id === postId);
      state.posts[index].comments = action.payload.comments;
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
  },
});

export const selectPosts = (state) => state.postList.posts;
export const selectPostsFetchStatus = (state) => state.postList.postsFetchStatus;
export const selectCommentsFetchStatus = (state) => state.postList.commentsFetchStatus;


export default postListSlice.reducer;
