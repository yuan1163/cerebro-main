import { api } from '@core/api';
import { IvedaAILevelAlerts } from '@core/api/types';

export async function apiGetIvedaAIAlerts(): Promise<IvedaAILevelAlerts> {
  const url = 'alerts';
  return api.get<void, IvedaAILevelAlerts>(url, undefined, 'ivedaAI').then((response) => response);
}
