import { createSlice } from '@reduxjs/toolkit';
import { IStall } from './IStall';

const initialState: IStall = {
  loading: false,
  error: false,
  listStores: {
    store: null,
    hasStore: false
  },
  acceptAgreement: {},
  getCategories: [],
  getUnits: [],
  getProcessingTime: [],
  getSubCategories: [],
  getFarmerProducts: [],
  addStoreLogo: {},
  storeSetup: {},
  addProductListing: {},
  addProductMedia: {}
};

const stallSlice = createSlice({
  name: 'stall',
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
    },

    // GET LIST STORES
    listStores: (state, action) => {
      state.loading = false;
      state.error = false;
      state.listStores.hasStore = action.payload.hasStore;
      state.listStores.store = action.payload.store;
    },

    // ACCEPT STORE AGREEMENT
    acceptStoreAgreement: (state, action) => {
      state.loading = false;
      state.error = false;
      state.acceptAgreement = action.payload;
    },

    // FETCH STORE CATEGORIES
    getCategories: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getCategories = action.payload;
    },

    // FETCH STORE SUB CATEGORIES
    getSubCategories: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getSubCategories = action.payload;
    },

    // FETCH STORE UNITS
    getUnits: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getUnits = action.payload;
    },

    // FETCH STORE PROCESSING TIME
    getProcessingTime: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getProcessingTime = action.payload;
    },

    // ADD STORE LOGO
    addStoreLogo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.addStoreLogo = action.payload;
    },

    // ADD STORE SETUP
    storeSetup: (state, action) => {
      state.loading = false;
      state.error = false;
      state.storeSetup = action.payload;
    },

    // ADD PRODUCT LISTING
    addProductListing: (state, action) => {
      state.loading = false;
      state.error = false;
      state.addProductListing = action.payload;
    },

    // ADD PRODUCT MEDIA
    addProductMedia: (state, action) => {
      state.loading = false;
      state.error = false;
      state.addProductMedia = action.payload;
    },

    // GET FARMER PRODUCTS
    getFarmerProducts: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getFarmerProducts = action.payload;
    }
  }
});

const { reducer: stallReducer, actions: stallActions } = stallSlice;

export { stallReducer, stallActions };
