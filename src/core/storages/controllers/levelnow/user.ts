import { useQuery } from '@tanstack/react-query';
import { apiGetUsers, apiGetRepUser } from '@core/api/entities/levelnow/user';
import { RepUserTitle } from '@core/api/types';

export const useUsers = () => {
  const { data } = useQuery(['users'], () => apiGetUsers(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
export const useRepUser = (title: RepUserTitle) => {
  const { data } = useQuery(['repUser', title], () => apiGetRepUser(title), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
