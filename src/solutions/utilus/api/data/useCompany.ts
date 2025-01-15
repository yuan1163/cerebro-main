import { useAuth } from '@core/storages/auth';
import { SortOrder, useCompaniesQuery } from '../generated';

const cebuUsers = [99];
const negrosUsers = [100];

export const useCompany = () => {
  const auth = useAuth();
  const { data } = useCompaniesQuery({ orderBy: { id: SortOrder.Asc } }, { staleTime: Infinity });
  if (auth.profile && cebuUsers.includes(auth.profile.userId)) return data?.companies[1];
  if (auth.profile && negrosUsers.includes(auth.profile.userId)) return data?.companies[2];
  return data?.companies[0];
};
