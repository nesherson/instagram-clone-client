import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    onEmailChange: (state, action) => {
      state.email = action.payload;
    },
    onPasswordChange: (state, action) => {
      state.password = action.payload;
    },
    clearInput: (state, action) => {
      state.email = '';
      state.password = '';
    },
  },
});

export const selectEmail = (state) => state.logIn.email;
export const selectPassword = (state) => state.logIn.password;

export const { onEmailChange, onPasswordChange, clearInput } =
  logInSlice.actions;

export default logInSlice.reducer;
