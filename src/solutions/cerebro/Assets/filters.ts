import React from 'react';
import { useUI } from '@core/storages/ui';
import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { Asset, AssetGroup } from '@core/api/types';

export const useFilterText = () => {
  const [filterText, setFilterText] = React.useState<string | undefined>(undefined);
  return { filterText, setFilterText };
};

export const useFilterClass = () => {
  const ui = useUI();
  const groups = useAssetGroups({
    locationId: ui.currentFormation, // only as current Formation
  });
  type ClassOption = { value: AssetGroup | undefined; label: string };
  const allClasses: ClassOption = { value: undefined, label: 'Classes: All' };
  const filterClassOptions: ClassOption[] = [
    allClasses,
    //...groups.getData().map((group) => ({value: group, label: group.name})),
  ];
  if (groups.hasData())
    filterClassOptions.push(...groups.getData().map((group) => ({ value: group, label: group.name })));
  const [filterClass, setFilterClass] = React.useState<ClassOption>(allClasses);
  return { filterClassOptions, filterClass, setFilterClass };
};

export const useFilterCostRange = (list: Asset[]) => {
  const costs = new Set<string>();
  list &&
    list.forEach((asset) => {
      if (asset.costRange) costs.add(asset.costRange);
    });
  type CostRangeOption = { value: string | undefined; label: string };
  const allCostRanges: CostRangeOption = { value: undefined, label: 'Cost Range: All' };
  const filterCostRangeOptions: CostRangeOption[] = [
    allCostRanges,
    ...Array.from(costs).map((cost) => ({ value: cost, label: cost })),
  ];
  const [filterCostRange, setFilterCostRange] = React.useState<CostRangeOption>(allCostRanges);
  return { filterCostRangeOptions, filterCostRange, setFilterCostRange };
};

export const useFilterManufacturer = (list: Asset[]) => {
  const manufacturers = new Set<string>();
  list &&
    list.forEach((asset) => {
      if (asset.manufacturer) manufacturers.add(asset.manufacturer);
    });
  type ManufacturerOption = { value: string | undefined; label: string };
  const allManufacturers: ManufacturerOption = { value: undefined, label: 'Manufacturer: All' };
  const filterManufaturerOptions: ManufacturerOption[] = [
    allManufacturers,
    ...Array.from(manufacturers).map((m) => ({ value: m, label: m })),
  ];
  const [filterManufacturer, setFilterManufacturer] = React.useState<ManufacturerOption>(allManufacturers);
  return { filterManufaturerOptions, filterManufacturer, setFilterManufacturer };
};
