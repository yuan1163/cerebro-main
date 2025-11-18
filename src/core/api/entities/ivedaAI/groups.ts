import { api } from '@core/api';
import { IvedaAIGroup } from '@core/api/types';

export async function apiGetIvedaAIGroups(): Promise<IvedaAIGroup[]> {
  const url = 'groups';
  return api.get<void, IvedaAIGroup[]>(url, undefined, 'ivedaAI').then((response) => response);
}
