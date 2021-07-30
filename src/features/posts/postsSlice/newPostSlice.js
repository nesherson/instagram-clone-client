import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitNewPost = createAsyncThunk(
  "newPost/submitNewPost",
  async ({ imageUrl, caption }, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userData"));

      const response = await fetch("http://localhost:5000/post/add-post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
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
  newPostSubmiting: false,
  newPostSubmitSuccess: false,
  newPostSubmitError: false,
  newPostSubmitErrorMessage: "",
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {},
  extraReducers: {
    [submitNewPost.fulfilled]: (state, action) => {
      state.newPostSubmiting = false;
      state.newPostSubmitSuccess = true;
      state.newPostSubmitError = false;
    },
    [submitNewPost.pending]: (state, action) => {
      state.newPostSubmiting = true;
      state.newPostSubmitSuccess = false;
      state.newPostSubmitError = false;
    },
    [submitNewPost.rejected]: (state, action) => {
      state.newPostSubmiting = false;
      state.newPostSubmitSuccess = false;
      state.newPostSubmitError = true;
      state.newPostSubmitErrorMessage = action.payload.message;
    },
  },
});

export const selectNewPost = (state) => state.newPost;

export default newPostSlice.reducer;
