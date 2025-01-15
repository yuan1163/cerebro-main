import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { useDeviceHistoryParametersQueries } from '@solutions/ems/api/hook/useDeviceHistoryParametersQueries';
import moment from 'moment';

type filterProps = {
  paramName: string;
  partLocationId: number | undefined;
  startDate: number;
  endDate: number;
};

export const getData = (filter: filterProps, deviceParts: DeviceParts[]) => {
  const queryKey = 'HistoricalTrend';

  const data = useDeviceHistoryParametersQueries(
    {
      startDate: filter.startDate.toString(),
      endDate: filter.endDate.toString(),
      paramName: filter.paramName,
    },
    deviceParts,
    queryKey,
  );

  return data;
};
