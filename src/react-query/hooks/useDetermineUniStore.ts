// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';

interface Props {
  store_name: string;
}
export interface ApiResponse {
  success: boolean;
  message: string;
  errors: null;
}
const apiClient = new APIClient<ApiResponse, Props>('/snl/validate-store-name');
const response = new Response();
const errorResponse = new ErrorResponse();
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useDetermineUniStore = () => {
  return useMutation<ApiResponse, RequestError, Props>((newData: Props) => apiClient.post(newData), {
    onSuccess: (data, variable) => {
      console.log(data);
      // response.registerResponse(data, variable);
    },
    onError: (error) => {
      if (error.response) {
        console.log('An error occurred:', error.response.data.message);
        errorResponse.registerError(error.response.data.message);
      }
    }
  });
};
export default useDetermineUniStore;
