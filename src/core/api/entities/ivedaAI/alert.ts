import { api } from '@core/api';
import { IvedaAIAlert } from '@core/api/types';

type AlertRange = {
  start: number;
  length: number;
};

export async function apiGetIvedaAIAlert(): Promise<IvedaAIAlert> {
  const url = 'getAlerts';
  const range = {
    'start': 0,
    'length': 100,
  };
  return api.post<AlertRange, IvedaAIAlert>(url, range, 'ivedaAI').then((response) => response);
}
