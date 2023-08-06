import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface ProductUnit {
  id: number;
  name: string;
}

interface ProductUnitsResponse {
  success: boolean;
  message: string;
  data: {
    productUnits: ProductUnit[];
  };
  errors: null | string[]; // You can adjust the error type based on your requirements
}

const useUnit = () => {
  const apiClient = new APIClient<ProductUnitsResponse>(`/products/units`);

  // Use the useQuery hook from react-query to fetch data
  const { data, isLoading, error } = useQuery<ProductUnitsResponse, Error>({
    queryKey: ['units'],
    queryFn: apiClient.get
  });
  const filteredData = data?.data.productUnits.map((item) => ({ value: item.name, label: item.name, id: item.id }));
  return { data: filteredData, isLoading, error };
};
export default useUnit;
