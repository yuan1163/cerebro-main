import { api } from '..';
import { NotificationsInput, NotificationsOutput, Notification, AlertPriority } from '../types';

export async function apiGetNotifications(filter: NotificationsInput, priorities?: boolean): Promise<Notification[]> {
  const query = new URLSearchParams(filter);
  const prioritiesQuery = priorities
    ? `&priority=${AlertPriority.Critical}&priority=${AlertPriority.Warning}&priority=${AlertPriority.Normal}`
    : '';
  return api
    .get<void, NotificationsOutput>(
      `alertsByDate?${query}&sortCollection=alerts&sortBy=creationDateMs&sortOrder=desc&firstRow=0&rowCount=100${prioritiesQuery}`,
    )
    .then(api.checkResulCode)
    .then((response) => (response.alerts ? response.alerts : []));
}
