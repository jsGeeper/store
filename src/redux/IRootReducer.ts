import { Reducer } from '@reduxjs/toolkit';
import { IAuth } from './slice/auth/IAuth';
import { IGetStarted } from './slice/get-started/IGetStarted';
import { IJobs } from './slice/jobs/IJobs';
import { IStall } from './slice/stall/IStall';
import { IProfileUpdate } from './slice/update-profile/IProfileUpdate';
import { IWallet } from './slice/wallet/IWallet';
import { IInsight } from './slice/insight/IInsight';
import { IOrders } from './slice/orders/IOrders';

export interface IRootReducerState {
  router: any;
  auth: any;
  getStarted: IGetStarted;
  stall: any;
  profileUpdate: any;
  wallet: IWallet;
  jobs: any;
  insight: IInsight;
  orders: IOrders;
}
