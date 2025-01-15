import { ResultOutput } from '@core/api/types';

export type Unit = {
  unitId: number;
  locationId: number;
  name: string;
  unitsNumber: number;
  processId?: number[];
};

export type AddUnitPropos = {
  name: string;
  processId: number[];
};

export type EditUnitPropos = {
  name: string;
  processId: number[];
};

export type UnitProcess = {
  unitId: number;
  processId: number;
  locationId: number;
};

export type UnitInput = Record<string, any> &
  Partial<{
    locationId: number;
    unitId: number;
    productId?: number;
  }>;

export type UnitOutput = ResultOutput & {
  units: Unit[];
};
