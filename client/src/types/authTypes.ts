export interface AuthState {
    isAuthenticated: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    user?: UserData | null; 
    error?: string | null;
  }
  
  export interface UserData {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
  }
  
  export interface AuthError {
    message: string;
  }
  