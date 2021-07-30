import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (postId, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));

    try {
      const response = await fetch(`http://localhost:5000/post/post/${postId}`, {
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
  id: null,
  imageUrl: '',
  caption: '',
  userId: '',
  likes: [],
  comments: [],
  user: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [fetchPostById.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.id = action.payload.post.id;
      state.imageUrl = action.payload.post.imageUrl;
      state.caption = action.payload.post.caption;
      state.likes = action.payload.post.likes;
      state.comments = action.payload.post.comments;
      state.user = action.payload.post.user;
    },
    [fetchPostById.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchPostById.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectPost = (state) => state.post;
export const selectPostUser = (state) => state.post.user;

export default postSlice.reducer;
