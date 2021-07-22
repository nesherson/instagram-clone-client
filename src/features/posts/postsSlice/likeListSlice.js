import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const likePost = createAsyncThunk(
  'postList/likePost',
  async (postId, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));

    try {
      const response = await fetch(
        `http://localhost:5000/post/${postId}/like`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
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
  'likeList/fetchLikes',
  async (_, thunkAPI) => {
    try {

      const {token} = JSON.parse(localStorage.getItem('userData'));
      
      const response = await fetch(`http://localhost:5000/post/likes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token,
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
  likes: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isLikingPost: false,
  likePostSuccess: false,
  likePostError: false,
  likePostErrorMsg: ''
};

const likeListSlice = createSlice({
  name: 'likeList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLikes.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.likes = action.payload.likes;
    },
    [fetchLikes.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchLikes.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [likePost.fulfilled]: (state, action) => {
      state.isLikingPost = false;
      state.likePostSuccess = true;
      state.likePostError = false;
    },
    [likePost.pending]: (state, action) => {
      state.isLikingPost = true;
      state.likePostSuccess = false;
      state.likePostError = false;
    },
    [likePost.rejected]: (state, action) => {
      state.isLikingPost = false;
      state.likePostSuccess = false;
      state.likePostError = true;
      state.likePostErrMsg = action.payload.message;
    },
  },
});

export const selectLikes = (state) => state.likeList.likes;

export const selectLikePostSuccess = (state) => state.likeList.likePostSuccess;

export default likeListSlice.reducer;
