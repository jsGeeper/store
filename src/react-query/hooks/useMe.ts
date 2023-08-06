import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface UserDetails {
  success: boolean;
  message: string;
  data: {
    statusCode: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      gender: string | null;
      roleId: number;
      isActivated: boolean;
      points: number;
      passwordIsDirty: boolean;
      address: string | null;
      status: string;
      createdAt: string;
      updatedAt: string;
      role: string;
    };
  };
  errors: null;
}
// Set the token for endpoints that require it

const useMe = () => {
  const apiClient = new APIClient<UserDetails>(`/account/me`);

  // Use the useQuery hook from react-query to fetch data
  return useQuery<UserDetails, Error>({
    queryKey: ['me'],
    queryFn: apiClient.get
  });
};
export default useMe;
