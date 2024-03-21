export interface SignupRequestBody {
    firstName: string;
    lastName?: string;
    email: string;
    mobileNumber?: string;
    password: string;
  }
  
  export interface LoginRequestBody {
    email: string;
    password: string;
  }
  