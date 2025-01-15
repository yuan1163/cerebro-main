import { useQuery } from '@tanstack/react-query';
import { apiGetDeviceParameters, DeviceInput } from '../entities/deviceItems';

export const useDeviceParameters = (filter: DeviceInput) => {
  const { isFetching, data } = useQuery(['DeviceParameters', filter], () => apiGetDeviceParameters(filter), {
    /**
     * Device level query need locationId and deviceId.
     * Location level qyery need partLocationId and paramName.
     *  - paramName would needed because single location may have plenty of loops.
     *    Without parameter filter would response too many data.
     */
    enabled: (!!filter.locationId && !!filter.deviceId) || (!!filter.partLocationId && !!filter.paramName),
    staleTime: 2 * (60 * 1000),
    refetchInterval: 2 * (60 * 1000), // device data would update every 2 mins
    refetchIntervalInBackground: true,
  });

  return { data: data, isFetching: isFetching };
};

export const useCurrentDeviceParameters = (filter: DeviceInput) => {
  const { isFetching, data } = useQuery(['CurrentDeviceParameters', filter], () => apiGetDeviceParameters(filter), {
    enabled: !!filter.partLocationId && !!filter.paramName,
    refetchInterval: 60 * 1000, // device data would update every 1 minute
  });

  const getDeviceParameter = (deviceId: string, partIndex: string, paramName: string) => {
    if (!data) {
      return undefined;
    }
    return data.find(
      (deviceParameter) =>
        deviceParameter.deviceId === deviceId &&
        deviceParameter.index === partIndex &&
        deviceParameter.name === paramName,
    )?.value;
  };

  return { data: data, isFetching: isFetching, getDeviceParameter };
};
