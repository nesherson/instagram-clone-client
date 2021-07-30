import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const likePost = createAsyncThunk(
  "postList/likePost",
  async (postId, thunkAPI) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    try {
      const response = await fetch(
        `http://localhost:5000/post/${postId}/like`,
        {
          method: "POST",
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

export const fetchLikes = createAsyncThunk(
  "likeList/fetchLikes",
  async (_, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userData"));

      const response = await fetch(`http://localhost:5000/post/likes`, {
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

const initialState = {
  likeList: [],
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
      state.likes = action.payload.likes;
    },
    [fetchLikes.pending]: (state, action) => {
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
      state.isError = false;
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

export const selectLikes = (state) => state.likes.likeList;

export const selectLikePostStatus = (state) => state.likes.likePostStatus;

export default likesSlice.reducer;
