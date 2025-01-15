import { useAggregateDeviceQuery } from '../generated';

export const useDevicesCountZone = (zoneId?: number, deviceTypeId?: number) => {
  const { data } = useAggregateDeviceQuery(
    {
      'where': {
        AND: [
          {
            'smartPole': {
              'is': {
                'zoneId': {
                  'equals': zoneId,
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
    { enabled: !!zoneId },
  );
  return data?.aggregateDevice._count?.id;
};
