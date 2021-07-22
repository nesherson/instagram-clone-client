import { configureStore } from '@reduxjs/toolkit';

import signupReducer from '../features/auth/authSlice/signupSlice';
import loginReducer from '../features/auth/authSlice/loginSlice';
import userReducer from '../features/user/userSlice/userSlice';
import newPostReducer from '../features/posts/postsSlice/newPostSlice';
import postListReducer from '../features/posts/postsSlice/postListSlice';
import newCommentReducer from '../features/posts/postsSlice/newCommentSlice';
import commentListSlice from '../features/posts/postsSlice/commentListSlice';
import likeListSlice from '../features/posts/postsSlice/likeListSlice'
import savedPostListSlice from '../features/posts/postsSlice/savedPostListSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    user: userReducer,
    newPost: newPostReducer,
    postList: postListReducer,
    newComment: newCommentReducer,
    commentList: commentListSlice,
    likeList: likeListSlice,
    savedPostList: savedPostListSlice
  },
});
