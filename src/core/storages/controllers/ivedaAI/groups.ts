import { useQuery } from '@tanstack/react-query';
import { apiGetIvedaAIGroups } from '@core/api/entities/ivedaAI/groups';

export const useIvedaAIGroups = () => {
  const { data } = useQuery(['ivedaAIGroups'], () => apiGetIvedaAIGroups(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
