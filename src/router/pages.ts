export enum PATH_MAIN {
  DASHBOARD = '/dashboard'
}

export enum PAGES {
  ROOT = '/',
  ONBOARDING = '/onboarding',
  REGISTRATION = '/registration/access_type=:access_type',
  LOGIN = '/login',
  PSWDRESET_VERIFY = '/password-reset-verification/pin_id=:pin_id/eID=:eID',
  PSWDRESET = '/password-reset/eID=:eID',
  FORGOT_PASSWORD = '/forgot-password',
  VERIFY_ACCOUNT = '/verify-account/pin_id=:pin_id/eID=:eID'
}

export enum PATH_DASHBOARD {
  ROOT = '/',
  GET_STARTED = '/get-started',
  PERSONAL_DETAILS = '/get-started/personal-details',
  ACCOUNT_VERIFICATION = '/get-started/account-verification',
  EXPERT_EXPERIENCE = '/get-started/experience',
  PAYMENT_METHOD = '/get-started/payment-method',
  JOBS = '/jobs',
  JOB_DETAILS = '/jobs/:id',
  JOB_APPLICANTS = '/jobs/:id/applicants',
  APPLICANT_DETAIL = '/job/:jobId/applicant/:applicantId',
  JOB_CREATE = '/jobs/init/create',
  EXPERTS = '/experts',
  MESSAGES = '/messages',
  WALLET = '/wallet',
  STORE_SETUP = '/store/setup',
  STORE = '/store',
  STORE_SETUP_INITIALIZE = '/store/setup=initialize',
  STORE_ORDER_REQUEST = '/store/order-request/order=:orderId',
  ORDERS = '/orders',
  ORDER_DETAILS = '/orders/view',
  INSIGHT = '/insight',
  TEAM = '/team',
  LIST_PRODUCTS = '/store/list-products',
  VIEW_SINGLE_PRODUCT = '/store/listing/:id',
  PROFILE_SETTINGS = '/settings',
  EXPLORE = '/explore',
  EXPLORE_DETAILS = '/explore/job/:id',
  MY_JOBS = '/my-jobs',
  MY_JOB_DETAILS = '/my-jobs/:id'
}
