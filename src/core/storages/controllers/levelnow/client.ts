import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetClients, apiGetClient } from '@core/api/entities/levelnow/client';

export const useClients = () => {
  const { data } = useQuery(['clients'], () => apiGetClients(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};

export const useClient = (clientId: number | null) => {
  const { data } = useQuery(['client', clientId], () => apiGetClient(clientId), {
    enabled: !!clientId, // Only fetch when we have a valid client ID
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  if (!clientId) {
    return null;
  }
  if (!data || !data.success) {
    return null;
  }
  return data.data;
};
