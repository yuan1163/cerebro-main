import { useAlertsQuery } from '../generated';

export const useAlertsFormation = (formationId?: number) => {
  const { data } = useAlertsQuery(
    {
      'where': {
        'device': {
          'is': {
            'smartPole': {
              'is': {
                'zone': {
                  'is': {
                    'formationId': {
                      equals: formationId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    { enabled: !!formationId },
  );
  return data?.alerts;
};
