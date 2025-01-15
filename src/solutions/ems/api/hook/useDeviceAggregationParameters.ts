import { useQuery } from '@tanstack/react-query';
import { apiGetDeviceParametersAggregation, DeviceAggregationInput } from '../entities/deviceItems';

export const useDeviceAggregationParameters = (filter: DeviceAggregationInput) => {
  const bothDevicIdLocationId =
    (filter.deviceId && filter.locationId) || (!filter.deviceId && !filter.locationId) ? true : false;

  const { isLoading, isFetching, data } = useQuery(
    ['DeviceParametersAggregation', filter],
    () => apiGetDeviceParametersAggregation(filter),
    {
      enabled: !!filter.startDate && !!filter.endDate && bothDevicIdLocationId,
      staleTime: 5 * (60 * 1000),
    },
  );

  return {
    isFetching: isFetching,
    isLoading: isLoading,
    data: data,
  };
};
