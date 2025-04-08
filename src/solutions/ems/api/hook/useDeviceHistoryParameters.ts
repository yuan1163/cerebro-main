import { useQueries, useQuery } from '@tanstack/react-query';
import { apiGetDeviceParametersHistory, DeviceHistoryInput } from '../entities/deviceItems';

export const useDeviceHistoryParameters = (filter: DeviceHistoryInput) => {
  const bothDevicIdLocationId =
    (filter.deviceId && filter.locationId) || (!filter.deviceId && !filter.locationId) ? true : false;

  // 在 API 調用前記錄日誌，查看 filter 內容，特別是 paramName 是否為 'demand'
  console.log('[useDeviceHistoryParameters] API Filter:', {
    startDate: filter.startDate,
    endDate: filter.endDate,
    deviceId: filter.deviceId,
    locationId: filter.locationId,
    paramName: filter.paramName,
    index: filter.index,
    partLocationId: filter.partLocationId,
    willCallAPI: !!filter.startDate && !!filter.endDate && bothDevicIdLocationId
  });

  const { isLoading, isFetching, data } = useQuery(
    ['DeviceParametersHistory', filter],
    () => {
      console.log('[useDeviceHistoryParameters] Calling API with paramName:', filter.paramName);
      return apiGetDeviceParametersHistory(filter);
    },
    {
      enabled: !!filter.startDate && !!filter.endDate && bothDevicIdLocationId,
      staleTime: 5 * (60 * 1000),
      onSuccess: (data) => {
        console.log('[useDeviceHistoryParameters] API Response Data:', { 
          paramName: filter.paramName, 
          dataLength: data?.length,
          dataSample: data?.slice(0, 2) // 只記錄前兩筆紀錄
        });
      },
    },
  );

  return {
    isFetching: isFetching,
    isLoading: isLoading,
    data: data,
  };
};
