import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { Location, LocationType } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';

// components

import { MultiSelect } from '@core/ui/components/MultiSelect';

type Props = {
  className?: string;
  disabled?: boolean;
  initial: Location[];
  inputId?: string;
  label?: string;
  name?: string;
  onAppend?: (item: Location) => void;
  onChange?: (locations: Location[]) => void;
  onRemove?: (item: Location) => void;
  placeholder?: string;
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
      return t('location.region.label', 'Region', 'Region.');
    case LocationType.Formation:
      return t('location.formation.label', 'Formation', 'Organization.');
    case LocationType.Building:
      return t('location.building.label', 'Building', 'Building.');
    case LocationType.Space:
      return t('location.space.label', 'Space', 'Interior or enclosed areas within a building.');
    default:
      return t('location.unknown.label', 'Unknown', 'Unknown location.');
  }
};

export const SelectUserLocations: React.FC<Props> = ({
  className,
  disabled,
  initial,
  inputId,
  label,
  name,
  onAppend,
  onChange,
  onRemove,
  placeholder,
}) => {
  const locations = useLocations();
  const locationsList = React.useMemo(() => flat(locations.getData()), [locations.getData()]);

  return (
    <MultiSelect
      className={className}
      disabled={disabled}
      equals={(item1: Location, item2: Location) => item1.locationId === item2.locationId}
      id={inputId}
      label={label}
      name={name}
      onAppend={onAppend}
      onItemsChange={onChange}
      onRemove={onRemove}
      placeholder={placeholder}
      present={(item: Location) => `${item.name} (${getType(item)})`}
      searchable
      source={locationsList}
      value={initial}
    />
  );
};
