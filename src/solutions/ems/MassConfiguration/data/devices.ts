import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// type
import { Device, Location } from '@core/api/types';

// storage
import { useDevices } from '@core/storages/controllers/devices';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// data
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { useDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';
import { useDeviceProperties } from '@solutions/ems/api/hook/useDeviceProperties';

export const getmcHomeURL = () => {
  const ui = useUI();
  return `/ems/mass_config/${ui.currentFormation}`;
};

type RadioOption = {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  label: string;
  value?: string;
};

export const SegmentedControlButton: RadioOption[] = [
  {
    label: t('general.list.label', 'List', 'Collection of items.'),
    value: 'list',
  },
  {
    label: t('asset.circuit.label', 'Circuit', 'Closed path through which electric current flows or can flow.'),
    value: 'circuit',
  },
  {
    label: t('asset.SPS.label', 'SPS', 'SPS.'),
    value: 'sps',
    isDisabled: false,
  },
];

export type DeviceProps = Device & {
  ownerLocationName?: string;
};

export const getDeviceList = (): DeviceProps[] => {
  const locations = useLocations();
  const companyId = locations.getCompany().locationId;

  const devices = useDevices({ locationId: companyId });
  const allDevices: DeviceProps[] = devices.getData();

  allDevices?.map((devices) => {
    const ownerLocationId = devices.ownerLocationId;
    const locationName = locations.getElementById(ownerLocationId)?.name;

    if (locationName) {
      devices.ownerLocationName = locationName;
    }
  });

  return allDevices;
};

export type DevicePartProps = DeviceParts & {
  ownerLocationName?: string;
  partLocationName?: string;
};

export const getDeviceCircuit = (formationLocationId: number | undefined = undefined): DevicePartProps[] => {
  const locations = useLocations();
  let campus: Location[] | undefined = locations.getFormations();
  let allDevicePart: DevicePartProps[] = [];

  if (formationLocationId !== undefined) {
    const temp = campus.find((location) => location.locationId === formationLocationId);
    campus = temp ? [temp] : undefined;
  }

  campus?.map((loc) => {
    const locationId = loc.locationId;
    const partArray = useDeviceParts({
      locationId: locationId,
      startDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
      endDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
    });

    partArray?.map((part: DevicePartProps) => {
      const locationName = locations.getElementById(part.ownerLocationId)?.name;
      const partLocationName = locations.getElementById(part.partLocationId)?.name;

      if (locationName) part.ownerLocationName = locationName;
      if (partLocationName) part.partLocationName = partLocationName;

      allDevicePart.push(part);
    });
  });

  return allDevicePart;
};

export type SPSProps = {
  name: string;
  deviceId: string;
  SPBType: string;
  gatewayIP: string;
  localServerId: string;
  index: string;
  phase: string;
  PTRatio: number;
  CTRatio: number;
  NFB: string;
  ownerLocationId: number;
  partLocationId: number;
  ownerLocationName?: string;
  partLocationName?: string;
  uniqueId?: string; 
};

export const getSPS = (): SPSProps[] => {
  const locations = useLocations();

  const response = useDeviceProperties({
    locationId: 64,
    deviceId: '1c:69:7a:64:64:a7',
  });

  const jsonString = response && response[0].value;
  let SPSJson: SPSProps[] = [];

  try {
    if (jsonString) {
      const regex = /'name':'([^']+)','deviceId':'([^']+)','SPBType':'([^']+)','gatewayIP':'([^']+)','localServerId':'([^']+)','index':'([^']+)','phase':'([^']+)','PTRatio':(\d+),'CTRatio':(\d+),'NFB':'([^']+)','ownerLocationId':(\d+),'partLocationId':(\d+)/g;
      
      let match;
      while ((match = regex.exec(jsonString)) !== null) {
        SPSJson.push({
          name: match[1],
          deviceId: match[2],
          SPBType: match[3],
          gatewayIP: match[4],
          localServerId: match[5],
          index: match[6],
          phase: match[7],
          PTRatio: Number(match[8]),
          CTRatio: Number(match[9]),
          NFB: match[10],
          ownerLocationId: Number(match[11]),
          partLocationId: Number(match[12]),
          uniqueId: `${match[2]}_${match[6]}` 
        });
      }
    }
  } catch (error) {
    console.error('Failed to parse JSON:', jsonString, error);
  }

  const result: SPSProps[] = [];

  SPSJson.map((sps) => {
    const ownerLocationName = locations.getElementById(sps.ownerLocationId)?.name;
    const partLocationName = locations.getElementById(sps.partLocationId)?.name;

    sps.ownerLocationName = ownerLocationName;
    sps.partLocationName = partLocationName;

    result.push(sps);
  });

  return result;
};
