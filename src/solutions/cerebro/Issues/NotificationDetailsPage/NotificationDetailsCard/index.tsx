import React from 'react';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// types

import { AlertPriority, Notification } from '@core/api/types';

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

import Bell02LineIcon from '@assets/icons/line/bell-02.svg?component';
import Bell01LineIcon from '@assets/icons/line/bell-01.svg?component';

type Props = {
  className?: string;
  notification: Notification | undefined;
};

export const getIconByAlertPriority = (priority: AlertPriority): React.ReactNode => {
  switch (priority) {
    case AlertPriority.Trivial:
      return <Bell02LineIcon />;
    case AlertPriority.Normal:
      return <Bell01LineIcon />; // TODO icon for AlertPriority.Normal priority
    case AlertPriority.Warning:
      return <Bell01LineIcon />;
    case AlertPriority.Critical:
      return <Bell02LineIcon />;
  }
};

export const getColorByAlertPriority = (priority: AlertPriority): string => {
  switch (priority) {
    case AlertPriority.Trivial:
      return t('events.normal.label', 'Normal', 'Normal notification.');
    case AlertPriority.Normal:
      return t('events.trivial.label', 'Trivial', 'Trivial notification.');
    case AlertPriority.Warning:
      return t('events.warning.label', 'Warning', 'Warning notification.');
    case AlertPriority.Critical:
      return t('events.error.label', 'Error', 'Error notification.');
  }
};

export const NotificationDetailsCard: React.FC<Props> = ({ notification, className }) => {
  const alertColor = getColorByAlertPriority(notification?.alertPriority!);
  const alertIcon = getIconByAlertPriority(notification?.alertPriority!);
  return (
    <Card className={cn(styles['card'], className)}>
      <CardContent>
        <Grid className={styles['card-content']} direction='column'>
          <Grid className={styles['icon-container']}>
            <Icon className={styles['icon']} color={alertColor as any} size='lg' variant='soft'>
              {alertIcon}
            </Icon>
          </Grid>
          <Grid direction='column'>
            <Text component='h3' variant='lg' weight='bold'>
              {t('events.alertMessage.label', 'Alert message', 'Alert message.')}
            </Text>
            <time className={styles['time']} dateTime={moment(notification?.creationDate).format()}>
              {moment(notification?.creationDate).format('MM/DD/YYYY HH:MM')}
            </time>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
