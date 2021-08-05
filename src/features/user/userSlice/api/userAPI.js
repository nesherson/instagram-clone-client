import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuthUser = createAsyncThunk(
    "authUser/fetchAuthUser",
    async (_, thunkAPI) => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
      try {
        const response = await fetch(`http://localhost:5000/users/auth-user`, {
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

  export const fetchUserByUsername = createAsyncThunk(
    "user/fetchUserByUsername",
    async (username, thunkAPI) => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
      try {
        const response = await fetch(
          `http://localhost:5000/users/user/${username}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
  
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