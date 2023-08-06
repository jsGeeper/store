import { Dispatch, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IWallet } from './IWallet';
import { BASE_URL } from '../../../__api__/api';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { get } from 'lodash';

type Modals = 'fundingModal' | 'cardFundingModal' | 'addCardModal' | 'amountModal';

const SendRequest = new ClientRequestHandler(BASE_URL);

const initialState: IWallet = {
  loading: false,
  error: '',
  addCardModal: false,
  amount: 0,
  amountModal: false,
  cardFundingModal: false,
  fundingModal: false,
  selectedMethod: '',
  totalSales: 0,
  totalWithdrawal: 0,
  transactionHistory: [],
  walletBalance: 0
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // STARTS LOADING
    startLoading: (state) => {
      state.loading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ADD AMOUNT
    addAmount: (state, action) => {
      state.amount = action.payload;
    },

    // OPEN MODALS
    openModal: (state: any, action) => {
      state[action.payload] = true;
    },

    // CLOSE MODALS
    closeModal: (state: any, action) => {
      state[action.payload] = false;
    },

    // SELECTED METHOD
    selectedMethod: (state: any, action) => {
      state.selectedMethod = action.payload;
    },

    // GET WALLET BALANCE
    getWalletBalance: (state, action) => {
      state.loading = false;
      state.error = '';
      state.walletBalance = action.payload.amount;
    },

    // GET TOTAL WITHDRAWAL
    getTotalWithdrawal: (state, action) => {
      state.loading = false;
      state.error = '';
      state.totalWithdrawal = action.payload;
    },

    // GET TOTAL SALES
    getTotalSales: (state, action) => {
      state.loading = false;
      state.error = '';
      state.totalSales = action.payload;
    },

    // GET TRANSACTION HISTORY
    getTransactionHistory: (state, action) => {
      state.loading = false;
      state.error = '';
      state.transactionHistory = action.payload;
    }
  }
});

const { reducer: walletReducer } = walletSlice;

export const handleAddAmount =
  (amount: number): any =>
  (dispatch: any) => {
    dispatch(walletSlice.actions.addAmount(amount));
  };

export const handleOpenModal =
  (modal: Modals): any =>
  (dispatch: any) => {
    dispatch(walletSlice.actions.openModal(modal));
  };

export const handleCloseModal =
  (modal: Modals): any =>
  (dispatch: any) => {
    dispatch(walletSlice.actions.closeModal(modal));
  };

export const handleSelectedMethod =
  (method: string): any =>
  (dispatch: any) => {
    dispatch(walletSlice.actions.selectedMethod(method));
  };

export const getWalletBalanceAmount =
  ({ user_id }: { user_id: string }): any =>
  async (dispatch: any) => {
    dispatch(walletSlice.actions.startLoading());

    try {
      const response = await SendRequest.get(`/wallets/totalWallet/${user_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const { data } = response.data;

      dispatch(walletSlice.actions.getWalletBalance(data));
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getTotalWithdrawalAmount =
  ({ user_id }: { user_id: string }): any =>
  async (dispatch: any) => {
    dispatch(walletSlice.actions.startLoading());
    try {
      const response = await SendRequest.get(`/wallets/totalWithdrawal/${user_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const { data } = response.data;
      dispatch(walletSlice.actions.getTotalWithdrawal(data));
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getTotalSalesAmount =
  ({ user_id }: { user_id: string }): any =>
  async (dispatch: any) => {
    dispatch(walletSlice.actions.startLoading());
    try {
      const response = await SendRequest.get(`/wallets/incomeBalance/${user_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const { data } = response.data;
      dispatch(walletSlice.actions.getTotalSales(data));
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getTransactions =
  ({ user_id }: { user_id: string }): any =>
  async (dispatch: any) => {
    dispatch(walletSlice.actions.startLoading());
    try {
      const response = await SendRequest.get(`/wallets/histories/${user_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const { data } = response.data;
      dispatch(walletSlice.actions.getTransactionHistory(data));
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const submitWalletAmount =
  (amount: number, user_id: string): any =>
  async (dispatch: Dispatch) => {
    try {
      await SendRequest.post(
        `/withdrawal/${user_id}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const verifyWithdrawalPhoneOtp =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    try {
      const response = await SendRequest.post(`/withdraw/verify/otp`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const {
        data: {
          data: { token }
        }
      } = response.data;
      return token;
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const verifyWithdrawalEmailOtp =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    try {
      const response = await SendRequest.post(`/withdraw/verifyEmailOTP`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const {
        data: {
          data: { token }
        }
      } = response.data;
      return token;
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const submitWithdrawal =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    try {
      await SendRequest.post(`/wallets/withdrawWithPaystack`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      dispatch(walletSlice.actions.closeModal('amountModal'));
      getWalletBalanceAmount({ user_id: data.user_id });
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const submitWalletFund =
  (data: any): any =>
  async (dispatch: Dispatch) => {
    try {
      await SendRequest.post(`/wallets/fundWithPaystack`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      dispatch(walletSlice.actions.closeModal('fundingModal'));
      getWalletBalanceAmount({ user_id: data.user_id });
    } catch (error: any) {
      dispatch(walletSlice.actions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export { walletReducer };
