import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../../__api__/api';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import setAuthorization from '../../../utils/setAuthorization';
import { stallActions } from './stallSlice';
import Cookies from 'js-cookie';

const SendRequest = new ClientRequestHandler(BASE_URL);
const accessToken = Cookies.get('accessToken');

// GET STORE LIST
export const getStallList = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(stallActions.startLoading());
    const response = await SendRequest.get(`/setup/store`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(stallActions.listStores(response.data?.data));
  } catch (error: any) {
    dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// GET STORE CATEGORIES LIST
export const getStallCategories = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(stallActions.startLoading());
    const response = await axios.get('https://gogeeper.co.uk/api/v1/gogeeper/marketplace/getallCatAndSubCat');

    dispatch(stallActions.getCategories(response.data['List All Categories & SubCategories']));
  } catch (error: any) {
    dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// GET STORE SUB CATEGORIES LIST
export const getStallSubCategories = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(stallActions.startLoading());
    const response = await SendRequest.get('/admin/getSubCategory');
    dispatch(stallActions.getSubCategories(response.data['List All Categories & SubCategories']));
  } catch (error: any) {
    dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// GET STORE UNITS LIST
export const getStallUnits = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(stallActions.startLoading());
    const response = await SendRequest.get('/admin/getUnit');
    dispatch(stallActions.getUnits(response.data['List All Unit']));
  } catch (error: any) {
    dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// GET STORE PROCESSING TIME LIST
export const getStallProcessingTime = (): any => async (dispatch: Dispatch) => {
  try {
    dispatch(stallActions.startLoading());
    const response = await SendRequest.get('/admin/getProcessTime');
    dispatch(stallActions.getProcessingTime(response.data['List All ProcessTime']));
  } catch (error: any) {
    dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

// SUBMIT STORE AGREEMENT
export const postAcceptAgreement =
  ({ id, agree }: { id: string; agree: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.post(`/store/agreement/setup/${id}`, { agree }, setAuthorization());
      dispatch(stallActions.acceptStoreAgreement(response.data));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ADD STORE LOGO
export const postAddStoreLogo =
  ({ id, storeImage }: { id: string; storeImage: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.post(`/store/upload/setup/image/${id}`, { storeImage }, setAuthorization());
      dispatch(stallActions.addStoreLogo(response.data));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ADD STORE SETUP
export const postStoreSetup =
  ({
    id,
    storeName,
    storeDescription,
    storeCategory,
    storeImage
  }: {
    id: string;
    storeName: string;
    storeDescription: string;
    storeCategory: string;
    storeImage: any;
  }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.post(
        `/store/setup/store/${id}`,
        { storeName, storeDescription, storeCategory, storeImage },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      dispatch(stallActions.storeSetup(response.data));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ADD PRODUCT LISTING
export const postAddProductListing =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.post('/store/createProduct/setup', payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(stallActions.addProductListing(response.data));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ADD PRODUCT MEDIA
export const postAddProductMedia =
  (payload: any): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.post('/store/updateProductImage/setup', payload, setAuthorization());
      dispatch(stallActions.addProductMedia(response.data));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// FETCH PRODUCT  LISTING
export const getProductListing =
  ({ id }: { id: string }): any =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(stallActions.startLoading());
      const response = await SendRequest.get(`/store/getProductsPerStoreOwners/${id}`, setAuthorization());
      dispatch(stallActions.getFarmerProducts(response.data.data['List of all Product In Your Store']));
    } catch (error: any) {
      dispatch(stallActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };
