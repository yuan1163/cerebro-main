import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { Alert, AlertPriority, getDeviceType } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import StationSolidIcon from '@assets/icons/solid/station.svg?component';
import TrackerSolidIcon from '@assets/icons/solid/tracker.svg?component';

type Props = {
  alert: Alert;
};

export const getColorByAlertPriority = (priority: AlertPriority): string => {
  switch (priority) {
    case AlertPriority.Critical:
      return 'error';
    case AlertPriority.Normal:
      return 'success';
    case AlertPriority.Warning:
      return 'warning';
    case AlertPriority.Trivial:
      return 'trivial';
  }
};

export const AttentionCard: React.FC<Props> = ({ alert }) => {
  const deviceType = alert.device.deviceType;
  const alertPriority = alert.rules
    ? Math.max(...alert.rules?.map((rule) => rule.alertPriority))
    : AlertPriority.Critical;
  // TODO
  const iconColor: any = getColorByAlertPriority(alertPriority);
  return (
    <Card className={styles['card']} color={iconColor}>
      <CardContent>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <Grid alignItems='center' container spacing={3}>
              <Grid item>
                <Icon className={styles['icon']} color={iconColor} size='lg' variant='tint'>
                  {deviceType === 101 && <StationSolidIcon />}
                  {deviceType === 102 && <TrackerSolidIcon />}
                  {deviceType !== 101 && deviceType !== 102 && <TrackerSolidIcon />}
                </Icon>
              </Grid>
              <Grid item>
                <Grid container direction='column'>
                  <Text component='h6' variant='sm' weight='medium'>
                    {/* {alert.asset ? alert.asset.name : 'Unassigned device'} */}
                    {deviceType === 101 &&
                      t(
                        'asset.station.label',
                        'Station',
                        'Centralized location or setup for managing and accessing devices.',
                      )}
                    {deviceType === 102 &&
                      t('asset.tracker.label', 'Tracker', 'Tools or systems used to monitor and follow activities.')}
                    {deviceType !== 101 &&
                      deviceType !== 102 &&
                      t('general.notAvailable.label', 'n/a', 'Not Available.')}
                  </Text>
                  <Text color='typography-secondary' variant='sm'>
                    {alert.asset
                      ? alert.asset.name
                      : t('asset.unassignedDevice.label', 'Unassigned device', 'Unassigned device.')}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Card fullWidth>
              <CardContent size='xs'>
                <Grid container direction='column' spacing={1}>
                  <Grid item fullWidth>
                    <Grid display='grid' alignItems='center' fullWidth className={styles['alert-row']}>
                      <Text color='typography-secondary' variant='xs'>
                        {t('asset.trackerID.label', 'Tracker ID', 'Tracker ID.')}
                      </Text>
                      <Text
                        align='right'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='xs'
                        weight='medium'
                        whiteSpace='nowrap'
                      >
                        {alert.device.deviceId || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid item fullWidth>
                    <Grid display='grid' alignItems='center' fullWidth className={styles['alert-row']}>
                      <Text color='typography-secondary' variant='xs'>
                        {t('location.current.label', 'Current', 'Current location.')}
                      </Text>
                      <Text
                        align='right'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='xs'
                        weight='medium'
                        whiteSpace='nowrap'
                      >
                        {alert.location.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

{
  /* <Text color='typography-secondary' variant='xs'>
{alert.rules && alert.rules.length && alert.rules[0].actionText}
</Text> */
}
