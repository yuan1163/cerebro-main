import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { useLocations } from '@core/storages/controllers/locations';
import { DevicePartProps, DeviceProps } from '../../data/devices';
import { flattenLocations } from '../../data/locations';

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
    // setClearFilter(true);
  }

  return filteredList;
};

export const useFilterIndex = (list: DevicePartProps[]) => {
  const indexs = new Set<string>();
  if (list !== undefined && list.length) {
    list.forEach((device) => {
      if (device.index) indexs.add(device.index.toString());
    });
  }
  type IndexOption = { value: string | undefined; label: string };
  const allIndex: IndexOption = { value: undefined, label: 'Index: All' };
  const filterIndexOptions: IndexOption[] = [
    allIndex,
    ...Array.from(indexs).map((index) => ({
      value: index,
      label: index,
    })),
  ];
  const [filterIndex, setFilterIndex] = React.useState<IndexOption>(allIndex);

  return { filterIndexOptions, filterIndex, setFilterIndex };
};

export const useFilterDeviceType = (list: DeviceProps[]) => {
  const deviceTypes = new Set<string>();
  if (list !== undefined && list.length) {
    list.forEach((device) => {
      if (device.deviceType) deviceTypes.add(device.deviceType.toString());
    });
  }
  type DeviceTypeOption = { value: string | undefined; label: string };
  const allDeviceType: DeviceTypeOption = {
    value: undefined,
    label: `${t('asset.deviceType.label', 'Device Type', 'Device type.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const filterDeviceTypeOptions: DeviceTypeOption[] = [
    allDeviceType,
    ...Array.from(deviceTypes).map((type) => ({ value: type, label: type.toString() })),
  ];
  const [filterDeviceType, setFilterDeviceType] = React.useState<DeviceTypeOption>(allDeviceType);

  return { filterDeviceTypeOptions, filterDeviceType, setFilterDeviceType };
};

export const useFilterOwnerLocation = (list: DeviceProps[] | DevicePartProps[]) => {
  const ownerLocations = new Set<string>();
  if (list !== undefined && list.length) {
    list.forEach((device) => {
      if (device.ownerLocationName) ownerLocations.add(device.ownerLocationName);
    });
  }
  type OwnerLocationOption = { value: string | undefined; label: string };
  const allOwnerLocation: OwnerLocationOption = {
    value: undefined,
    label: `${t('location.ownerLocation.label', 'Owner Location', 'Location associated with the legal owner.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const filterOwnerLocationOptions: OwnerLocationOption[] = [
    allOwnerLocation,
    ...Array.from(ownerLocations).map((ownerLocation) => {
      return {
        value: ownerLocation,
        label: ownerLocation,
      };
    }),
  ];
  const [filterOwnerLocation, setFilterOwnerLocation] = React.useState<OwnerLocationOption>(allOwnerLocation);

  return { filterOwnerLocationOptions, filterOwnerLocation, setFilterOwnerLocation };
};

export const useFilterPartLocation = (list: DevicePartProps[]) => {
  const partLocations = new Set<string>();
  if (list !== undefined && list.length) { 
    list.forEach((device) => {
      if (device.partLocationName) partLocations.add(device.partLocationName);
    });
  }
  type PartLocationOption = { value: string | undefined; label: string };
  const allPartLocation: PartLocationOption = {
    value: undefined,
    label: `${t(
      'location.partLocation.label',
      'Part Location',
      'Specific place within a larger structure where a component is situated.',
    )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
  };
  const filterPartLocationOptions: PartLocationOption[] = [
    allPartLocation,
    ...Array.from(partLocations).map((partLocation) => ({
      value: partLocation,
      label: partLocation,
    })),
  ];
  const [filterPartLocation, setFilterPartLocation] = React.useState<PartLocationOption>(allPartLocation);

  return { filterPartLocationOptions, filterPartLocation, setFilterPartLocation };
};

export const useFilterStatus = (list: DeviceProps[]) => {
  const status = new Set<string>();
  if (list !== undefined && list.length) { 
    list.forEach((device) => {
      status.add(device.connectionStatus.toString());
    });
  }
  type Status = { value: string | undefined; label: string };
  const allStatus: Status = {
    value: undefined,
    label: `${t('issue.connectionStatus.label', 'Connection status', 'Device connectivity state.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };

  const filterStatusOptions: Status[] = [
    allStatus,
    ...Array.from(status).map((stat) => {
      let statusName: string = '';

      if (stat === '0') statusName = t('events.unknown.label', 'Unknown', 'Unknown notification.');
      if (stat === '1') statusName = t('events.normal.label', 'Normal', 'Normal notification.');
      if (stat === '2') statusName = t('events.events.label', 'Disconnect', 'Disconnect notification.');

      return {
        value: stat,
        label: statusName,
      };
    }),
  ];
  const [filterStatus, setFilterStatus] = React.useState<Status>(allStatus);

  return { filterStatusOptions, filterStatus, setFilterStatus };
};
