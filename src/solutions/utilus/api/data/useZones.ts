import { useZonesQuery } from '../generated';

export const useZones = (formationId?: number) => {
  const { data } = useZonesQuery(
    {
      'where': {
        'formationId': {
          'equals': formationId,
        },
      },
    },
    {
      enabled: !!formationId,
    },
  );
  return data?.zones;
};
