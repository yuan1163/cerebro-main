import { useAggregateAlertQuery } from '../generated';

export const useAlertsCountFormation = (formationId?: number, deviceType?: number) => {
  const { data } = useAggregateAlertQuery(
    {
      'where': {
        AND: [
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
          { device: { is: { typeId: { equals: deviceType } } } },
        ],
      },
    },
    { enabled: !!formationId },
  );
  return data?.aggregateAlert._count?.id;
};
