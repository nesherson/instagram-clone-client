import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSavedPosts = createAsyncThunk(
    'authUserSavedPosts/fetchSavedPosts',
    async (userId, thunkAPI) => {
      const {token} = JSON.parse(localStorage.getItem('userData'));
      try {
        const response = await fetch(`http://localhost:5000/post/user/${userId}/saved-posts`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
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

  
export const savePost = createAsyncThunk(
    "authUserSavedPosts/savePost",
    async (postId, thunkAPI) => {
      const { userId, token } = JSON.parse(localStorage.getItem("userData"));
      try {
        const response = await fetch(
          `http://localhost:5000/post/user/${userId}/save-post`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify({ postId }),
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