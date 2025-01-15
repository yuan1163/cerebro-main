import { useUsersQuery } from '../generated';

export const useUsers = () => {
  const { data } = useUsersQuery();
  return data?.users;
};
