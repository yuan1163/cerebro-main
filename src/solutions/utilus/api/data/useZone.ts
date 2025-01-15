import { useZoneQuery } from '../generated';

export const useZone = (id?: number) => {
  const { data } = useZoneQuery({ where: { id } }, { enabled: !!id });
  return data?.zone;
};
