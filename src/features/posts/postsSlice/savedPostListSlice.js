import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSavedPosts = createAsyncThunk(
  'user/fetchSavedPosts',
  async (userId, thunkAPI) => {
    const {token} = JSON.parse(localStorage.getItem('userData'));
    try {
      const response = await fetch(`http://localhost:5000/users/user/${userId}/saved-posts`, {
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
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  savedPosts: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const savedPostListSlice = createSlice({
  name: 'savedPostList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSavedPosts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.savedPosts = action.payload.savedPosts;
    },
    [fetchSavedPosts.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchSavedPosts.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectSavedPosts = (state) => state.savedPostList.savedPosts;

export default savedPostListSlice.reducer;
