import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
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

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;

export const { onEmailChange, onPasswordChange, clearInput } =
  loginSlice.actions;

export default loginSlice.reducer;
