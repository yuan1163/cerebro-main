import { api } from '..';
import { AlertsInput, AlertsOutput, Alert, AlertPriority } from '../types';

export async function apiGetAlerts(filter: AlertsInput, priorities?: boolean): Promise<Alert[]> {
  const query = new URLSearchParams(filter);
  const prioritiesQuery = priorities
    ? `&priority=${AlertPriority.Critical}&priority=${AlertPriority.Warning}&priority=${AlertPriority.Normal}`
    : '';
  return api
    .get<void, AlertsOutput>(`alerts?${query}${prioritiesQuery}`)
    .then(api.checkResulCode)
    .then((response) => (response.activeAlerts ? response.activeAlerts : []));
}
