// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StoreData {
  avatar: string | null;
}
export interface UserResponse {
  success: boolean;
  message: string;
  errors: null;
}
const apiClient = new APIClient<UserResponse, StoreData>('/setup/updateAvatar?action=remove');
const response = new Response();
const errorResponse = new ErrorResponse();
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useRemoveAvatar = () => {
  return useMutation<UserResponse, RequestError, any>((newData: any) => apiClient.put(newData), {
    onSuccess: (data, variable) => {
      console.log(data);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000 // Auto-close the toast after 3 seconds
      });
    },
    onError: (error) => {
      if (error.response) {
        console.log(error);
        toast.error(error.response.data.message || error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000 // Auto-close the toast after 3 seconds
        });
        // errorResponse.registerError(error.response.data.message);
      }
    }
  });
};
export default useRemoveAvatar;
