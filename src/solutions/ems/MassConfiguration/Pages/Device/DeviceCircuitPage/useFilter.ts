import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { getDeviceCircuit, getDeviceList } from '@solutions/ems/MassConfiguration/data/devices';
import { filterCampus, useFilterIndex, useFilterOwnerLocation, useFilterPartLocation, useFilterText } from '../filters';

export const useFilterType = () => {};

export type campusOption = { value: number | undefined; label: string };

export const useFilters = () => {
  const locations = useLocations();
  const campus = locations.getFormations();

  let campusOptions: campusOption[] = [{ value: undefined, label: 'Campus: All' }];
  campus.map((loc) => {
    const option: campusOption = {
      value: loc.locationId,
      label: loc.name,
    };
    campusOptions.push(option);
  });

  let filteredList = getDeviceCircuit();

  const [selectedCampusOptions, setSelectedCampusOptions] = useState<campusOption>({
    value: undefined,
    label: `${t(
      'location.campus.label',
      'Campus',
      'Designated area that typically houses educational institutions or other organizations.',
    )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
  });

  // ClearFilter
  const [clearFilter, setClearFilter] = useState(false);
  // Filter Campus
  filteredList = filterCampus(selectedCampusOptions.value, filteredList);
  // Text
  const { filterText, setFilterText } = useFilterText();
  // Device Index
  const { filterIndexOptions, filterIndex, setFilterIndex } = useFilterIndex(filteredList);
  // Owner Location
  const { filterOwnerLocationOptions, filterOwnerLocation, setFilterOwnerLocation } =
    useFilterOwnerLocation(filteredList);
  // Part Location
  const { filterPartLocationOptions, filterPartLocation, setFilterPartLocation } = useFilterPartLocation(filteredList);

  if (filterText) {
    // Filter Text
    const filter = filterText;
    filteredList = filteredList?.filter(
      (device) => device.deviceId && device.deviceId.toLowerCase().includes(filter.toLowerCase()),
    );
  }
  // Index
  if (filterIndex.value) {
    const filter = filterIndex.value;
    filteredList = filteredList.filter((device) => device.index == filter);
    if (!clearFilter) setClearFilter(true);
  }
  // Owner Location
  if (filterOwnerLocation.value) {
    const filter = filterOwnerLocation.value;
    filteredList = filteredList.filter((device) => device.ownerLocationName == filter);
    if (!clearFilter) setClearFilter(true);
  }
  // Connection Status
  if (filterPartLocation.value) {
    const filter = filterPartLocation.value;
    filteredList = filteredList.filter((device) => device.partLocationName == filter);
    if (!clearFilter) setClearFilter(true);
  }
  // Filter Campus
  if (selectedCampusOptions.value) {
    if (!clearFilter) setClearFilter(true);
  }

  const clearFilters = () => {
    if (clearFilter) {
      setSelectedCampusOptions({
        value: undefined,
        label: `${t(
          'location.campus.label',
          'Campus',
          'Designated area that typically houses educational institutions or other organizations.',
        )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
      });
      setFilterIndex({
        value: undefined,
        label: `${t('general.index.label', 'Index', 'Position of a specific item within a list.')}: ${t(
          'general.all.label',
          'All',
          'Entirety of something.',
        )}`,
      });
      setFilterOwnerLocation({
        value: undefined,
        label: `${t(
          'location.ownerLocation.label',
          'Owner Location',
          'Location associated with the legal owner.',
        )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
      });
      setFilterPartLocation({
        value: undefined,
        label: `${t(
          'location.partLocation.label',
          'Part Location',
          'Specific place within a larger structure where a component is situated.',
        )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
      });
      setClearFilter(false);
    }
  };

  return {
    filteredList,
    campusOptions,
    selectedCampusOptions,
    setSelectedCampusOptions,
    filterText,
    setFilterText,
    filterIndexOptions,
    filterIndex,
    setFilterIndex,
    filterOwnerLocationOptions,
    filterOwnerLocation,
    setFilterOwnerLocation,
    filterPartLocationOptions,
    filterPartLocation,
    setFilterPartLocation,
    clearFilter,
    setClearFilter,
    clearFilters,
  };
};
