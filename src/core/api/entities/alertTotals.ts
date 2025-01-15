import { api } from '..';
import { AlertsTotal, AlertsTotalInput, AlertsTotalOutput } from '../types';

export async function apiGetAlertsTotals(filter: AlertsTotalInput): Promise<AlertsTotal[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, AlertsTotalOutput>(`alertTotals?${query}`)
    .then(api.checkResulCode)
    .then((response) => response.totals || []);
}
