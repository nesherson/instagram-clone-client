import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { postSignUpData } from '../../../util/api';

export const onSubmit = createAsyncThunk(
  'signUp/onSubmit',
  async (arg, thunkAPI) => {
    console.log('createAsyncThunk/onSubmit: ', arg);
    const response = await postSignUpData(
      'http://localhost:5000/auth/signup',
      arg
    );

    return response;
  }
);

const initialState = {
  email: '',
  fullname: '',
  username: '',
  password: '',
  isLoading: false,
  hasError: false,
  error: null,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    onEmailChange: (state, action) => {
      state.email = action.payload;
    },
    onFullnameChange: (state, action) => {
      state.fullname = action.payload;
    },
    onUsernameChange: (state, action) => {
      state.username = action.payload;
    },
    onPasswordChange: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [onSubmit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [onSubmit.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [onSubmit.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      console.log('onSubmit.rejected: ', action.payload);
      state.error = action.payload.error;
    },
  },
});

export const selectEmail = (state) => state.signUp.email;
export const selectFullname = (state) => state.signUp.fullname;
export const selectUsername = (state) => state.signUp.username;
export const selectPassword = (state) => state.signUp.password;

export const {
  onEmailChange,
  onFullnameChange,
  onUsernameChange,
  onPasswordChange,
} = signUpSlice.actions;

export default signUpSlice.reducer;
