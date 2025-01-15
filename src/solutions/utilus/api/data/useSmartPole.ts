import { useSmartPoleQuery } from '../generated';

export const useSmartPole = (id?: number) => {
  const { data } = useSmartPoleQuery({ where: { id } }, { enabled: !!id });
  return data?.smartPole;
};
