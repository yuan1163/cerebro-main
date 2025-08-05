import { useQuery } from '@tanstack/react-query';
import { apiGetLocations } from '@core/api/entities/levelnow/locations';

export const useLocations = () => {
  const { data } = useQuery(['locations', 'levelnow'], () => apiGetLocations());
  return data;
};
