import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitNewComment = createAsyncThunk(
  'newComment/submitNewComment',
  async ({ postId, commentText }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
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
  },
  extraReducers: {
    [submitNewComment.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [submitNewComment.pending]: (state, action) => {
      state.isFetching = true;
    },
    [submitNewComment.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectNewComment = (state) => {
  return state.newComment.comments;
};

export const { onTextChange } = newCommentSlice.actions;

export default newCommentSlice.reducer;
