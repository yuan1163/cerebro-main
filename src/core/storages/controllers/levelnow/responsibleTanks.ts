import { useQuery } from '@tanstack/react-query';
import { ResponsibleTanksParameters } from '@core/api/types';
import { apiGetResponsibleTanks } from '@core/api/entities/levelnow/responsibleTanks';

export const useResponsibleTanks = (parameters: ResponsibleTanksParameters) => {
  const { data } = useQuery(['responsibleTanks'], () => apiGetResponsibleTanks(parameters), {
    enabled: !!parameters.userId,
  });
  return data;
};
