import { useUserGroupsQuery } from '../generated';

export const useUserGroups = () => {
  const { data } = useUserGroupsQuery();
  return data?.userGroups;
};
