import { useQuery } from '@tanstack/react-query';
import { apiGetIvedaAIAlerts } from '@core/api/entities/ivedaAI/alerts';

export const useIvedaAIAlerts = () => {
  const { data, isLoading, error } = useQuery(['ivedaAIAlerts'], () => apiGetIvedaAIAlerts(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  return {
    alerts: data ?? [],
    isLoading,
    error,
  };
};
