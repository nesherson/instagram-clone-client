import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice/authSlice';
import authUserReducer from '../features/user/userSlice/authUserSlice/authUserSlice';
import newPostReducer from '../features/posts/postsSlice/newPostSlice';
import postListReducer from '../features/posts/postsSlice/postListSlice';
import newCommentReducer from '../features/posts/postsSlice/newCommentSlice';
import likesReducer from '../features/posts/postsSlice/likesSlice'
import savedPostsReducer from '../features/posts/postsSlice/savedPostsSlice';
import postReducer from '../features/posts/postsSlice/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserReducer,
    newPost: newPostReducer,
    postList: postListReducer,
    newComment: newCommentReducer,
    likes: likesReducer,
    savedPosts: savedPostsReducer,
    post: postReducer
  },
});
