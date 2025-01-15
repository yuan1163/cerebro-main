import React from 'react';
import { observer } from 'mobx-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// styles

import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Header } from '@core/ui/cerebro/Header';
import { LocationSchema } from '@core/ui/cerebro/LocationSchema';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Select } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { ToggleButtonGroup } from '@core/ui/components/ToggleButtonGroup';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ModuleIcon from '@assets/icons/line/map-02.svg?component';

// filters

import { useFilters } from '../useFilters';

export const LocationScheme = observer(() => {
  const navigate = useNavigate();
  const filters = useFilters();
  const ui = useUI();

  // toggle

  const toggleButtons = [
    {
      label: t('general.scheme.label', 'Scheme', 'A structured representation of a particular concept.'),
      value: 'scheme',
    },
    { label: t('general.list.label', 'List', 'Collection of items.'), value: 'list' },
  ];

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'scheme':
        navigate(`../locationScheme`);
        break;
      case 'list':
        navigate(`../locationList`);
        break;
    }
  };

  const [selectedVariant, setSelectedVariant] = React.useState('scheme');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('location.locations.label', 'Locations', 'Locations.')} />
      <Stack direction='row' className={styles['stack']}>
        <SegmentedControl
          aria-label={t(
            'general.screenSelection.label',
            'Screen selection',
            'Process of choosing a particular section of a webpage.',
          )}
          buttons={toggleButtons}
          onChange={onSegmentedControlVariantChange}
          value={selectedVariant}
        />
        <DataSelect
          id='buildings-select'
          onChange={(option) => filters.setFilterBuilding(option)}
          options={filters.buildings}
          placeholder={`${t('location.buildings.label', 'Buildings', 'Buildings')}.`}
          present={(item) => item?.label}
          value={filters.filterBuilding}
        />
        <DataSelect
          id='spaces-select'
          onChange={(option) => filters.setFilterSpace(option)}
          options={filters.spaces}
          placeholder={t('location.spaces.label', 'Spaces', 'Interiors within a building.')}
          present={(item) => item?.label}
          value={filters.filterSpace}
        />
        <DataSelect
          id='device-category-select'
          onChange={(option) => filters.setFilterDeviceType(option)}
          options={filters.deviceTypes}
          placeholder={`${t('asset.devices.label', 'Devices', 'Devices')}.`}
          present={(item) => item?.label}
          value={filters.filterDeviceType}
        />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']}>
            <CardContent className={styles['location-schema-container']}>
              {filters.buildings && filters.filterBuilding && filters.spaces && filters.filterSpace && (
                <LocationSchema deviceType={filters.filterDeviceType} space={filters.filterSpace} maximized={true} />
              )}
            </CardContent>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
});
