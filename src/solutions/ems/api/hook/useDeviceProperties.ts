import { useQuery } from '@tanstack/react-query';
import { DevicePropertiesInput, apiGetDeviceProperties } from '../entities/deviceProperties';

export const useDeviceProperties = (filter: DevicePropertiesInput) => {
  console.log('Calling useDeviceProperties with filter:', filter); // Add this line
  const { data } = useQuery(['DeviceProperties', filter], () => apiGetDeviceProperties(filter), {
    // without startDate and endDate would get expired part setting.
    enabled: !!filter.locationId && !!filter.deviceId,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  console.log('Received data from useDeviceProperties:', data); // Add this line
  return data;
};
