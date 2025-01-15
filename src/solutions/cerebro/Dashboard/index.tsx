import React from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';

// api

import { useAlerts } from '@core/storages/controllers/alerts';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AlertsList } from './AlertsList';
import { AttentionRequired } from './AttentionRequired';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { LocationSchema } from '@core/ui/cerebro/LocationSchema';
import { Select } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// filter

import { useFilters } from '../Locations/useFilters';

// icons

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';

export const Dashboard = () => {
  const ui = useUI();
  const alerts = useAlerts({
    locationId: ui.currentFormation,
  });

  const locations = useLocations();
  const activeFormation = locations.getElementById(ui.currentFormation);

  const filters = useFilters();

  return (
    <>
      <Header icon={<ModuleIcon />} title={activeFormation && activeFormation.name} />
      <UnitContainer>
        <Unit variant='sidebar'>
          <AlertsList />
        </Unit>
        <Unit>
          <Card fullHeight className={styles['card']}>
            <CardHeader
              disablePaddingBottom
              title={t('location.locationSchema.label', 'Location Schema', 'Location schema title.')}
            />
            <CardContent>
              <Stack direction='row'>
                <DataSelect
                  id='buildings-select'
                  onChange={(option) => filters.setFilterBuilding(option)}
                  options={filters.buildings}
                  placeholder={t('location.buildings.label', 'Buildings', 'Buildings')}
                  present={(item) => item?.label}
                  size='sm'
                  value={filters.filterBuilding}
                />
                <DataSelect
                  id='spaces-select'
                  onChange={(option) => filters.setFilterSpace(option)}
                  options={filters.spaces}
                  placeholder={t('location.spaces.label', 'Spaces', 'Interiors within a building.')}
                  present={(item) => item?.label}
                  size='sm'
                  value={filters.filterSpace}
                />
                <DataSelect
                  id='device-category-select'
                  onChange={(option) => filters.setFilterDeviceType(option)}
                  options={filters.deviceTypes}
                  placeholder={`${t('asset.devices.label', 'Devices', 'Devices')}.`}
                  present={(item) => item?.label}
                  size='sm'
                  value={filters.filterDeviceType}
                />
              </Stack>
            </CardContent>
            <CardContent disablePaddingTop className={styles['location-schema-container']}>
              {filters.buildings && filters.filterBuilding && filters.spaces && filters.filterSpace && (
                <LocationSchema deviceType={filters.filterDeviceType} space={filters.filterSpace} maximized={false} />
              )}
            </CardContent>
            {alerts.hasData() && alerts.getData().length > 0 && (
              <>
                <CardContent disablePaddingTop>
                  <Text component='h4' variant='base' weight='semibold'>
                    {t(
                      'issue.attentionRequired.label',
                      'Attention Required',
                      'A title indicating that there are unresolved problems.',
                    )}
                  </Text>
                </CardContent>
                <AttentionRequired alerts={alerts.getData()} />
              </>
            )}
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};
