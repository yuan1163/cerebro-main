import { useQuery } from '@tanstack/react-query';
import { apiGetIvedaAIAlert } from '@core/api/entities/ivedaAI/alert';

export const useIvedaAIAlert = () => {
  const { data } = useQuery(['ivedaAIAlert'], () => apiGetIvedaAIAlert(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data?.alerts ?? [];
};
