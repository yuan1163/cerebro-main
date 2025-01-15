import { ResultOutput } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { useDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';
import { DevicePartProps } from '@solutions/ems/MassConfiguration/data/devices';
import moment from 'moment';
import { useProcessHistory } from '../storages/controllers/processHistory';
import { useProduct } from '../storages/controllers/product';
import { ProductUnit } from './product';

export type ProcessHistory = {
  historyId: number;
  locationId: number;
  processId: number;
  deviceId: string;
  partIndex: string;
  startDate: string;
  startDateMs: number;
  endDate: string;
  endDateMs: number;
  unitId: number;
  unitsNumber: number;
  energy: number;
};

export type AddProcessHistoryPropose = {
  unitId: number;
  processId: number;
  deviceId: string;
  unitsNumber: number;
  startDate: Date | null;
  endDate: Date | null;
};

export type EditProcessHistoryPropose = {
  unitId: number;
  processId: number;
  deviceId: string;
  unitsNumber: number;
  startDate: Date | null;
  endDate: Date | null;
};

export type ProcessHistoryInput = Record<string, any> &
  Partial<{
    locationId: number;
    historyId?: number;
    productId?: number;
    processId?: number;
    unitId?: number;
    startDate?: string;
    endDate?: string;
  }>;

export type ProcessHistoryOutput = ResultOutput & {
  histories: ProcessHistory[];
};

export const getDeviceCircuitById = (formationId: number | undefined) => {
  const locations = useLocations();
  let allDevicePart: DevicePartProps[] = [];

  if (formationId) {
    const partArray = useDeviceParts({
      locationId: formationId,
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
  }

  return allDevicePart;
};

export const getEnergy = (
  locationId: number | undefined,
  parameter: 'productId' | 'unitId' | 'processId',
  parameterId: number,
) => {
  const controller = useProcessHistory({
    locationId,
  });

  const queryParameter: ProcessHistoryInput = {
    locationId,
  };

  queryParameter[parameter] = parameterId;

  const processHistory = controller.get(queryParameter);

  const productController = useProduct({
    locationId,
    productId: parameterId,
  });

  const queryUnit: Partial<ProductUnit> = {
    locationId,
    productId: parameterId,
  };

  const unitInfo = productController.getUnit(queryUnit);

  let consumption: number | undefined = undefined;
  if (processHistory) {
    consumption = 0;

    switch (parameter) {
      case 'processId':
        consumption = processHistory.length
          ? processHistory.map((h) => Number(h.energy) / Number(h.unitsNumber)).reduce((a, b) => a + b)
          : 0;
        break;
      case 'unitId':
        consumption = processHistory.length
          ? processHistory.map((h) => Number(h.energy) / Number(h.unitsNumber)).reduce((a, b) => a + b)
          : 0;
        break;
      case 'productId':
        const filter_ph = unitInfo?.map((u) => {
          return processHistory.length
            ? processHistory
                .map((h) => (h.unitId === u.unitId ? (Number(h.energy) / Number(h.unitsNumber)) * u.unitsNumber : 0))
                .reduce((a, b) => a + b)
            : 0;
        });

        consumption = filter_ph?.length ? filter_ph.reduce((a, b) => a + b) : 0;
        break;
      default:
        break;
    }
  }

  return consumption;
};
