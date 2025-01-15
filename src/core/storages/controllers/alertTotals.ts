import { apiGetAlertsTotals } from '@core/api/entities/alertTotals';
import { AlertsTotalInput } from '@core/api/types';
import { pack } from '@core/utils/pack';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const CONTROLLER = 'alerts-totals';

export const useAlertsTotals = (filter: AlertsTotalInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetAlertsTotals(useFilter), {
    enabled: !!filter.locationId && !!filter.startDate && !!filter.endDate,
    //refetchInterval: REFRESH_TIME,
  });

  const cameras = useMemo(() => data?.filter((item) => item.deviceType === 500), [data]);

  return {
    data,
    cameras,
  };
};
