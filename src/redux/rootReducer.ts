import { IRootReducerState } from './IRootReducer';
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './slice/auth/authSlice';
import { getStartedReducer } from './slice/get-started/getStartedSlice';
import { stallReducer } from './slice/stall/stallSlice';
import { profileUpdateReducer } from './slice/update-profile/profileUpdateSlice';
import { walletReducer } from './slice/wallet/wallet.slice';
import { jobsReducer } from './slice/jobs/jobs.slice';
import { insightReducer } from './slice/insight/insight.slice';
import ordersReducer from './slice/orders/orders.slice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [],
  keyPrefix: 'redux-'
};

const stallPersistConfig = {
  key: 'stall',
  storage,
  whitelist: ['listStores'],
  keyPrefix: 'redux-'
};

const jobPersistor = {
  key: 'jobs',
  storage,
  whitelist: ['createJob', 'farmerActiveJobs', 'farmerCompletedJobs', 'farmerArchivedJobs', 'farmerDraftJobs'],
  keyPrefix: 'redux-'
};

const profilePersistor = {
  key: 'profileUpdate',
  storage,
  whitelist: ['getSettlement'],
  keyPrefix: 'redux-'
};

const rootReducer = (history: any) =>
  combineReducers<IRootReducerState>({
    router: connectRouter(history),
    auth: authReducer,
    getStarted: getStartedReducer,
    stall: stallReducer,
    profileUpdate: profileUpdateReducer,
    wallet: walletReducer,
    jobs: jobsReducer,
    insight: insightReducer,
    orders: ordersReducer
  });

export { rootReducer, rootPersistConfig };
