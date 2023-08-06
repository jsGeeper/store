import { Dispatch, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { IOrders } from './IOrders';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { BASE_URL } from '../../../__api__/api';

const SendRequest = new ClientRequestHandler(BASE_URL);

const initialState: IOrders = {
  loading: false,
  error: '',
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
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

    // GET ORDERS
    getOrders: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    }
  }
});

export default ordersSlice.reducer;

// const startLoading = () => {
//   return {
//     type: ordersSlice.actions.startLoading.type
//   };
// };

export const fetchOrders = (): any => async (dispatch: Dispatch) => {
  try {
    const response = await SendRequest.get('/store/getUserOrders', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    dispatch(ordersSlice.actions.getOrders(response.data.data['List Order Transactions']));
  } catch (error: any) {
    dispatch(ordersSlice.actions.hasError(error.message));
  }
};
