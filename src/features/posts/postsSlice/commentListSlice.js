import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'commentList/fetchComments',
  async (_, thunkAPI) => {
    try {

      const {token} = JSON.parse(localStorage.getItem('userData'));
      
      const response = await fetch(`http://localhost:5000/post/comments`, {
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

export const fetchCommentsByPostId = createAsyncThunk(
  'commentList/fetchCommentsByPostId',
  async (postId, thunkAPI) => {
    try {
      const {token} = JSON.parse(localStorage.getItem('userData'));

      const response = await fetch(`http://localhost:5000/post/${postId}/comments`, {
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
  comments: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const commentListSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.comments = action.payload.comments;
    },
    [fetchComments.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [fetchCommentsByPostId.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.comments = action.payload.comments;
    },
    [fetchCommentsByPostId.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchCommentsByPostId.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectComments = (state) => {
  return state.commentList.comments;
};

export default commentListSlice.reducer;
