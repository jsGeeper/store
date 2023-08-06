import { Dispatch } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../../__api__/api';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { profileUpdateActions } from './profileUpdateSlice';
import { ROLES } from '../../../utils/roles';
import setAuthorization from '../../../utils/setAuthorization';

const SendRequest = new ClientRequestHandler(BASE_URL);

// update personal info
export const updatePersonalProfile =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    console.log(data);
    dispatch(profileUpdateActions.startLoading());
    const roleMgr = data.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';
    try {
      const response = await SendRequest.post(
        `/${roleMgr}/update/personalInfo/setup/${data.id}`,
        data,
        setAuthorization()
      );
      dispatch(profileUpdateActions.updatePersonalInfo(response.data));
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

// fetch farm information and location
export const fetchFarmInfoAndLocation =
  (id: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(profileUpdateActions.startLoading());
    try {
      const response = await SendRequest.get(`/farmer/farmInformation/${id}`, setAuthorization());
      dispatch(profileUpdateActions.fetchFarmInfoAndLocation(response.data['Farmer farm Information'][0]));
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

// update farm location
export const updateProfileFarmLocation =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    const url =
      data.role === ROLES.AGRIC_EXPERT
        ? `/agricExpert/update/expertLocation/setup`
        : '/farmer/update/farmerLocation/setup';

    dispatch(profileUpdateActions.startLoading());
    try {
      const response = await SendRequest.post(`${url}/${data.id}`, data, setAuthorization());
      dispatch(profileUpdateActions.updateFarmLocation(response.data));
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

/**
 *
 * @error this endpoint is not working
 * @returns
 */
export const fetchSettlement =
  (user_id: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(profileUpdateActions.startLoading());
    try {
      const response = await SendRequest.get(`/farmer/getFundingSettlement/${user_id}`, {
        header: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      dispatch(profileUpdateActions.getSettlement(response.data['Farmer Settlement']));
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

export const postAddPaymentMethod =
  (payload: {
    card_name?: string;
    card_number?: string;
    expiration_month_year?: string;
    card_cvv?: string;
    methodStatus: string;
    id: string;
    triggerSnackbar: () => void;
  }): any =>
  async (dispatch: Dispatch) => {
    // dispatch(profileUpdateActions.startLoading());
    try {
      const res = await SendRequest.post(`/farmer/update/paymentMethod/setup/${payload.id}`, payload, {
        header: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      payload.triggerSnackbar();
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

/**
 *
 * @error this endpoint is not working
 * @returns
 */
export const postSettlement =
  (payload: {
    user_id: string;
    accountNumber: string;
    bankName: string;
    accountName: string;
    triggerSnackbar: () => void;
  }): any =>
  async (dispatch: Dispatch) => {
    dispatch(profileUpdateActions.startLoading());
    try {
      await SendRequest.post(
        `/settlements/setup/${payload.user_id}`,
        { ...payload, status: 'pending' },
        {
          header: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );

      fetchSettlement(payload.user_id);
      payload.triggerSnackbar();
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };

// update dp
export const updateDp =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    const roleMgr = data.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';
    dispatch(profileUpdateActions.startLoading());
    try {
      const response = await SendRequest.post(`/${roleMgr}/upload/profilePicture/setup`, data, {
        header: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      dispatch(profileUpdateActions.updateDp(response.data));
    } catch (error) {
      dispatch(profileUpdateActions.hasError(error));
    }
  };
