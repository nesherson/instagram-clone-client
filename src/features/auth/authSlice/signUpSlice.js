import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  fullname: '',
  username: '',
  password: '',
};

export const signupSlice = createSlice({
  name: 'signup',
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
});

export const selectEmail = (state) => state.signup.email;
export const selectFullname = (state) => state.signup.fullname;
export const selectUsername = (state) => state.signup.username;
export const selectPassword = (state) => state.signup.password;

export const {
  onEmailChange,
  onFullnameChange,
  onUsernameChange,
  onPasswordChange,
} = signupSlice.actions;

export default signupSlice.reducer;
