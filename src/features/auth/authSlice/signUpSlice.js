import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  fullname: '',
  username: '',
  password: '',
};

export const signUpSlice = createSlice({
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
    onSubmit: (state) => {},
  },
});

export const selectEmail = (state) => state.email;
export const selectFullname = (state) => state.fullname;
export const selectUsername = (state) => state.username;
export const selectPassword = (state) => state.password;

export const {
  onEmailChange,
  onFullnameChange,
  onUsernameChange,
  onPasswordChange,
} = signUpSlice.actions;

export default signUpSlice.reducer;
