import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitNewPost = createAsyncThunk(
  'newPost/submitNewPost',
  async ({ imageUrl, caption }, thunkAPI) => {
    try {
      const {token} = JSON.parse(localStorage.getItem('userData'));

      const response = await fetch('http://localhost:5000/post/add-post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ imageUrl, caption }),
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
  imageUrl: '',
  caption: '',
  isSubmittingNewPost: false,
  newPostSubmitSuccess: false,
  newPostSubmitErr: false,
  newPostSubmitErrMsg: '',
};

const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    onImageUrlChange: (state, action) => {
      state.imageUrl = action.payload;
    },
    onCaptionChange: (state, action) => {
      state.caption = action.payload;
    },
  },
  extraReducers: {
    [submitNewPost.fulfilled]: (state, action) => {
      state.isSubmittingNewPost = false;
      state.newPostSubmitSuccess = true;
      state.newPostSubmitErr = false;
    },
    [submitNewPost.pending]: (state, action) => {
      state.isSubmittingNewPost = true;   
      state.newPostSubmitSuccess = false;
      state.newPostSubmitErr = false;
    },
    [submitNewPost.rejected]: (state, action) => {
      state.isSubmittingNewPost = false;
      state.newPostSubmitSuccess = false;
      state.newPostSubmitErr = true;
      state.newPostSubmitErrMsg = action.payload.message;
    },
  },
});

export const selectNewPost = (state) => state.newPost;

export const { onImageUrlChange, onCaptionChange } = newPostSlice.actions;

export default newPostSlice.reducer;
