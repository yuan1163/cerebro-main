import { useLocations } from '@core/storages/controllers/locations';
import React from 'react';
import { flattenLocations } from '../../../data/locations';

export const useFilterText = () => {
  const [filterText, setFilterText] = React.useState<string | undefined>(undefined);
  return { filterText, setFilterText };
};

export const filterCampus = (selectedCampusValue: number | undefined, filteredList: any[]) => {
  const locations = useLocations();
  const selectedCampus = locations.getElementById(selectedCampusValue);
  const CampusChildren = flattenLocations(locations, [selectedCampus]);
  const CampusChildrenId: number[] = [];

  CampusChildren.map((child) => {
    CampusChildrenId.push(child.locationId);
  });

  if (selectedCampusValue) {
    filteredList = filteredList.filter((device) => CampusChildrenId.includes(device.ownerLocationId));
  }

  return filteredList;
};
