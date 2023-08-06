import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface ResponseProps {
  success: boolean;
  message: string;
  data: {
    email: string;
    token: string;
    type: string;
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

const useSulVerifyToken = (queryString: string) => {
  const apiClient = new APIClient<ResponseProps>(`/snl/verify-token?token=${queryString}`);
  return useQuery<ResponseProps, RequestError>({
    queryKey: ['sul-verify-token'],
    queryFn: apiClient.get
  });
};
export default useSulVerifyToken;
