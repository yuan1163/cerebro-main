import { api } from '@core/api/index';

import { Events, EventsHistory, EventType } from '@core/api/types';

export async function apiGetEvents(eventType?: EventType): Promise<Events> {
  const url = 'Events';
  if (eventType) {
    return api.get<void, Events>(`${url}?eventType=${eventType}`, undefined, 'levelnow').then((response) => response);
  } else {
    return api.get<void, Events>(url, undefined, 'levelnow').then((response) => response);
  }
}

export async function apiGetEventsHistory(deviceRef: string | null): Promise<EventsHistory> {
  const url = `Events/history/${deviceRef}`;
  return api.get<void, EventsHistory>(url, undefined, 'levelnow').then((response) => response);
}
