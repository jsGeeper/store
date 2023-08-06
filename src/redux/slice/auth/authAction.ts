import Cookies from 'js-cookie';
import { Dispatch } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../__api__/api';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { authActions } from './authSlice';
import { isValidToken, setSession } from '../../../utils/jwt';

type AccessType = 'farmer' | 'agriBusinessOwner' | 'agricExpert';

const SendRequest = new ClientRequestHandler(BASE_URL);

export const initialize = (): any => async (dispatch: Dispatch) => {
  try {
    const accessToken = Cookies.get('accessToken');

    if (accessToken && isValidToken(accessToken)) {
      setSession(accessToken);

      const response = await SendRequest.get('/account/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      dispatch(authActions.initialize({ isAuthenticated: true, user: response.data.data.user }));
    } else {
      dispatch(authActions.initialize({ isAuthenticated: false }));
    }
  } catch (e) {
    dispatch(authActions.initialize({ isAuthenticated: false }));
  }
};

export const postRegister =
  ({ accessType, data }: { accessType: AccessType | any; data: any }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post(`/${accessType}/register`, data);
      const {
        data: { token }
      } = response.data;
      Cookies.set('accessToken', token, {
        expires: 1
        // Domain: 'gogeeper.com',
        // priority: 'high',
        // secure: true,
        // path: '/',
      });
      dispatch(authActions.registration(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postResendOtp =
  (payload: { phone_number: any }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/resend/otp', payload);
      dispatch(authActions.resendOTP(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postVerifyOTP =
  (payload: { otp: string; pin_id: any; phone_number: any }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/verify/otp', payload);
      dispatch(authActions.verifyOTP(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postForgotPasswordVerifyOTP =
  (payload: { otp: string; pin_id: any; phone_number: any }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/forgotpassword/verify/otp', payload);
      dispatch(authActions.verifyOTP(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postLogin =
  (payload: { phone_number: string; password: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/login', payload);
      const { token } = response.data.data;
      setSession(token);
      dispatch(authActions.login(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const switchRole =
  (payload: { role: string }): any =>
  async (dispatch: Dispatch) => {
    dispatch(authActions.startLoading());
    try {
      const roles = await SendRequest.get('/roles');
      const roleId = roles.data?.data.find((x: any) => x.name === payload.role)['id'];
      await SendRequest.get(`/account/switch_role/${parseInt(roleId)}`);

      dispatch(initialize());
      dispatch(authActions.switchRole());
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postForgotPassword =
  (payload: { phone_number: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/forgotPassword', payload);
      dispatch(authActions.forgetPassword(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postChangePassword =
  (payload: { phone_number: string | any; password: string; password_confirmation: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.startLoading());
      const response = await SendRequest.post('/create/FirstTimePassword', payload);
      dispatch(authActions.changePassword(response.data));
    } catch (error: any) {
      dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const postLogout = (): any => async (dispatch: Dispatch) => {
  dispatch(authActions.startLoading());
  try {
    dispatch(authActions.logout());
    window.location.href = '/';
  } catch (error: any) {
    dispatch(authActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};
