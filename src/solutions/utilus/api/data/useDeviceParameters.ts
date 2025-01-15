import { useQuery } from '@tanstack/react-query';
import { DeviceInput } from '@core/api/types';
import { apiGetDeviceParameters } from '@core/api/entities/deviceItems';

export const useDeviceParameters = (filter: DeviceInput) => {
  const { data } = useQuery(['DeviceParameters', filter], () => apiGetDeviceParameters(filter), {
    enabled: !!filter.locationId && !!filter.deviceId,
  });
  return data;
};
