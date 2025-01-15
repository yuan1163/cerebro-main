import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// types

import { Location } from '@core/api/types';

// storages

import { useAssets } from '@core/storages/controllers/assets';
import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';
//import { useRedirector } from '@core/storages/redirector';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AssetCard } from '../../Assets/AssetDetailsPage/AssetCard';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { LocationSchemaMini } from '@core/ui/cerebro/LocationSchemaMini';
import { NotificationDetailsCard } from './NotificationDetailsCard';
import { SelectOption } from '@core/ui/components/Select';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// filters
import { useFilters } from '@solutions/cerebro/Locations/useFilters';

const deviceTypes = [
  { label: t('asset.allCategories.label', 'All categories', 'All categories of devices.'), value: undefined },
  {
    label: t('asset.trackers.label', 'Trackers', 'Tools or systems used to monitor and follow activities.'),
    value: 101,
  },
  {
    label: t('asset.station.label', 'Station', 'Centralized location or setup for managing and accessing devices.'),
    value: 102,
  },
];

export const NotificationDetailsPage = observer(() => {
  const ui = useUI();

  //const redirector = useRedirector();

  // const foundNotification = ui.notification;
  // if (!foundNotification) throw Error('Because of [WEB-55] issue this page can not be opened via URL');

  // const filters = useFilters(); // please use this to get all the filters instead of copypaste

  return (
    <>
      <Header
        backLink
        title={t('events.notificationDetails.label', 'Notification Details', 'Notification details title.')}
      />
      <UnitContainer>
        <Unit className={styles['unit']}>
          <Grid container spacing={5}>
            <Grid item className={styles['notification-card-container']}>
              {/* <NotificationDetailsCard notification={foundNotification} /> */}
            </Grid>
            <Grid item className={styles['asset-card-container']}>
              {/* <AssetCard asset={foundNotification?.asset} /> */}
            </Grid>
          </Grid>
          <Card className={styles['location-card']}>
            <CardContent className={styles['location-card-content']}>
              {/* <LocationSchemaMini asset={foundNotification.asset} device={foundNotification.device} /> */}
            </CardContent>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
});
