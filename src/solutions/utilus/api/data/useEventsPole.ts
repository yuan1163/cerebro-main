import { Moment } from 'moment';
import { SortOrder, useEventsQuery } from '../generated';

export const useEventsPole = (smartPoleId?: number, startDate?: Moment) => {
  const { data } = useEventsQuery(
    {
      'where': {
        'AND': [
          {
            'device': {
              'is': {
                smartPoleId: { equals: smartPoleId },
              },
            },
          },
          {
            'moment': {
              'gte': startDate && startDate.toISOString(),
            },
          },
        ],
      },
      orderBy: { moment: SortOrder.Desc },
    },
    {
      enabled: !!smartPoleId,
    },
  );
  return data?.events;
};
