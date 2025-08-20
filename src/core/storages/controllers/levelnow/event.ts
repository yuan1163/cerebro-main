import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetEvents } from '@core/api/entities/levelnow/events';

export const useEvents = () => {
  const { data } = useQuery(['events'], () => apiGetEvents(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
