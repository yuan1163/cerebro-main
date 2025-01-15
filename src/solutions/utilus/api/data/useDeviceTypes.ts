import { useDeviceTypesQuery } from '../generated';

export const useDeviceTypes = () => {
  const { data } = useDeviceTypesQuery();
  return data?.deviceTypes;
};
