import React from 'react';

// utils

import { t } from '@core/utils/translate';

// data
import { Alert } from '@core/api/types';

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
import SmartPoleIcon from '@assets/icons/line/smart-pole.svg?component';
import Thermometer03LineIcon from '@assets/icons/line/thermometer-03.svg?component';
import LightBulb02Icon from '@assets/icons/line/lightbulb-02.svg?component';
import Signal02Icon from '@assets/icons/line/signal-02.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';

type Props = {
  alert: Alert;
};

export const getColorByAlertPriority = (priority?: number): string => {
  switch (priority) {
    case 1:
      return 'error';
    case 2:
      return 'warning';
    default:
      return 'trivial';
  }
};

export const getIconByDeviceType = (type?: number): React.ReactNode => {
  switch (type) {
    case 500:
      return <VideoRecorderLineIcon />;
    default:
      return <VideoRecorderLineIcon />;
  }
};

export const getSeverityByAlertPriority = (priority?: number): string => {
  // $severities: 'error', 'trivial', 'success', 'warning';
  switch (priority) {
    case 1:
      return 'error';
    case 2:
      return 'warning';
    default:
      return 'trivial';
  }
};

export const AlertCard: React.FC<Props> = ({ alert }) => {
  // TODO
  const cardColor: any = getColorByAlertPriority(alert.alertPriority);
  const deviceIcon = getIconByDeviceType(alert.device?.deviceType);
  return (
    <Card className={styles['card']} color={cardColor}>
      <CardContent className={styles['card-content']}>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <Grid alignItems='center' container spacing={3}>
              <Grid item>
                <Icon className={styles['icon']} color={cardColor} size='lg' variant='tint'>
                  {deviceIcon}
                </Icon>
              </Grid>
              <Grid item className={styles['title-container']}>
                <Grid container direction='column'>
                  <Text
                    component='h6'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    variant='sm'
                    weight='medium'
                    whiteSpace='nowrap'
                  >
                    {'Message?'}
                  </Text>
                  <Text
                    color='typography-secondary'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    variant='sm'
                    whiteSpace='nowrap'
                  >
                    {alert.device?.name}
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
                        {t('asset.serialNumber.label', 'Serial number', 'Serial number of asset or device.')}
                      </Text>
                      <Text
                        align='right'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='xs'
                        weight='medium'
                        whiteSpace='nowrap'
                      >
                        {alert.device?.deviceId}
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid item fullWidth>
                    <Grid display='grid' alignItems='center' fullWidth className={styles['alert-row']}>
                      <Text color='typography-secondary' variant='xs'>
                        {t('location.location.label', 'Location', 'Location title.')}
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
