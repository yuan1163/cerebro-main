import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetEvents, apiGetEventsHistory, apiGetEventsSnapshot } from '@core/api/entities/levelnow/events';
import { EventType } from '@core/api/types';

type EventsParameters = {
  eventType?: EventType;
};

export const useEvents = (params?: EventsParameters) => {
  const { eventType } = params || {};
  if (eventType) {
    const { data } = useQuery(['events', eventType], () => apiGetEvents(eventType), {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    return data ?? [];
  } else {
    const { data } = useQuery(['events'], () => apiGetEvents(), {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    return data ?? [];
  }
};
export const useEventsSnapshot = (params?: EventsParameters) => {
  const { eventType } = params || {};
  if (eventType) {
    const { data } = useQuery(['eventsSnapshot', eventType], () => apiGetEventsSnapshot(eventType), {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    return data ?? [];
  } else {
    const { data } = useQuery(['eventsSnapshot'], () => apiGetEventsSnapshot(), {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    return data ?? [];
  }
};

export const useEventsHistory = (deviceRef: string | null) => {
  const { data } = useQuery(['eventsHistory', deviceRef], () => apiGetEventsHistory(deviceRef), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  return data ?? [];
};
