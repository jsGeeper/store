import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface SubCategory {
  id: number;
  name: string;
  parentId: number;
  image: string | null;
  featured: boolean;
}

interface Category {
  id: number;
  name: string;
  parentId: number | null;
  image: string | null;
  featured: boolean;
  subCategory?: SubCategory[]; // Optional if subCategory is not always present
}
export interface CategoryProps {
  success: boolean;
  message: string;
  errors: null;
  data: Category[];
}
// Set the token for endpoints that require it

const useGetCategories = () => {
  const apiClient = new APIClient<CategoryProps>(`/categories`);

  // Use the useQuery hook from react-query to fetch data
  const { data, isLoading, error } = useQuery<CategoryProps, Error>({
    queryKey: ['get_categories'],
    queryFn: apiClient.get
  });
  const filteredData = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return { data: filteredData, isLoading, error };
};
export default useGetCategories;
