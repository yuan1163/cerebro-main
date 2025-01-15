import React, { useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { getDeviceCircuit, getDeviceList } from '@solutions/ems/MassConfiguration/data/devices';
import { useFilterPartLocation, useFilterSelectedStatus } from './filters';

export const useFilterType = () => {};

export type campusOption = { value: number | undefined; label: string };

export const useFilters = () => {
  const locations = useLocations();
  const ui = useUI();

  let filteredList = getDeviceCircuit(ui.currentFormation);

  // ClearFilter
  const [clearFilter, setClearFilter] = useState(false);
  // Part Location
  const { filterPartLocationOptions, filterPartLocation, setFilterPartLocation } = useFilterPartLocation(filteredList);

  // Selected Status
  const { filterStatusOptions, filterStatus, setFilterStatus } = useFilterSelectedStatus();

  // checkbox item
  const [selectedItems, setSelectedItems] = React.useState<DeviceParts[]>([]);

  // Part Location
  if (filterPartLocation.value) {
    const filter = filterPartLocation.value;
    filteredList = filteredList.filter((device) => device.partLocationName == filter);
    if (!clearFilter) setClearFilter(true);
  }

  // Selected Status
  if (filterStatus.value !== undefined) {
    filteredList = filterStatus.value
      ? selectedItems
      : filteredList.filter(
          (item) =>
            !selectedItems.some(
              (itemSelected) => `${item?.deviceId}_${item.index}` === `${itemSelected?.deviceId}_${itemSelected.index}`,
            ),
        );

    if (!clearFilter) setClearFilter(true);
  }

  const clearFilters = () => {
    if (clearFilter) {
      setFilterPartLocation({
        value: undefined,
        label: `${t('location.partLocation.label', 'Part Location', 'Location associated with the legal part.')}: ${t(
          'general.all.label',
          'All',
          'Entirety of something.',
        )}`,
      });

      setFilterStatus({
        value: undefined,
        label: `${t('issue.status.label', 'Status', "Issue's status.")}: ${t(
          'general.all.label',
          'All',
          'Entirety of something.',
        )}`,
      });
      setClearFilter(false);
    }
  };

  // checkbox function

  function isSelected(item: DeviceParts) {
    let result = false;

    if (selectedItems.length) {
      result = selectedItems.find(
        (element: DeviceParts) =>
          element && `${element.deviceId}_${element.index}` === `${item.deviceId}_${item.index}`,
      )
        ? true
        : false;
    }

    return result;
  }

  function handleSelect(item: DeviceParts) {
    if (!isSelected(item)) {
      // limit 6 selected
      selectedItems.length < 6 && setSelectedItems([...selectedItems, item]);
    } else {
      handleDeselect(item);
    }
  }

  function handleDeselect(item: DeviceParts) {
    const selectedGroupsUpdated = selectedItems.filter(
      (element) => !(`${element.deviceId}_${element.index}` === `${item.deviceId}_${item.index}`),
    );
    setSelectedItems(selectedGroupsUpdated);
  }

  return {
    selectedItems,
    setSelectedItems,
    filteredList,
    filterPartLocationOptions,
    filterPartLocation,
    setFilterPartLocation,
    clearFilter,
    setClearFilter,
    clearFilters,
    filterStatusOptions,
    filterStatus,
    setFilterStatus,
    isSelected,
    handleSelect,
  };
};
