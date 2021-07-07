import { configureStore } from '@reduxjs/toolkit';

import signUpReducer from '../features/auth/authSlice/signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});
