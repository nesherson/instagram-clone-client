import { createSlice } from '@reduxjs/toolkit';

import { fetchUserByUsername } from '../api/userAPI';

const initialState = {
  userId: null,
  email: '',
  fullname: '',
  username: '',
  profileImg: '',
  userFetchStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserByUsername.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
    },
    [fetchUserByUsername.pending]: (state, action) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchUserByUsername.rejected]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const selectUser = (state) => state.user;
export const selectUserFetchStatus = (state) => state.userFetchStatus;

export default userSlice.reducer;
