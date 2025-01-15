import { useQuery } from '@tanstack/react-query';
import { apiGetLocationProperties, LocationProperteInput } from '../entities/locations';

export const useLocationProperte = (filter: LocationProperteInput) => {
  const { data } = useQuery(['locationProperties', filter], () => apiGetLocationProperties(filter), {
    enabled: !!filter.locationId,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return data;
};
