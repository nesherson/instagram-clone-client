import { configureStore } from '@reduxjs/toolkit';

import signUpReducer from '../features/auth/authSlice/signUpSlice';
import logInReducer from '../features/auth/authSlice/logInSlice';
import userReducer from '../features/user/userSlice/userSlice';
import newPostReducer from '../features/posts/postsSlice/newPostSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    logIn: logInReducer,
    user: userReducer,
    newPost: newPostReducer,
  },
});
