// import apiClient from "../services/api-client";
import { APIClient } from '../services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Response from '../response/response';
import ErrorResponse from '../response/error';

export interface ProductList {
  productName: string;
  productDescription: string;
  regularPrice: number;
  salePrice: number;
  category: number;
  subCategory: number;
  unit: number;
  processingTime: string;
  inStock: number;
  acceptReturn: boolean;
  returnPolicy: string;
  product_image: string;
}
export interface ApiResponse {
  success: boolean;
  message: {
    token: string;
  } | null;
  data: any;
  errors: null;
}
const apiClient = new APIClient<ApiResponse, ProductList>('/products');
const response = new Response();
const errorResponse = new ErrorResponse();
export class RequestError extends Error {
  response: any; // Adjust the type based on the response structure you expect

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

const useListProducts = (config: any) => {
  return useMutation<ApiResponse, RequestError, ProductList>(
    (newData: ProductList) => apiClient.post(newData, config),
    {
      onSuccess: (data, variable) => {
        console.log(data);
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        // response.registerResponse(data, variable);
      },
      onError: (error) => {
        if (error.response) {
          console.log('An error occurred:', error.response.data.message);
          // i want to scroll to top using window.scroll with  smooth scroll behaviour
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });

          // errorResponse.registerError(error.response.data.message);
        }
      }
    }
  );
};
export default useListProducts;
