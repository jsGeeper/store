import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface StoreData {
  success: boolean;
  message: string;
  data: {
    hasStore: boolean;
    store: {
      id: number;
      userId: number;
      store_name: string;
      store_description: string;
      banner: string;
      bannerPublicId: string;
      avatar: string | null;
      avatarPublicId: string | null;
      state: number;
      lga: number;
      agreeToTerms: boolean;
      status: string;
      store_category: number;
      createdAt: string;
      updatedAt: string;
      stateName: {
        name: string;
      };
      lgas: {
        name: string;
        id: number;
      };
      categories: {
        name: string;
        id: number;
      };
      user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
      };
    };
  };
  errors: null;
}
// Set the token for endpoints that require it

const useGetStore = () => {
  const apiClient = new APIClient<StoreData>(`setup/store`);

  // Use the useQuery hook from react-query to fetch data
  return useQuery<StoreData, Error>({
    queryKey: ['get_store'],
    queryFn: apiClient.get
  });
};
export default useGetStore;
