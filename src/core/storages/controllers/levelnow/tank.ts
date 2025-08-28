import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  apiGetTanks,
  apiGetTank,
  apiUpdateTank,
  apiDeleteTank,
  apiAddTank,
  apiUpdateTankClient,
} from '@core/api/entities/levelnow/tank';
import { apiGetClient } from '@core/api/entities/levelnow/client';
import { TankData } from '@core/api/types';

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

export const useUpdateTankClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tankId, clientId }: { tankId: number; clientId: number }) => apiUpdateTankClient(tankId, clientId),
    onMutate: async ({ tankId, clientId }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['tank', tankId]);

      // Snapshot the previous value
      const previousTank = queryClient.getQueryData<TankData>(['tank', tankId]);

      // Optimistically update to the new value
      if (previousTank) {
        queryClient.setQueryData(['tank', tankId], (old: TankData | undefined) => {
          if (!old) return old;
          return {
            ...old,
            clientId,
          };
        });
      }
      // Return a context object with the snapshotted value
      return { previousTank, tankId };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTank) {
        queryClient.setQueryData(['tank', context.tankId], context.previousTank);
      }
    },
    onSuccess: async (data, variables) => {
      // Invalidate and refetch tank queries - await to ensure completion
      await Promise.all([
        queryClient.invalidateQueries(['tank', variables.tankId]),
        queryClient.invalidateQueries(['tanks']),
      ]);
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
