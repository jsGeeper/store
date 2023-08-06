import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../services/apiClient';

interface dataProps {
  id: number;
  name: string;
}
interface rolesProps {
  success: boolean;
  message: string;
  data: dataProps[];
  errors: null;
}
const apiClient = new APIClient<rolesProps>('/roles');

const useRoles = (registerAs: string) => {
  const { data } = useQuery({
    queryKey: ['roles'],
    queryFn: apiClient.get
  });
  const selectedRoleData = data?.data.find((role) => role.name === registerAs);
  return { id: selectedRoleData?.id };
};
export default useRoles;
