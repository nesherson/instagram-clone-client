import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice/authSlice';
import userReducer from '../features/user/userSlice/userSlice';
import newPostReducer from '../features/posts/postsSlice/newPostSlice';
import postListReducer from '../features/posts/postsSlice/postListSlice';
import newCommentReducer from '../features/posts/postsSlice/newCommentSlice';
import likesReducer from '../features/posts/postsSlice/likesSlice'
import savedPostListReducer from '../features/posts/postsSlice/savedPostListSlice';
import postReducer from '../features/posts/postsSlice/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    newPost: newPostReducer,
    postList: postListReducer,
    newComment: newCommentReducer,
    likes: likesReducer,
    savedPostList: savedPostListReducer,
    post: postReducer
  },
});
