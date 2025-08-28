import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  apiGetClients,
  apiGetClient,
  apiUpdateClient,
  apiAddClient,
  apiDeleteClient,
} from '@core/api/entities/levelnow/client';
import { ClientData } from '@core/api/types';

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

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: number; data: Partial<ClientData> }) =>
      apiUpdateClient(clientId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch tank queries
      queryClient.invalidateQueries(['clients']);
      queryClient.invalidateQueries(['client', variables.clientId]);
    },
  });
};

export const useAddClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ClientData>) => apiAddClient(data), // Assuming 0 is used for new clients
    onSuccess: (data) => {
      // Invalidate and refetch clients
      queryClient.invalidateQueries(['clients']);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: number) => apiDeleteClient(clientId),
    onSuccess: () => {
      // Invalidate and refetch clients
      queryClient.invalidateQueries(['clients']);
    },
  });
};
