// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import loginSlice from '../slices/loginSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login : loginSlice
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
