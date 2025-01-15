import { ResultOutput } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { DeviceParameter } from '@solutions/ems/api/entities/deviceItems';
import { useDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';
import { DevicePartProps } from '@solutions/ems/MassConfiguration/data/devices';
import moment from 'moment';

export type Process = {
  processId: number;
  locationId: number;
  name: string;
};

export type AddProcessPropose = {
  name: string;
  // circuit: string[];
  // unitsNumber: number[];
  // rangeDate: [Date, Date][] | [null, null][];
};

export type EditProcess = {
  name: string;
  // circuit: string[];
  // unitsNumber: number[];
  // rangeDate: [Date, Date][] | [null, null][];
};

export type ProcessInput = Record<string, any> &
  Partial<{
    locationId: number;
    processId?: number;
    unitId?: number;
  }>;

export type ProcessOutput = ResultOutput & {
  processes: Process[];
};
