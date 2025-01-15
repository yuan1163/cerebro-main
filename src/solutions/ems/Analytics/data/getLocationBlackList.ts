import { Location } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';

export const getLocationBlackList = (): number[] => {
  let blackList: number[] = [];
  const locations = useLocations();

  const getLocationAccessRecursive = (parent: Location): void => {
    const children = parent.children;
    if (parent.userAccess || !children) return;
    for (const child of children) {
      if (child.userAccess) break;
      blackList.push(child.locationId);
      getLocationAccessRecursive(child);
    }
  };

  getLocationAccessRecursive(locations.getCompany());

  return blackList;
};

export const getAccessLocationsId = (location: Location): number[] => {
  let list: number[] = [];
  const getLocationAccessRecursive = (parent: Location, access: boolean = false): void => {
    const children = parent.children;
    if (parent.userAccess) access = true;

    if (access) list.push(parent.locationId);
    if (!children) return undefined;

    if (access) {
      for (const child of children) {
        getLocationAccessRecursive(child, true);
      }
    } else {
      for (const child of children) {
        getLocationAccessRecursive(child);
      }
    }
  };

  getLocationAccessRecursive(location);

  return list;
};
