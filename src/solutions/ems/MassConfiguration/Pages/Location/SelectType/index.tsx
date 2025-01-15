import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { Location, LocationType } from '@core/api/types';
import { DataSelect } from '@core/ui/components/DataSelect';

type Props = {
  className?: string;
  disabled?: boolean;
  id?: string;
  initial: string[];
  name?: string;
  onAppend?: (item: string) => void;
  onRemove?: (item: string) => void;
};

const flat = (hierarchy: Location[] | undefined): Location[] => {
  if (!hierarchy) {
    return [];
  }
  const result = [...hierarchy];
  for (const item of hierarchy) {
    result.push(...flat(item.children));
  }
  return result;
};

const getType = (item: Location): string => {
  switch (item.type) {
    case LocationType.Company:
      return t('location.company.label', 'Company', 'Company.');
    case LocationType.Region:
      return t('location.regions.label', 'Regions', 'Regions.');
    case LocationType.Formation:
      return t('location.formation.label', 'Formation', 'Organization.');
    case LocationType.Building:
      return t('location.buildings.label', 'Buildings', 'Buildings.');
    case LocationType.Space:
      return t('location.space.label', 'Space', 'Interior or enclosed areas within a building.');
    default:
      return t('location.unknown.label', 'Unknown', 'Unknown location.');
  }
};

export const SelectType: React.FC<Props> = ({ className, disabled = false, initial, onAppend, onRemove, id, name }) => {
  const typeList = ['2', '3', '4', '5'];

  return (
    // <MultiSelect
    //   className={className}
    //   placeholder='Select Type'
    //   disabled={disabled}
    //   source={typeList}
    //   value={initial}
    //   present={(item) => `${item}`}
    //   equals={(item1, item2) => item1 === item2}
    //   onAppend={onAppend}
    //   onRemove={onRemove}
    //   id={id}
    //   name={name}
    // />
    <DataSelect options={typeList}></DataSelect>
  );
};
