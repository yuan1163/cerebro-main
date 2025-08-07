import { useQuery } from '@tanstack/react-query';
import { apiGetTanks } from '@core/api/entities/levelnow/tank';

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
