import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// storages

import { useAssets } from '@core/storages/controllers/assets';
import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';
import { useNotifications } from '@core/storages/controllers/notifications';
//import { useRedirector } from '@core/storages/redirector';

// types

import { Location } from '@core/api/types';

// components

import { AssetAlertCard } from './AssetAlertCard';
import { AssetCard } from './AssetCard';
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Datepicker } from '@core/ui/cerebro/Datepicker';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { IconButton } from '@core/ui/components/IconButton';
import { LocationSchema } from '@core/ui/cerebro/LocationSchema';
import { LocationSchemaMini } from '@core/ui/cerebro/LocationSchemaMini';
import { PropertiesCard } from '@core/ui/cerebro/PropertiesCard';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Select, SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import FilterIcon from '@assets/icons/filter.svg?component';

// filters
import { useFilters } from '@solutions/cerebro/Locations/useFilters';

const deviceTypes = [
  { label: t('asset.allCategories.label', 'All categories', 'All categories of devices.'), value: undefined },
  {
    label: t('asset.trackers.label', 'Trackers', 'Tools or systems used to monitor and follow activities.'),
    value: 101,
  },
  {
    label: t('asset.stations.label', 'Stations', 'Centralized locations or setup for managing and accessing devices.'),
    value: 102,
  },
];

const propertiesList = [
  {
    title: t('general.description.label', 'Description', 'Outline of a particular item or subject.'),
    caption: 'Bedside Monitor DYNASCOPE DS-8007 System',
  },
  { title: t('asset.manufacturer.label', 'Manufacturer', "Device's manufacturer."), caption: 'Fukuda Denshi' },
  { title: t('asset.costRange.label', 'Cost Range', 'Cost range of device.'), caption: '$1.5K - $2K' },
];

const timeRange: SelectOption<number>[] = [
  //{ label: 'All messages' }, startDate is required parameter
  {
    label: t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
    value: moment().subtract(1, 'month').valueOf(),
  },
  {
    label: t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
    value: moment().subtract(7, 'day').valueOf(),
  },
  {
    label: t('date.last3Days.label', 'Last 3 days', 'Choose a specific 3-days time interval.'),
    value: moment().subtract(3, 'day').valueOf(),
  },
  {
    label: t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.'),
    value: moment().subtract(24, 'hour').valueOf(),
  },
  {
    label: t('date.last12hours.label', 'Last 12 hours', 'Choose a specific 12-hours time interval.'),
    value: moment().subtract(12, 'hour').valueOf(),
  },
  {
    label: t('date.last3hours.label', 'Last 3 hours', 'Choose a specific 3-hours time interval.'),
    value: moment().subtract(3, 'hour').valueOf(),
  },
];

export const AssetDetailsPage = observer(() => {
  //const redirector = useRedirector();
  const ui = useUI();

  const foundAsset = ui.asset;
  if (!foundAsset) throw Error('Because of [WEB-54] issue this page can not be opened via URL');

  const device = foundAsset.devices?.[0];
  if (!device) throw Error('There are no devices connected to asset');

  const filters = useFilters(); // please use this to get all the filters instead of copypaste

  // const notification = useNotifications({
  //     assetId: foundAsset?.assetId,
  //     startDate: timeRange[0].value,
  //     locationId: foundAsset?.locationId,
  // });

  return (
    <>
      <Header backLink title={t('asset.assetDetails.label', 'Asset Details', 'Asset details.')} />
      <UnitContainer>
        <Unit variant='sidebar' className={styles['unit']}>
          <AssetCard asset={foundAsset} />
          <Card>
            <CardContent>
              <Grid className={styles['location-schema-container']}>
                <LocationSchemaMini asset={foundAsset} device={device} />
              </Grid>
              {/* <PropertiesCard
                title='Properties'
                locations={['Therapy Block B1', 'Laboratory']}
                list={propertiesList}
              /> */}
            </CardContent>
          </Card>
        </Unit>
        <Unit>
          <Card className={styles['card']} scrollable>
            <CardContent>
              <Stack direction='row' className={cn(styles['filter'])}>
                <Box className={styles['select-container']}>
                  <Select
                    id='data-select'
                    placeholder={t(
                      'date.lastMonth.label',
                      'Last month',
                      'The previous calendar month from the current date.',
                    )}
                    onChange={() => console.log('todo')}
                  />
                </Box>
                <IconButton ariaLabel='filter table' variant='solid' size='lg'>
                  <FilterIcon />
                </IconButton>
              </Stack>
            </CardContent>
            <Divider />
            <CardContent scrollable>
              <Scrollbar>
                <AssetAlertCard />
              </Scrollbar>
            </CardContent>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
});
