import React from 'react';

import { apiGetAlerts } from '@core/api/entities/alerts';
import { AlertsInput, Alert } from '@core/api/types';

import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';

const CONTROLLER = 'alerts';
const REFRESH_TIME = 2 * 60 * 1000;

export class AlertsController {
  alerts?: Alert[];

  static invalidate() {
    queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.alerts;
  }

  getData(): Alert[] {
    return this.alerts!;
  }

  public getCount(deviceType: number): number {
    if (!this.hasData()) {
      return 0;
    }
    return this.getData().filter((alert) => alert.device.deviceType === deviceType).length;
  }

  public getCamerasAlerts(): Alert[] {
    if (!this.hasData()) {
      return [];
    }
    return this.getData().filter((alert) => alert.device.deviceType === 500);
  }

  constructor(alerts?: Alert[]) {
    this.alerts = alerts;
  }
}

export const useAlerts = (filter: AlertsInput, priorities?: boolean) => {
  const useFilter = pack(filter);

  const { data } = useQuery(
    [CONTROLLER, priorities, ...Object.values(useFilter)],
    () => apiGetAlerts(useFilter, priorities),
    {
      enabled: !!filter.locationId,
      // 每隔2分鐘刷新一次
      refetchInterval: REFRESH_TIME,
    },
  );

  return new AlertsController(data);
};
