import { api } from '@core/api/index';

import { Events } from '@core/api/types';

export async function apiGetEvents(): Promise<Events> {
  const url = 'Events';
  return api.get<void, Events>(url, undefined, 'levelnow').then((response) => response);
}
