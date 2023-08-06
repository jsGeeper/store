import React from 'react';
import { Onboarding } from '../container/onboarding';
import { RegistrationScreen } from '../container/registration';
import { LoginScreen } from '../container/login';
import { ForgetPassword } from '../container/forget-password';
import { PasswordResetVerify } from '../container/passord-reset-verify';
import { PasswordReset } from '../container/password-reset';
import { PAGES, PATH_DASHBOARD } from './pages';
import { VerifyAccount } from '../container/verify-account';
import {
  AccountVerification,
  ExpertExperience,
  GetStarted,
  PaymentMethod,
  PersonalDetails
} from '../container/get-started';
import GuestGuard from '../guards/GuestGuard';
import { AddListing, OrderRequest, StoreListing, StoreSetup, StoreSetupInitialize } from '../container/dashboard/store';
import StoreGuard from '../guards/StoreGuard';
import { SingleListing } from '../container/dashboard/single-listing';
import { Orders } from '../container/dashboard/orders';
import { SingleOrderView } from '../container/dashboard/single-order-view';
import { ProfileSetting } from '../container/profile-setting';
import { JobApplicantList, ListJobsScreen, ViewApplicantInformation, ViewJobScreen } from '../container/jobs';
import { CreateJobScreen } from '../container/jobs/CreateJobScreen';
import { ExploreScreen } from '../container/explore/ExploreScreen';
import { ExploreSingleJob } from '../container/jobs/ExploreSingleJob';
import { MyJobsScreen } from '../container/jobs/MyJobsScreen';
import { MyJobDetailsScreen } from '../container/jobs/MyJobDetailsScreen';
import { MessagingScreen } from '../container/MessagingScreen';
import WalletScreen from '../container/wallet';
import { TeamsScreen } from '../container/teams/TeamsScreen';
import { Insight } from '../container/insight/Insight';

const basic_route = [
  { id: 0, name: 'Home', path: PAGES.ROOT, component: <Onboarding /> },
  { id: 1, name: 'Onboarding', path: PAGES.ONBOARDING, component: <Onboarding /> },
  {
    id: 2,
    name: 'Registration',
    path: PAGES.REGISTRATION,
    component: (
      <GuestGuard>
        <RegistrationScreen />
      </GuestGuard>
    )
  },
  {
    id: 3,
    name: 'Login',
    path: PAGES.LOGIN,
    component: (
      <GuestGuard>
        <LoginScreen />
      </GuestGuard>
    )
  },
  {
    id: 4,
    name: 'Forgot Password',
    path: PAGES.FORGOT_PASSWORD,
    component: <ForgetPassword />
  },
  {
    id: 5,
    name: 'Forgot Reset Verification',
    path: PAGES.PSWDRESET_VERIFY,
    component: <PasswordResetVerify />
  },
  {
    id: 6,
    name: 'Password Reset',
    path: PAGES.PSWDRESET,
    component: <PasswordReset />
  },
  {
    id: 7,
    name: 'Verify Account',
    path: PAGES.VERIFY_ACCOUNT,
    component: <VerifyAccount />
  }
];

const dashboard_route = [
  { id: 1, name: 'Dashboard - root', path: PATH_DASHBOARD.ROOT, component: <GetStarted /> },
  { id: 2, name: 'Get Started', path: PATH_DASHBOARD.GET_STARTED, component: <GetStarted /> },
  {
    id: 3,
    name: 'Get Started | Personal Details',
    path: PATH_DASHBOARD.PERSONAL_DETAILS,
    component: <PersonalDetails />
  },
  {
    id: 4,
    name: 'Get Started | Account Verification',
    path: PATH_DASHBOARD.ACCOUNT_VERIFICATION,
    component: <AccountVerification />
  },
  {
    id: 5,
    name: 'Get Started | Payment Method',
    path: PATH_DASHBOARD.PAYMENT_METHOD,
    component: <PaymentMethod />
  },
  {
    id: 6,
    name: 'Get Started | Experience',
    path: PATH_DASHBOARD.EXPERT_EXPERIENCE,
    component: <ExpertExperience />
  },
  {
    id: 7,
    name: 'Store Setup',
    path: PATH_DASHBOARD.STORE_SETUP,
    component: (
      <StoreGuard>
        <StoreSetup />
      </StoreGuard>
    )
  },
  {
    id: 8,
    name: 'Store Listing',
    path: PATH_DASHBOARD.STORE,
    component: (
      <StoreGuard>
        <StoreListing />
      </StoreGuard>
    )
  },
  {
    id: 9,
    name: 'Store Setup Initialize',
    path: PATH_DASHBOARD.STORE_SETUP_INITIALIZE,
    component: (
      <StoreGuard>
        <StoreSetupInitialize />
      </StoreGuard>
    )
  },
  {
    id: 10,
    name: 'Store Setup | Add Listing',
    path: PATH_DASHBOARD.LIST_PRODUCTS,
    component: <AddListing />
  },
  {
    id: 11,
    name: 'Single Product',
    path: PATH_DASHBOARD.VIEW_SINGLE_PRODUCT,
    component: <SingleListing />
  },
  {
    id: 12,
    name: 'Orders',
    path: PATH_DASHBOARD.ORDERS,
    component: <Orders />
  },
  {
    id: 13,
    name: 'Store | Order Request',
    path: PATH_DASHBOARD.STORE_ORDER_REQUEST,
    component: <OrderRequest />
  },
  {
    id: 14,
    name: 'Order | View Order',
    path: `${PATH_DASHBOARD.ORDER_DETAILS}/order=:orderID/pld=:productID`,
    component: <SingleOrderView />
  },
  {
    id: 15,
    name: 'Profile Settings',
    path: PATH_DASHBOARD.PROFILE_SETTINGS,
    component: <ProfileSetting />
  },
  { id: 16, name: 'Jobs | List Jobs', path: PATH_DASHBOARD.JOBS, component: <ListJobsScreen /> },
  { id: 17, name: 'Jobs | View Jobs', path: PATH_DASHBOARD.JOB_DETAILS, component: <ViewJobScreen /> },
  { id: 18, name: 'Jobs | Applicant List', path: PATH_DASHBOARD.JOB_APPLICANTS, component: <JobApplicantList /> },
  {
    id: 19,
    name: 'Jobs | View Applicant',
    path: PATH_DASHBOARD.APPLICANT_DETAIL,
    component: <ViewApplicantInformation />
  },
  { id: 20, name: 'Jobs | Create', path: PATH_DASHBOARD.JOB_CREATE, component: <CreateJobScreen /> },
  { id: 21, name: 'Explore', path: PATH_DASHBOARD.EXPLORE, component: <ExploreScreen /> },
  { id: 21, name: 'Explore | Job Details', path: PATH_DASHBOARD.EXPLORE_DETAILS, component: <ExploreSingleJob /> },
  { id: 22, name: 'My Jobs', path: PATH_DASHBOARD.MY_JOBS, component: <MyJobsScreen /> },
  { id: 23, name: 'My Jobs | Details', path: PATH_DASHBOARD.MY_JOB_DETAILS, component: <MyJobDetailsScreen /> },
  { id: 24, name: 'Messages', path: PATH_DASHBOARD.MESSAGES, component: <MessagingScreen /> },
  { id: 25, name: 'Wallet', path: PATH_DASHBOARD.WALLET, component: <WalletScreen /> },
  { id: 26, name: 'Teams', path: PATH_DASHBOARD.TEAM, component: <TeamsScreen /> },
  { id: 27, name: 'Insight', path: PATH_DASHBOARD.INSIGHT, component: <Insight /> }
];

export { basic_route, dashboard_route };
