import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitNewComment = createAsyncThunk(
  'newComment/submitNewComment',
  async ({ postId, commentText }, thunkAPI) => {
    try {
      const {token} = JSON.parse(localStorage.getItem('userData'));

      const response = await fetch(
        `http://localhost:5000/post/${postId}/add-comment`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ commentText }),
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

const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    onTextChange: (state, action) => {
      const postId = action.payload.postId;
      const commentText = action.payload.commentText;

      const index = state.comments.findIndex(
        (comment) => comment.postId === postId
      );

      if (index === -1) {
        state.comments.push({
          postId,
          commentText,
        });
      }

      state.comments[index] = {
        ...state.comments[index],
        commentText,
      };
    },
    clearState: (state) => {
      state.comments = [];
    },
  },
  extraReducers: {
    [submitNewComment.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [submitNewComment.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [submitNewComment.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectNewComments = (state) => {
  return state.newComment.comments;
};

export const selectNewComment = (state) => state.newComment;

export const selectNewCommentPostSuccess = (state) => state.newComment.isSuccess;

export const { onTextChange, clearState } = newCommentSlice.actions;

export default newCommentSlice.reducer;
