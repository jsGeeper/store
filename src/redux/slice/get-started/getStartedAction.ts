import { Dispatch } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { BASE_URL } from '../../../__api__/api';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { getStartedActions } from './getStartedSlice';
import setAuthorization from '../../../utils/setAuthorization';
import { ROLES } from '../../../utils/roles';

const SendRequest = new ClientRequestHandler(BASE_URL);

const expertString = 'agricExpert';

// UPLOAD PROFILE PICTURE
export const uploadAvatar =
  ({ id, role, image }: { id: string | any; role: string; image: any }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/${role}/upload/profilePicture/setup`,
        { id, image },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      dispatch(getStartedActions.uploadAvatar(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handle remove profile picture
export const removeAvatar =
  ({ id, role }: { id: string; role: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(`/${role}/remove/profilePicture/${id}`, {}, setAuthorization());
      dispatch(getStartedActions.removeAvatar(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handle personal info update
export const updatePersonalInfo =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/${payload.role}/update/personalInfo/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updatePersonalInfo(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handle location update
export const updateLocation =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    const roleMgr = payload.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';

    const location =
      payload.role === ROLES.AGRIC_EXPERT
        ? `/${roleMgr}/update/expertLocation/setup/${payload.id}`
        : `/${roleMgr}/update/farmerLocation/setup/${payload.id}`;

    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(location, payload, setAuthorization());
      dispatch(getStartedActions.updateLocation(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handle farm info update
export const updateFarmInfo =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/farmer/update/farmerInfo/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updateFarmInfo(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handle professional bio
export const postUpdateBio =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/create/createBio/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updateBio(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handles update payment request
export const postUpdatePayment =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    console.log(payload);
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/farmer/update/paymentMethod/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updatePayment(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handles get timer
export const getTimerAction = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(getStartedActions.startLoading());
    const response = await SendRequest.get('/admin/getTimer');
    dispatch(getStartedActions.getTimer(response.data['List All Timer']));
  } catch (error: any) {
    dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// handles get scheduled time
export const getScheduledTimeAction =
  ({ id }: { id: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.get(`/agricExpert/get/getScheduled/${id}`);
      dispatch(getStartedActions.getScheduledTime(response.data['Your Scheduled Information']));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// handles update verification schedule
export const updateVerificationSchedule =
  ({ id, call_date, call_time }: { id: string; call_date: any; call_time: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/update/scheduleVerificationCall/setup/${id}`,
        { call_date, call_time },
        setAuthorization()
      );
      dispatch(getStartedActions.updateVerificationSchedule(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// HANDLES SUBMISSION OF IDENTITY VERIFICATION
export const postUpdateIdentity =
  ({
    id,
    role,
    id_type,
    id_number,
    id_image
  }: {
    id: string;
    role: string;
    id_type: string;
    id_number: string;
    id_image: string | any;
  }): any =>
  async (dispatch: Dispatch) => {
    try {
      console.log(role);
      dispatch(getStartedActions.startLoading());
      const roleMgr = role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';
      const location =
        role === ROLES.AGRIC_EXPERT
          ? `/${roleMgr}/identityVerification/setup/${id}`
          : `/${roleMgr}/update/accountVerification/setup/${id}`;

      const response = await SendRequest.post(location, { id_type, id_number, id_image }, setAuthorization());
      dispatch(getStartedActions.updateIdentity(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// UPDATE WORK EXPERIENCE
export const updateWorkExperience =
  ({
    id,
    work_title,
    work_company,
    work_start_date,
    work_end_date,
    work_description
  }: {
    id: string;
    work_title: string;
    work_company: string;
    work_start_date: string | Date;
    work_end_date: string | Date;
    work_description: string;
  }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/update/expertWorkExperience/setup/${id}`,
        {
          work_title,
          work_company,
          work_start_date,
          work_end_date,
          work_description
        },
        setAuthorization()
      );
      dispatch(getStartedActions.updateWorkExperience(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// UPDATE EDUCATION
export const updateEducation =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/update/expertEducation/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updateEducation(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// UPDATE LICENSE
export const updateLicense =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/update/expertLicense/Certification/setup/${payload.id}`,
        payload,
        setAuthorization()
      );
      dispatch(getStartedActions.updateLicense(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// UPDATE CONFIRM SCHEDULED TIME
export const updateConfirmSchedule =
  ({ id, email }: { id: string; email: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.post(
        `/agricExpert/update/scheduleVerificationCallConfirmation/setup/${id}`,
        { email },
        setAuthorization()
      );
      dispatch(getStartedActions.updateConfirmScheduledTime(response.data));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// export const getAccountConfirmationStatus =
//   ({ id }: { id: string }): any =>
//   async (dispatch: Dispatch) => {
//     try {
//       dispatch(getStartedActions.startLoading());
//       const response = await SendRequest.get(`/agricExpert/get/confirmation/user/status/${id}`, setAuthorization());
//       dispatch(getStartedActions.accountConfirmationStatus(response.data['User Status']));
//     } catch (error: any) {
//       dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
//     }
//   };

//  ============================================ handles getting status of kyc verification ========================================================
export const getAccountDetailsStatus =
  ({ id, role }: { id: string; role: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.get(`/${role}/get/accountDetails/user/status/${id}`, setAuthorization());
      role === expertString
        ? dispatch(getStartedActions.accountDetailStatus(response.data['Expert Status']))
        : dispatch(getStartedActions.accountDetailStatus(response.data['User Status']));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getAccountVerificationStatus =
  ({ id, role }: { id: string; role: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.get(`/${role}/get/accountVerification/user/status/${id}`, setAuthorization());
      role === expertString
        ? dispatch(getStartedActions.accountVerificationStatus(response.data['Expert Status']))
        : dispatch(getStartedActions.accountVerificationStatus(response.data['User Status']));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getAccountPaymentStatus =
  ({ id, role }: { id: string; role: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.get(`/${role}/get/paymentMethond/user/status/${id}`, setAuthorization());
      dispatch(getStartedActions.accountPaymentStatus(response.data['User Status']));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getExperiencesStatus =
  ({ id }: { id: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(getStartedActions.startLoading());
      const response = await SendRequest.get(
        `/agricExpert/get/levelOfExperience/user/status/${id}`,
        setAuthorization()
      );
      dispatch(getStartedActions.accountExperiencesStatus(response.data['Expert Status']));
    } catch (error: any) {
      dispatch(getStartedActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };
