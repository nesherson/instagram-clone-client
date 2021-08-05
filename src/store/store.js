import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice/authSlice';
import authUserReducer from '../features/user/userSlice/authUserSlice/authUserSlice';
import postsReducer from '../features/posts/postsSlice/postsSlice';
import authUserPostsReducer from '../features/user/userSlice/authUserSlice/authUserPostsSlice';
import authUserSavedPostsReducer from '../features/user/userSlice/authUserSlice/authUserSavedPostsSlice';
import commentsReducer from '../features/posts/postsSlice/commentsSlice';
import likesReducer from '../features/posts/postsSlice/likesSlice'
import savedPostsReducer from '../features/posts/postsSlice/savedPostsSlice';
import postReducer from '../features/posts/postsSlice/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserReducer,
    posts: postsReducer,
    authUserPosts: authUserPostsReducer,
    authUserSavedPosts: authUserSavedPostsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    savedPosts: savedPostsReducer,
    post: postReducer
  },
});
