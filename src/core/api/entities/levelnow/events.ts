import { api } from '@core/api/index';

import { Events, EventsHistory } from '@core/api/types';

export async function apiGetEvents(): Promise<Events> {
  const url = 'Events';
  return api.get<void, Events>(url, undefined, 'levelnow').then((response) => response);
}

export async function apiGetEventsHistory(deviceRef: string | null): Promise<EventsHistory> {
  const url = `Events/history/${deviceRef}`;
  return api.get<void, EventsHistory>(url, undefined, 'levelnow').then((response) => response);
}
