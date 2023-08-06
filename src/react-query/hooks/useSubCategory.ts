import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface SubCategory {
  id: number;
  name: string;
  parentId: number;
  image: string | null;
  featured: boolean;
}

export interface CategoryProps {
  success: boolean;
  message: string;
  errors: null;
  data: SubCategory[];
}
// Set the token for endpoints that require it

const useSubCategory = (param: number) => {
  const apiClient = new APIClient<CategoryProps>(`/categories/${param}`);

  // Use the useQuery hook from react-query to fetch data
  const { data, isLoading, error, refetch } = useQuery<CategoryProps, Error>({
    queryKey: ['sub_categories'],
    queryFn: apiClient.get
  });
  console.log('refetching suCategories', data);
  const filteredData = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return { data: filteredData, isLoading, error, refetch };
};
export default useSubCategory;
