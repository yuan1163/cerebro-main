import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';
import { ProcessHistory, ProcessHistoryInput, ProcessHistoryOutput } from '../../data/processHistory';

export async function apiGetProcessHistory(filter: ProcessHistoryInput): Promise<ProcessHistory[] | []> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, ProcessHistoryOutput>(`processHistory?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.histories ? response.histories : []));
}

export async function apiCreateProcessHistory(data: Partial<ProcessHistory>): Promise<{ historyId: number }> {
  return api
    .post<{ history: Partial<ProcessHistory> }, ResultOutput & { historyId: number }>(
      `processHistory?locationId=${data.locationId}`,
      {
        history: { ...data },
      },
    )
    .then(api.checkResulCode);
}

export async function apiUpdateProcessHistory(data: Partial<ProcessHistory>): Promise<unknown> {
  return api
    .put<{ history: Partial<ProcessHistory> }, ResultOutput>(
      `processHistory?locationId=${data.locationId}&historyId=${data.historyId}`,
      {
        history: data,
      },
    )
    .then(api.checkResulCode);
}

export async function apiDeleteProcessHistory(data: Partial<ProcessHistory>): Promise<unknown> {
  return api
    .delete<{ processHistory: Partial<ProcessHistory> }, ResultOutput>(
      `processHistory?locationId=${data.locationId}&historyId=${data.historyId}`,
    )
    .then(api.checkResulCode);
}
