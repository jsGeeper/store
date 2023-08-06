export interface IStall {
  loading: boolean;
  error: boolean;
  listStores: {
    hasStore: boolean;
    store: any;
  };
  acceptAgreement: any;
  getCategories: any[];
  getSubCategories: any[];
  getProcessingTime: any[];
  getFarmerProducts: any[];
  getUnits: any[];
  addStoreLogo: any;
  storeSetup: any;
  addProductListing: any;
  addProductMedia: any;
}
