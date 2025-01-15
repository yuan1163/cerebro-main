import { useQueries, useQuery } from '@tanstack/react-query';
import { apiGetDeviceParametersHistory, DeviceHistoryInput } from '../entities/deviceItems';
import { DeviceParts } from '../entities/deviceParts';

export const useDeviceHistoryParametersQueries = (
  filter: DeviceHistoryInput,
  deviceParts: DeviceParts[],
  queryKey: string,
) => {
  const bothDevicIdLocationId =
    (filter.deviceId && filter.locationId) || (!filter.deviceId && !filter.locationId) ? true : false;

  const result = useQueries({
    queries: deviceParts.map((device) => {
      const newFilter = { ...filter };
      const hasDevice = !!device;
      newFilter['deviceId'] = device?.deviceId;
      newFilter['index'] = filter.paramName === 'phaseVoltage' ? device?.index?.replace(/\d/g, '') : device?.index;
      newFilter['locationId'] = device?.ownerLocationId;

      return {
        queryKey: [
          'DeviceParametersHistory',
          `${newFilter.paramName}_${newFilter.deviceId}_${newFilter.index}`,
          `{startDate:${newFilter.startDate}, endDate:${newFilter.endDate}}`,
          queryKey,
        ],
        queryFn: () => apiGetDeviceParametersHistory(newFilter),
        enabled: !!filter.startDate && !!filter.endDate && bothDevicIdLocationId && !!hasDevice,
        staleTime: 5 * (60 * 1000),
      };
    }),
  });

  const isLoading = result.some((query) => query.isLoading);
  const isFetching = result.some((query) => query.isFetching);
  const data = result.map((query) => (query.data ? query.data : []));

  return {
    isFetching: isFetching,
    isLoading: isLoading,
    data: isFetching ? undefined : data,
  };
};
