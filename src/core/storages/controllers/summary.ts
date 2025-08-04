import { useQuery } from '@tanstack/react-query';
import { apiGetOverviewSummary } from '@core/api/entities/levelnow/summary';
import { SummaryParameters } from '@core/api/types';

export const useSummary = (parameters: SummaryParameters) => {
  const { data } = useQuery(['summary'], () => apiGetOverviewSummary(parameters), {
    enabled: !!parameters.userId,
  });
  return data;
};
