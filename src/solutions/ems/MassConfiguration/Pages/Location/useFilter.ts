import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { getDeviceList } from '@solutions/ems/MassConfiguration/data/devices';
import { useFilterParentLocation, useFilterSolution, useFilterText, useFilterType } from './filter';
import { getlocations } from '../../data/locations';

export type campusOption = { value: number | undefined; label: string };

export const useFilters = () => {
  let filteredList = getlocations();

  // ClearFilter
  const [clearFilter, setClearFilter] = useState(false);
  // Text
  const { filterText, setFilterText } = useFilterText();
  // Type
  const { filterTypeOptions, filterType, setFilterType } = useFilterType(filteredList);
  // ParentLocation
  const { filterParentLocationOptions, filterParentLocation, setFilterParentLocation } =
    useFilterParentLocation(filteredList);
  // Solution
  const { filterSolutionOptions, filterSolution, setFilterSolution } = useFilterSolution(filteredList);

  if (filterText) {
    const filter = filterText;
    filteredList = filteredList.filter((location) => location.name.toLowerCase().includes(filter.toLowerCase()));
  }

  if (filterType.value) {
    const filter = filterType.value;
    filteredList = filteredList.filter((location) => location.type == filter);
    if (!clearFilter) setClearFilter(true);
  }

  if (filterParentLocation.value) {
    const filter = filterParentLocation.value;
    filteredList = filteredList.filter((location) => location.parentId?.toString() == filter);
    if (!clearFilter) setClearFilter(true);
  }

  if (filterSolution.value) {
    const filter = filterSolution.value;
    filteredList = filteredList.filter((location) => location.branchSolutions == filter);
    if (!clearFilter) setClearFilter(true);
  }

  const clearFilters = () => {
    if (clearFilter) {
      setFilterType({
        value: undefined,
        label: `${t(
          'location.campus.label',
          'Campus',
          'Designated area that typically houses educational institutions or other organizations.',
        )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
      });
      setFilterParentLocation({
        value: undefined,
        label: `${t('asset.deviceType.label', 'Device Type', 'Device type.')}: ${t(
          'general.all.label',
          'All',
          'Entirety of something.',
        )}`,
      });
      setFilterSolution({
        value: undefined,
        label: `${t(
          'location.ownerLocation.label',
          'Owner Location',
          'Location associated with the legal owner.',
        )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
      });
      setClearFilter(false);
    }
  };

  return {
    filteredList,
    filterText,
    setFilterText,
    filterTypeOptions,
    filterType,
    setFilterType,
    filterParentLocationOptions,
    filterParentLocation,
    setFilterParentLocation,
    filterSolutionOptions,
    filterSolution,
    setFilterSolution,
    clearFilter,
    setClearFilter,
    clearFilters,
  };
};
