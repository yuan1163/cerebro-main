import { useQueries, useQuery } from '@tanstack/react-query';
import { apiGetDeviceParametersHistory, DeviceHistoryInput } from '../entities/deviceItems';

export const useDeviceHistoryParameters = (filter: DeviceHistoryInput) => {
  // const bothDevicIdLocationId =
  //  (filter.deviceId && filter.locationId) || (!filter.deviceId && !filter.locationId) ? true : false;
  const bothDevicIdLocationId =
  (filter.locationId) || (!filter.deviceId && !filter.locationId) ? true : false;

  const { isLoading, isFetching, data } = useQuery(
    ['DeviceParametersHistory', filter],
    () => {
      return apiGetDeviceParametersHistory(filter);
    },
    {
      enabled: !!filter.startDate && !!filter.endDate && bothDevicIdLocationId,
      staleTime: 5 * (60 * 1000),
      onSuccess: (data) => {

      },
    },
  );

  return {
    isFetching: isFetching,
    isLoading: isLoading,
    data: data,
  };
};
