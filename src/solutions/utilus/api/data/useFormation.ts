import { useFormationQuery } from '../generated';

export const useFormation = (id?: number) => {
  const { data } = useFormationQuery({ where: { id } }, { enabled: !!id });
  return data?.formation;
};
