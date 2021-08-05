import { createAsyncThunk } from "@reduxjs/toolkit";

  export const submitNewPost = createAsyncThunk(
    "newPost/submitNewPost",
    async ({ imageUrl, caption }, thunkAPI) => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userData"));
  
        const response = await fetch("http://localhost:5000/post/add-post", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ imageUrl, caption }),
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

  export const fetchPosts = createAsyncThunk(
    "postList/fetchPosts",
    async (_, thunkAPI) => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
  
      try {
        const response = await fetch("http://localhost:5000/post/posts", {
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

  export const fetchPostsByUserId = createAsyncThunk(
    "postList/fetchPostsByUserId",
    async (userId, thunkAPI) => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
  
      try {
        const response = await fetch(`http://localhost:5000/post/user/${userId}`, {
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

  export const fetchPostById = createAsyncThunk(
    'post/fetchPostById',
    async (postId, thunkAPI) => {
      const {token} = JSON.parse(localStorage.getItem('userData'));
  
      try {
        const response = await fetch(`http://localhost:5000/post/post/${postId}`, {
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
        return thunkAPI.rejectWithValue(err);
      }
    }
  );