import { createAsyncThunk } from "@reduxjs/toolkit";

export const likePost = createAsyncThunk(
    "postList/likePost",
    async (postId, thunkAPI) => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
  
      try {
        const response = await fetch(
          `http://localhost:5000/post/${postId}/like`,
          {
            method: "POST",
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
        return thunkAPI.rejectWithValue(err);
      }
    }
  );
  
  export const fetchLikes = createAsyncThunk(
    "likeList/fetchLikes",
    async (_, thunkAPI) => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userData"));
  
        const response = await fetch(`http://localhost:5000/post/likes`, {
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
        return thunkAPI.rejectWithValue(err);
      }
    }
  );

  
export const fetchLikesByPostId = createAsyncThunk(
  "post/fetchLikesByPostId",
  async (postId, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userData"));

      const response = await fetch(`http://localhost:5000/post/${postId}/likes`, {
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);
