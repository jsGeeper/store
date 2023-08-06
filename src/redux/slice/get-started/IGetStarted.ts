export interface IGetStarted {
  loading: boolean;
  error: boolean;
  // errorMessage: any;
  uploadAvatar: any;
  removeAvatar: any;
  updatePersonalInfo: any;
  updateLocation: any;
  updateFarmInfo: any;
  updateIdentity: any;
  updateWorkExperience: any;
  updatePayment: any;
  updateBio: any;
  updateEducation: any;
  updateLicense: any;
  updateConfirmScheduledTime: any;
  accountDetailsStatus: any[];
  accountVerificationStatus: any[];
  accountPaymentStatus: any[];
  accountExperiencesStatus: any[];
  accountConfirmationStatus: any;
  getTimer: any[];
  getScheduledTime: any[];
  updateVerificationSchedule: any;
}
