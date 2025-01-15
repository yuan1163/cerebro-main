import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';
import { Process, ProcessInput, ProcessOutput } from '../../data/process';

export async function apiGetProcess(filter: ProcessInput): Promise<Process[] | []> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, ProcessOutput>(`process?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.processes ? response.processes : []));
}

export async function apiCreateProcess(data: Partial<Process>): Promise<{ processId: number }> {
  return api
    .post<{ process: Partial<Process> }, ResultOutput & { processId: number }>(
      `process?locationId=${data.locationId}`,
      {
        process: { ...data },
      },
    )
    .then(api.checkResulCode);
}

export async function apiUpdateProcess(data: Partial<Process>): Promise<unknown> {
  return api
    .put<{ process: Partial<Process> }, ResultOutput>(
      `process?locationId=${data.locationId}&processId=${data.processId}`,
      {
        process: { name: data.name },
      },
    )
    .then(api.checkResulCode);
}

export async function apiDeleteProcess(data: Partial<Process>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`process?locationId=${data.locationId}&processId=${data.processId}`)
    .then(api.checkResulCode);
}
