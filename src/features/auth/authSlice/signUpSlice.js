import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  fullname: '',
  username: '',
  password: '',
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
