import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from './IAuth';

const initialState: IAuth = {
  loading: false,
  error: false,
  errorMessage: '',
  message: '',
  data: {},
  verified: false,
  isAuthenticated: false,
  isInitiated: false,
  user: {},
  role: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // INITIALIZE
    initialize: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      state.loading = false;
      state.isAuthenticated = isAuthenticated;
      state.isInitiated = true;
      state.user = user;
    },

    // STARTS LOADING
    startLoading: (state) => {
      state.loading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.message = action.payload.message;
    },

    // REGISTRATION
    registration: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.data = data;
    },

    // VERIFY PHONE NUMBER
    verifyOTP: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.verified = action.payload.data.verified;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
    },

    // RESEND OTP
    resendOTP: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
    },

    // LOGIN
    login: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.data.Farmer;
    },

    // SWITCH ROLE
    switchRole: (state) => {
      state.loading = false;
      state.error = false;
    },

    // FORGET PASSWORD
    forgetPassword: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },

    // RESET PASSWORD
    changePassword: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },

    // LOGOUT
    logout: (state) => {
      state.loading = false;
      state.error = false;
      state.message = '';
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

const { reducer: authReducer, actions: authActions } = authSlice;
export { authReducer, authActions };
