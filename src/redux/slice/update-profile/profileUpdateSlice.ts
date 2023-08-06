import { createSlice } from '@reduxjs/toolkit';
import { IProfileUpdate } from './IProfileUpdate';

const initialState: IProfileUpdate = {
  loading: false,
  error: false,
  errorMessage: '',
  updatePersonalInfo: {},
  farmInfoAndLocation: {},
  updateFarmLocation: {},
  getSettlement: [],
  updateDp: {}
};

const profileUpdateSlice = createSlice({
  name: 'profileUpdate',
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
      state.errorMessage = action.payload;
    },

    // UPDATE PERSONAL INFO
    updatePersonalInfo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updatePersonalInfo = action.payload;
    },

    // FETCH FARM INFO AND LOCATION
    fetchFarmInfoAndLocation: (state, action) => {
      state.loading = false;
      state.error = false;
      state.farmInfoAndLocation = action.payload;
    },

    // UPDATE FARM LOCATION
    updateFarmLocation: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateFarmLocation = action.payload;
    },

    // GET SETTLEMENT
    getSettlement: (state, action) => {
      state.loading = false;
      state.error = false;
      state.getSettlement = action.payload;
    },

    // UPDATE DP
    updateDp: (state, action) => {
      state.loading = false;
      state.error = false;
      state.updateDp = action.payload;
    }
  }
});

const { reducer: profileUpdateReducer, actions: profileUpdateActions } = profileUpdateSlice;
export { profileUpdateReducer, profileUpdateActions };
