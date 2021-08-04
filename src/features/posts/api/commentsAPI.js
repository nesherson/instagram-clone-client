import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    "commentList/fetchCommentsByPostId",
    async (_, thunkAPI) => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userData"));
  
        const response = await fetch(
          `http://localhost:5000/post/comments`,
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
        return thunkAPI.rejectWithValue(err);
      }
    }
  );

  export const submitNewComment = createAsyncThunk(
    'newComment/submitNewComment',
    async ({ postId, newComment }, thunkAPI) => {
      try {
        const {token} = JSON.parse(localStorage.getItem('userData'));
  
        const response = await fetch(
          `http://localhost:5000/post/${postId}/add-comment`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
            body: JSON.stringify({ newComment }),
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

  export const fetchCommentsByPostId = createAsyncThunk(
    "post/fetchCommentsByPostId",
    async (postId, thunkAPI) => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userData"));
  
        const response = await fetch(
          `http://localhost:5000/post/${postId}/comments`,
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
        return thunkAPI.rejectWithValue(err);
      }
    }
  );