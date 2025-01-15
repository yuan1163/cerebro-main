import { Moment } from 'moment';
import { SortOrder, useEventsQuery } from '../generated';

export const useEventsFormation = (formationId?: number, startDate?: Moment) => {
  const { data } = useEventsQuery(
    {
      'where': {
        'AND': [
          {
            'device': {
              'is': {
                'smartPole': {
                  'is': {
                    'zone': {
                      'is': {
                        'formationId': {
                          'equals': formationId,
                        },
                      },
                    },
                  },
                },
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
      enabled: !!formationId,
    },
  );
  return data?.events;
};
