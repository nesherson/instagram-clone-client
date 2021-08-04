import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuthUser = createAsyncThunk(
  "authUser/fetchAuthUser",
  async (_, thunkAPI) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await fetch(`http://localhost:5000/users/authUser`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
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
  userId: null,
  email: "",
  fullname: "",
  username: "",
  profileImg: "",
  fetchAuthUserStatus: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = false;
      state.fetchAuthUserStatus.isSuccess = true;
      state.fetchAuthUserStatus.isError = false;
      state.userId = action.payload.user.id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.fullname = action.payload.user.fullname;
      state.profileImg = action.payload.user.profileImg;
    },
    [fetchAuthUser.pending]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = true;
      state.fetchAuthUserStatus.isSuccess = false;
      state.fetchAuthUserStatus.isError = false;
    },
    [fetchAuthUser.rejected]: (state, action) => {
      state.fetchAuthUserStatus.isFetching = false;
      state.fetchAuthUserStatus.isSuccess = false;
      state.fetchAuthUserStatus.isError = true;
      state.fetchAuthUserStatus.errorMessage = action.payload.message;
    },
  },
});

export const selectAuthUser = (state) => state.authUser;
export const selectFetchAuthUserStatus = (state) => state.authUser.fetchAuthUserStatus;

export const { logoutUser, clearError } = authUserSlice.actions;

export default authUserSlice.reducer;
