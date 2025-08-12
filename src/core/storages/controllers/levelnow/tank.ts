import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetTanks, apiGetTank, apiUpdateTank, apiDeleteTank, apiAddTank } from '@core/api/entities/levelnow/tank';
import { apiGetClient } from '@core/api/entities/levelnow/client';

export const useTanks = () => {
  const { data } = useQuery(['tanks'], () => apiGetTanks(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  if (!data) {
    return [];
  }
  return data.data;
};
export const useTank = (tankId: number | null) => {
  const { data } = useQuery(['tank', tankId], () => apiGetTank(tankId), {
    enabled: !!tankId, // Only fetch when we have a valid tank ID
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  if (!tankId) {
    return null;
  }
  if (!data || !data.success) {
    return null;
  }
  return data.data;
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

export const useUpdateTank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tankId,
      data,
    }: {
      tankId: number;
      data: Partial<{
        tankNo: string;
        deviceDescription: string;
        deviceOilType: string;
        deviceOilViscosity: string;
      }>;
    }) => apiUpdateTank(tankId, data),
    onSuccess: (data, variables) => {
      console.log('Tank updated successfully:', data);

      // Invalidate and refetch tank queries
      queryClient.invalidateQueries(['tanks']);
      queryClient.invalidateQueries(['tank', variables.tankId]);
    },
  });
};

export const useDeleteTank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tankId: number) => apiDeleteTank(tankId),
    onSuccess: (data, variables) => {
      console.log('Tank deleted successfully:', data);
      // Invalidate and refetch tank queries
      queryClient.invalidateQueries(['tanks']);
      queryClient.removeQueries(['tank', variables]);
    },
  });
};

export const useAddTank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deviceReference: string) => apiAddTank(deviceReference),
    onSuccess: () => {
      // Invalidate and refetch tank queries
      queryClient.invalidateQueries(['tanks']);
    },
  });
};
