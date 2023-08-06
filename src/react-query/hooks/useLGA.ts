import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface LGA {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  stateId: number;
}
interface LGAProps {
  success: boolean;
  message: string;
  errors: null;
  data: LGA[];
}
// Set the token for endpoints that require it

const useLGA = (params: number) => {
  const apiClient = new APIClient<LGAProps>(`/lgas/${params}`);

  // Use the useQuery hook from react-query to fetch data
  const { data, isLoading, error, refetch } = useQuery<LGAProps, Error>({
    queryKey: ['lga'],
    queryFn: apiClient.get
  });
  const filteredData = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return { data: filteredData, isLoading, error, refetch };
};
export default useLGA;
