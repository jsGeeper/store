// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
export interface CleanResponse {
  success: boolean;
  message: string;
  errors: null;
}

const response = new Response();
const errorResponse = new ErrorResponse();
class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useUpdatePassword = () => {
  const apiClient = new APIClient<CleanResponse, Props>(`/account/update_password`);
  return useMutation<CleanResponse, RequestError, Props>((newData: Props) => apiClient.put(newData), {
    onSuccess: (data, variable) => {
      console.log(data);
      toast.success(data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000 // Auto-close the toast after 3 seconds
      });
    },
    onError: (error) => {
      if (error.response) {
        console.log('An error occurred:', error.response.data.message);
        toast.error(error.response.data.message || error.message);
      }
    }
  });
};
export default useUpdatePassword;
