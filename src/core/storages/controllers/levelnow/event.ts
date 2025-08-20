import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetEvents, apiGetEventsHistory } from '@core/api/entities/levelnow/events';

export const useEvents = () => {
  const { data } = useQuery(['events'], () => apiGetEvents(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};

export const useEventsHistory = (deviceRef: string | null) => {
  const { data } = useQuery(['eventsHistory', deviceRef], () => apiGetEventsHistory(deviceRef), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
