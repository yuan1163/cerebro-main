import { api } from '@core/api/index';

import { Events, EventsHistory, EventType } from '@core/api/types';

type EventsParams = {
  eventType?: EventType;
  salesRepUserId?: string;
};

export async function apiGetEvents(params?: EventsParams): Promise<Events> {
  const url = 'Events';
  const queryParams = new URLSearchParams();

  if (params?.eventType) {
    queryParams.append('eventType', params.eventType);
  }
  if (params?.salesRepUserId) {
    queryParams.append('salesRepUserId', params.salesRepUserId);
  }

  const queryString = queryParams.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return api.get<void, Events>(finalUrl, undefined, 'levelnow').then((response) => response);
}

export async function apiGetEventsSnapshot(params?: EventsParams): Promise<Events> {
  const url = 'Events/Snapshot';
  const queryParams = new URLSearchParams();

  if (params?.eventType) {
    queryParams.append('eventType', params.eventType);
  }

  const queryString = queryParams.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return api.get<void, Events>(finalUrl, undefined, 'levelnow').then((response) => response);
}

export async function apiGetEventsHistory(deviceRef: string | null): Promise<EventsHistory> {
  const url = `Events/history/${deviceRef}`;
  return api.get<void, EventsHistory>(url, undefined, 'levelnow').then((response) => response);
}
