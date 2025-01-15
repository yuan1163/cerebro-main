import { useAggregateAlertQuery } from '../generated';

export const useAlertsCountZone = (zoneId?: number, deviceType?: number) => {
  const { data } = useAggregateAlertQuery(
    {
      'where': {
        AND: [
          {
            'device': {
              'is': {
                'smartPole': {
                  'is': {
                    'zoneId': {
                      'equals': zoneId,
                    },
                  },
                },
              },
            },
          },
          { device: { is: { typeId: { equals: deviceType } } } },
        ],
      },
    },
    { enabled: !!zoneId },
  );
  return data?.aggregateAlert._count?.id;
};
