import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IInsight } from './IInsight';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { BASE_URL } from '../../../__api__/api';

const SendRequest = new ClientRequestHandler(BASE_URL);

const initialState: IInsight = {
  loading: false,
  error: false,
  errorMessage: '',
  productInsightCount: {},
  topPerformingProducts: [],
  salesCountWidget: {}
};

const insightSlice = createSlice({
  name: 'insight',
  initialState,
  reducers: {
    // STARTS LOADING
    startLoading: (state) => {
      state.loading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },

    // GET PRODUCT INSIGHT COUNT
    getProductInsightCount: (state, action) => {
      state.loading = false;
      state.error = false;
      state.productInsightCount = action.payload;
    },

    // GET TOP PERFORMING PRODUCTS
    getTopPerformingProducts: (state, action) => {
      state.loading = false;
      state.error = false;
      state.topPerformingProducts = action.payload;
    },

    // GET SALES COUNT WIDGET
    getSalesCountWidget: (state, action) => {
      state.loading = false;
      state.error = false;
      state.salesCountWidget = action.payload;
    }
  }
});

const { reducer: insightReducer, actions: insightActions } = insightSlice;
export { insightReducer };

export const fetchProductInsightCount = (): any => async (dispatch: any) => {
  dispatch(insightActions.startLoading());
  try {
    const response = await SendRequest.get('/insights/view', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(insightActions.getProductInsightCount(response.data));
  } catch (error: any) {
    dispatch(insightActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const fetchTopPerformingProducts = (): any => async (dispatch: any) => {
  dispatch(insightActions.startLoading());
  try {
    const response = await SendRequest.get('/insights/topPerformingProduct', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    dispatch(insightActions.getTopPerformingProducts(response.data['Top performing Products']));
  } catch (error: any) {
    dispatch(insightActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const fetchInsightCount = (): any => async (dispatch: any) => {
  dispatch(insightActions.startLoading());
  try {
    const response = await SendRequest.get('/insights/sales/view', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    dispatch(insightActions.getSalesCountWidget(response.data));
  } catch (error: any) {
    dispatch(insightActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};
