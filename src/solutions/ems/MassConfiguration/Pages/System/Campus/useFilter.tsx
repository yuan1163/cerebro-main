import React, { useEffect, useState } from 'react';

// storage

import { useLocations } from '@core/storages/controllers/locations';
import { useLocationProperties } from '@solutions/ems/api/storages/controllers/locationProperties';

export const useFilterType = () => {};

export type campusOption = { value: number | undefined; label: string };

export const useFilters = (filterText?: string) => {
  const locations = useLocations();
  const campus = locations.getFormations();

  let campusOptions: campusOption[] = [];
  campus.map((loc) => {
    const option: campusOption = {
      value: loc.locationId,
      label: loc.name,
    };
    campusOptions.push(option);
  });

  const [selectedCampusOptions, setSelectedCampusOptions] = useState<campusOption>({
    value: campusOptions[0].value,
    label: campusOptions[0].label,
  });

  const properties = useLocationProperties(selectedCampusOptions.value);

  return { properties, campusOptions, selectedCampusOptions, setSelectedCampusOptions };
};
