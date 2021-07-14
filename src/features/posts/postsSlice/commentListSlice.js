import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'commentList/fetchComments',
  async ({ postId }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/post/${postId}/comments`,
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
  },
});

export const selectComments = (state) => {
  return state.commentList.comments;
};

//export const { onTextChange, clearState } = newCommentSlice.actions;

export default commentListSlice.reducer;
