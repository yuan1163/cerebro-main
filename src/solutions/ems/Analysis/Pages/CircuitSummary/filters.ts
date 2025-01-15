import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { DevicePartProps, DeviceProps } from '@solutions/ems/MassConfiguration/data/devices';

export const useFilterPartLocation = (list: DevicePartProps[]) => {
  const partLocations = new Set<string>();
  list.forEach((device) => {
    if (device.partLocationName) partLocations.add(device.partLocationName);
  });
  type PartLocationOption = { value: string | undefined; label: string };
  const allPartLocation: PartLocationOption = {
    value: undefined,
    label: `${t('location.partLocation.label', 'Part Location', 'Location associated with the legal part.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const filterPartLocationOptions: PartLocationOption[] = [
    allPartLocation,
    ...Array.from(partLocations).map((partLocation) => {
      return {
        value: partLocation,
        label: partLocation,
      };
    }),
  ];
  const [filterPartLocation, setFilterPartLocation] = React.useState<PartLocationOption>(allPartLocation);

  return { filterPartLocationOptions, filterPartLocation, setFilterPartLocation };
};

// for circuit summary
export const useFilterSelectedStatus = () => {
  type Status = { value: boolean | undefined; label: string };
  const filterStatusOptions = [
    {
      value: undefined,
      label: `${t('issue.status.label', 'Status', "Issue's status.")}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    },
    {
      label: 'Selected',
      value: true,
    },
    {
      label: 'No Selected',
      value: false,
    },
  ];

  const [filterStatus, setFilterStatus] = React.useState<Status>(filterStatusOptions[0]);
  return { filterStatusOptions, filterStatus, setFilterStatus };
};
