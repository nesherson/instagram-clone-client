import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'postList/fetchPosts',
  async (_, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));

    try {
      const response = await fetch('http://localhost:5000/post/posts', {
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
  posts: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.posts = action.payload.posts;
    },
    [fetchPosts.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
   
  },
});

export const selectPosts = (state) => state.postList.posts;

export default postListSlice.reducer;
