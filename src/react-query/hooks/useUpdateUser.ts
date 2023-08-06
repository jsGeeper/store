// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface UserResponse {
  success: boolean;
  message: {
    token: string;
  } | null;
  errors: null;
}
const apiClient = new APIClient<UserResponse, UserData>('/account/update');
const response = new Response();
const errorResponse = new ErrorResponse();
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useUpdateUser = () => {
  return useMutation<UserResponse, RequestError, UserData>((newData: UserData) => apiClient.put(newData), {
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
export default useUpdateUser;
