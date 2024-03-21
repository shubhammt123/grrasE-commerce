import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, UserData, AuthError } from '../types/authTypes';

interface LoginPayload {
  email: string;
  password: string;
}


export const loginUser = createAsyncThunk<UserData, LoginPayload, { rejectValue: AuthError }>(
    'auth/loginUser',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          const error: AuthError = await response.json();
          return rejectWithValue(error);
        }
  
        const data: UserData = await response.json();
        return data;
      } catch (error) {
        
        return rejectWithValue({ message: (error as Error).message });
      }
    }
  );

const initialState: AuthState = {
  isAuthenticated: false,
  loading: 'idle',
  user: null,
  error: null,
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload?.message || 'Login failed';
      });
    
  },
});

export default loginSlice.reducer;
