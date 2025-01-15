import { useAggregateDeviceQuery } from '../generated';

export const useDevicesCountFormation = (formationId?: number, deviceTypeId?: number) => {
  const { data } = useAggregateDeviceQuery(
    {
      'where': {
        AND: [
          {
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
          {
            'typeId': {
              'equals': deviceTypeId,
            },
          },
        ],
      },
    },
    { enabled: !!formationId },
  );
  return data?.aggregateDevice._count?.id;
};
