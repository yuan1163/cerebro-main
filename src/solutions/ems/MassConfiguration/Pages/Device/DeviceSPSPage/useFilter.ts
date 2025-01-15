import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { getSPS } from '@solutions/ems/MassConfiguration/data/devices';
import { filterCampus, useFilterText } from '../filters';

export const useFilterType = () => {};

export type campusOption = { value: number | undefined; label: string };

export const useFilters = () => {
  const locations = useLocations();
  const campus = locations.getFormations();

  let campusOptions: campusOption[] = [
    {
      value: undefined,
      label: `${t(
        'location.campus.label',
        'Campus',
        'Designated area that typically houses educational institutions or other organizations.',
      )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
    },
  ];
  campus.map((loc) => {
    const option: campusOption = {
      value: loc.locationId,
      label: loc.name,
    };
    campusOptions.push(option);
  });

  let filteredList = getSPS();
  const [selectedCampusOptions, setSelectedCampusOptions] = useState<campusOption>({
    value: undefined,
    label: `${t(
      'location.campus.label',
      'Campus',
      'Designated area that typically houses educational institutions or other organizations.',
    )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
  });

  // Filter Campus
  filteredList = filterCampus(selectedCampusOptions.value, filteredList);
  // Text
  const { filterText, setFilterText } = useFilterText();

  // Filter Text
  if (filterText) {
    const filter = filterText;
    filteredList = filteredList.filter((device) => device.name.toLowerCase().includes(filter.toLowerCase()));
  }

  return { filteredList, campusOptions, selectedCampusOptions, setSelectedCampusOptions, filterText, setFilterText };
};
