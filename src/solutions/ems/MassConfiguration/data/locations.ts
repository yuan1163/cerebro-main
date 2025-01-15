import { Location, LocationType } from '@core/api/types';
import { LocationsController, useLocations } from '@core/storages/controllers/locations';

type parentProps =
  | {
      name: string;
      locationId: number;
    }
  | undefined;

export type LocationsProp = Location & {
  parentName?: string;
  parentId?: number;
};

export const flattenLocations = (
  locations: LocationsController,
  selectedLocations: (Location | undefined)[],
  parent: parentProps = undefined,
) => {
  const result: LocationsProp[] = [];

  selectedLocations.map((location) => {
    if (!location) return false;
    const loc = locations.getElementById(location?.locationId);
    if (!loc) return false;

    let insertData: LocationsProp = loc;

    if (parent) {
      insertData['parentName'] = parent.name;
      insertData['parentId'] = parent.locationId;
    }

    // if (loc.type !== 2) result.push(loc);
    result.push(insertData);

    if (loc.children)
      result.push(...flattenLocations(locations, loc.children, { name: loc.name, locationId: loc.locationId }));
  });

  return result;
};

export const getlocations = () => {
  const locations = useLocations();
  const regionsLocation = locations.getCompany();

  const result = flattenLocations(locations, [regionsLocation])
    .filter((location) => location.type !== 1)
    .sort((a, b) => (a.locationId > b.locationId ? 1 : b.locationId > a.locationId ? -1 : 0));

  return result;
};
