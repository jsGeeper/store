import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface RoleSwitchResponse {
  success: boolean;
  message: string;
  data: {
    statusCode: number;
    user: {
      id: number;
      roleId: number;
    };
  };
  errors: null;
}
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useSwitchRole = (params: string) => {
  const apiClient = new APIClient<RoleSwitchResponse>(`/account/switch_role/${params}`);
  return useQuery<RoleSwitchResponse, RequestError>({
    queryKey: ['switch-role'],
    queryFn: apiClient.get
  });
};
export default useSwitchRole;
