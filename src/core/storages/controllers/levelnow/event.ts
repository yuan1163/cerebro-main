import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetEvents, apiGetEventsHistory, apiGetEventsSnapshot } from '@core/api/entities/levelnow/events';
import { EventType } from '@core/api/types';

type EventsParameters = {
  eventType?: EventType;
  salesRepUserId?: string;
};

export const useEvents = (params?: EventsParameters) => {
  const { data } = useQuery(['events', params?.eventType, params?.salesRepUserId], () => apiGetEvents(params), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  const dataWithIssues = data?.filter((event) => {
    return !(
      event.eventBatteryLow === 0 &&
      event.eventFault === 0 &&
      event.eventLevelLow === 0 &&
      event.eventOffline === 0 &&
      event.eventOilFilling === 0
    );
  });
  return dataWithIssues ?? [];
};
export const useEventsSnapshot = (params?: EventsParameters) => {
  const { data } = useQuery(['eventsSnapshot', params?.eventType], () => apiGetEventsSnapshot(params), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};

export const useEventsHistory = (deviceRef: string | null) => {
  const { data } = useQuery(['eventsHistory', deviceRef], () => apiGetEventsHistory(deviceRef), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
