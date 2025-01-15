import { SortOrder, useSmartPolesQuery } from '../generated';

export const useSmartPolesFormation = (formationId?: number, zoneId?: number) => {
  const { data } = useSmartPolesQuery(
    {
      'where': {
        AND: [
          {
            'zone': {
              'is': {
                formationId: {
                  equals: formationId,
                },
              },
            },
          },
          {
            'zone': {
              'is': {
                id: {
                  equals: zoneId,
                },
              },
            },
          },
        ],
      },
      orderBy: { id: SortOrder.Asc },
    },
    { enabled: !!formationId },
  );
  return data?.smartPoles;
};
