// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';

export interface Props {
  store_name: string;
  store_category: number;
  short_description: string;
  state: number;
  lga: number;
  agreeToTerms: boolean;
  banner: string;
}
export interface ApiResponse {
  success: boolean;
  message: {
    token: string;
  } | null;
  errors: null;
}
const apiClient = new APIClient<ApiResponse, Props>('/setup/createStore');
const response = new Response();
const errorResponse = new ErrorResponse();
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useCreateStore = (config: any) => {
  return useMutation<ApiResponse, RequestError, Props>((newData: Props) => apiClient.post(newData, config), {
    onSuccess: (data, variable) => {
      console.log(data);
      // response.registerResponse(data, variable);
    },
    onError: (error) => {
      if (error.response) {
        console.log(error);
        console.log('An error occurred:', error.response.data.message);

        // errorResponse.registerError(error.response.data.message);
      }
    }
  });
};
export default useCreateStore;
