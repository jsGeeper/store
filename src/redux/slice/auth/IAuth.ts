export interface IAuth {
  loading: boolean;
  error: boolean;
  message: string;
  errorMessage: any;
  data: any;
  verified: boolean;
  isAuthenticated: boolean;
  isInitiated: boolean;
  user: any;
  role: string;
}
