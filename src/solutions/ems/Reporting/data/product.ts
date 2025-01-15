import { ResultOutput } from '@core/api/types';
import { Unit } from './unit';

export type Product = {
  productId: number;
  locationId: number;
  name: string;
  files?: {
    url: string;
  }[];
};

export type ProductUnit = {
  locationId: number;
  productId: number;
  unitId: number;
  unitsNumber: number;
};

export type AddProductPropos = {
  name: string;
  unitId: number[];
  unitsNumber: number[];
};

export type EditProductPropos = {
  name: string;
  unitId: number[];
  unitsNumber: number[];
};

export type SubmitProductUnitPropos = {
  unitId: number;
  name: string;
  unitsNumber: number | undefined;
};

export type ProductInput = Record<string, any> &
  Partial<{
    locationId: number;
    productId?: number;
  }>;

export type ProductOutput = ResultOutput & {
  products: Product[];
};
