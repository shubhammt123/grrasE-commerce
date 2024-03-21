import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, UserData, AuthError } from '../types/authTypes';



interface SignupPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  mobileNumber?: string;
}

export const signupUser = createAsyncThunk<UserData, SignupPayload, { rejectValue: AuthError }>(
  'auth/signupUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(signupUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload?.message || 'Signup failed';
      })
    
  },
});

export default authSlice.reducer;
