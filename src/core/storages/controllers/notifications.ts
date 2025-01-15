import React from 'react';

import { apiGetNotifications } from '@core/api/entities/notifications';
import { NotificationsInput, Notification } from '@core/api/types';

import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';

const CONTROLLER = 'notifications';
const REFRESH_TIME = 2 * 60 * 1000;

export class NotificationsController {
  notifications?: Notification[];
  public isLoading?: boolean;

  static invalidate() {
    queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.notifications;
  }

  getData(): Notification[] {
    return this.notifications!;
  }

  constructor(notifications?: Notification[], isLoading?: boolean) {
    this.notifications = notifications;
    this.isLoading = isLoading;
  }
}

export const useNotifications = (filter: NotificationsInput, priorities?: boolean) => {
  const useFilter = pack(filter);

  const { data, isLoading } = useQuery(
    [CONTROLLER, ...Object.values(useFilter)],
    () => apiGetNotifications(useFilter, priorities),
    {
      enabled: !!filter.locationId && !!filter.startDate,
      refetchInterval: REFRESH_TIME,
      keepPreviousData: false,
    },
  );

  return new NotificationsController(data, isLoading);
};

export const useNotification = (locationId: number, alert: Partial<Notification>) => {
  const { data, isLoading } = useQuery([CONTROLLER, locationId, alert.alertId, alert.creationDate], () =>
    apiGetNotifications({ locationId, alertId: alert.alertId, creationDate: alert.creationDate }),
  );

  return { data, isLoading };
};
