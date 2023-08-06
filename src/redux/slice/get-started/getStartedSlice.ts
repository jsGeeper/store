import { createSlice } from '@reduxjs/toolkit';
import { IGetStarted } from './IGetStarted';

const initialState: IGetStarted = {
  loading: false,
  error: false,
  // errorMessage: '',
  uploadAvatar: {},
  removeAvatar: {},
  updatePersonalInfo: {},
  updateLocation: {},
  updateFarmInfo: {},
  updateIdentity: {},
  updatePayment: {},
  updateBio: {},
  updateEducation: {},
  updateWorkExperience: {},
  updateLicense: {},
  updateConfirmScheduledTime: {},
  accountDetailsStatus: [],
  accountVerificationStatus: [],
  accountPaymentStatus: [],
  accountExperiencesStatus: [],
  accountConfirmationStatus: {},
  getTimer: [],
  getScheduledTime: [],
  updateVerificationSchedule: {}
};

const getStartedSlice = createSlice({
  name: 'getStarted',
  initialState,
  reducers: {
    // START LOADING
    startLoading: (state) => {
      state.loading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.loading = false;
      state.error = true;
      // state.errorMessage = action.payload;
    },

    // GET ACCOUNT DETAILS STATUS
    accountDetailStatus: (state, action) => {
      state.loading = false;
      state.error = false;
      state.accountDetailsStatus = action.payload;
    },

    // GET ACCOUNT VERIFICATION STATUS
    accountVerificationStatus: (state, action) => {
      state.loading = false;
      state.error = false;
      state.accountVerificationStatus = action.payload;
    },

    // GET ACCOUNT PAYMENT STATUS
    accountPaymentStatus: (state, action) => {
      state.loading = false;
      state.error = false;
      state.accountPaymentStatus = action.payload;
    },

    // GET ACCOUNT CONFIRMATION STATUS
    accountConfirmationStatus: (state, action) => {
      state.loading = false;
      state.error = false;
      state.accountConfirmationStatus = action.payload;
    },

    // GET ACCOUNT EXPERIENCES STATUS
    accountExperiencesStatus: (state, action) => {
      state.loading = false;
      state.error = false;
      state.accountExperiencesStatus = action.payload;
    },

    // UPLOAD PROFILE PICTURE
    uploadAvatar: (state, action) => {
      state.loading = false;
      state.error = false;
      state.uploadAvatar = action.payload;
    },

    // REMOVE PROFILE PICTURE
    removeAvatar: (state, action) => {
      state.loading = false;
      state.error = false;
      state.removeAvatar = action.payload;
    },

    // UPDATE PERSONAL INFO
    updatePersonalInfo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updatePersonalInfo = action.payload;
    },

    // UPDATE LOCATION
    updateLocation: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateLocation = action.payload;
    },

    // UPDATE FARM INFO
    updateFarmInfo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateFarmInfo = action.payload;
    },

    // GET TIMER
    getTimer: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getTimer = action.payload;
    },

    // GET SCHEDULED TIME
    getScheduledTime: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getScheduledTime = action.payload;
    },

    // UPDATE VERIFICATION SCHEDULE
    updateVerificationSchedule: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateVerificationSchedule = action.payload;
    },

    // UPDATE IDENTITY
    updateIdentity: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateIdentity = action.payload;
    },

    // UPDATE WORK EXPERIENCE
    updateWorkExperience: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateWorkExperience = action.payload;
    },

    // UPDATE PAYMENT
    updatePayment: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updatePayment = action.payload;
    },

    // UPDATE PROFESSIONAL BIO
    updateBio: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateBio = action.payload;
    },

    // UPDATE EDUCATION
    updateEducation: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateEducation = action.payload;
    },

    // UPDATE LICENSE
    updateLicense: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateLicense = action.payload;
    },

    // UPDATE CONFIRM SCHEDULED TIME
    updateConfirmScheduledTime: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateConfirmScheduledTime = action.payload;
    }
  }
});

const { reducer: getStartedReducer, actions: getStartedActions } = getStartedSlice;
export { getStartedReducer, getStartedActions };
