import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface State {
  id: number;
  name: string;
  country_id: number;
  createdAt: string;
  updatedAt: string;
}
interface StatesProps {
  success: boolean;
  message: string;
  errors: null;
  data: State[];
}
// Set the token for endpoints that require it

const useStates = (params: number) => {
  const apiClient = new APIClient<StatesProps>(`/states/${params}`);

  // Use the useQuery hook from react-query to fetch data
  const { data, isLoading, error } = useQuery<StatesProps, Error>({
    queryKey: ['states'],
    queryFn: apiClient.get
  });
  const filteredData = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return { data: filteredData, isLoading, error };
};
export default useStates;
