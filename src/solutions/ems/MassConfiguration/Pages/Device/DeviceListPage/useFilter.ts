import React, { useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// types
import { Location } from '@core/api/types';

import { useLocations } from '@core/storages/controllers/locations';
import { getDeviceList } from '@solutions/ems/MassConfiguration/data/devices';
import { flattenLocations } from '@solutions/ems/MassConfiguration/data/locations';
import { filterCampus, useFilterDeviceType, useFilterOwnerLocation, useFilterStatus, useFilterText } from '../filters';

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

  let filteredList = getDeviceList();
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
  // Device Type
  const { filterDeviceTypeOptions, filterDeviceType, setFilterDeviceType } = useFilterDeviceType(filteredList);
  // Owner Location
  const { filterOwnerLocationOptions, filterOwnerLocation, setFilterOwnerLocation } =
    useFilterOwnerLocation(filteredList);
  // Status
  const { filterStatusOptions, filterStatus, setFilterStatus } = useFilterStatus(filteredList);

  // Filter Text
  if (filterText) {
    const filter = filterText;
    filteredList = filteredList.filter((device) => device.name.toLowerCase().includes(filter.toLowerCase()));
  }
  // Device Type
  if (filterDeviceType.value) {
    const filter = filterDeviceType.value;
    filteredList = filteredList.filter((device) => device.deviceType.toString() == filter);
    if (!clearFilter) setClearFilter(true);
  }
  // Owner Location
  if (filterOwnerLocation.value) {
    const filter = filterOwnerLocation.value;
    filteredList = filteredList.filter((device) => device.ownerLocationName == filter);
    if (!clearFilter) setClearFilter(true);
  }
  // Connection Status
  if (filterStatus.value) {
    const filter = filterStatus.value;
    filteredList = filteredList.filter((device) => device.connectionStatus.toString() == filter);
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
      setFilterDeviceType({
        value: undefined,
        label: `${t(
          'location.campus.label',
          'Campus',
          'Designated area that typically houses educational institutions or other organizations.',
        )}: ${t('asset.deviceType.label', 'Device Type', 'Device type.')}`,
      });
      setFilterOwnerLocation({
        value: undefined,
        label: `${t(
          'location.ownerLocation.label',
          'Owner Location',
          'Location associated with the legal owner.',
        )}: ${t('asset.deviceType.label', 'Device Type', 'Device type.')}`,
      });
      setFilterStatus({
        value: undefined,
        label: `${t('issue.status.label', 'Status', "Issue's status.")}: ${t(
          'asset.deviceType.label',
          'Device Type',
          'Device type.',
        )}`,
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
    filterDeviceTypeOptions,
    filterDeviceType,
    setFilterDeviceType,
    filterOwnerLocationOptions,
    filterOwnerLocation,
    setFilterOwnerLocation,
    filterStatusOptions,
    filterStatus,
    setFilterStatus,
    clearFilter,
    setClearFilter,
    clearFilters,
  };
};
