import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { useUI } from '@core/storages/ui';

// types

import { Notification, AlertPriority } from '@core/api/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Indicator } from '@core/ui/components/Indicator';
import { Text } from '@core/ui/components/Text';

type Props = {
  notification: Notification;
};

export const getSeverityByAlertPriority = (priority: AlertPriority): string => {
  // $severities: 'error', 'success', 'warning';
  switch (priority) {
    case AlertPriority.Trivial:
      return 'trivial';
    case AlertPriority.Normal:
      return 'success';
    case AlertPriority.Warning:
      return 'warning';
    case AlertPriority.Critical:
      return 'error';
  }
};

export const NotificationCard: React.FC<Props> = ({ notification }) => {
  const ui = useUI();
  const navigate = useNavigate();
  const severity = getSeverityByAlertPriority(notification.alertPriority);
  return (
    <CardContent fullWidth>
      <Grid
        alignItems='center'
        justifyContent='between'
        className={styles.link}
        onClick={() => navigate(`/${ui.activeSolution}/events/${ui.currentFormation}/event/${notification.alertId}`)}
      >
        <Grid alignItems='center'>
          <Indicator severity={severity} />
          <Grid direction='column'>
            <Text variant='sm' weight='medium'>
              {notification.actionText || 'Alert message'}
            </Text>
            <Text color='typography-secondary' variant='sm'>
              {notification.device.name}
            </Text>
          </Grid>
        </Grid>
        <Text color='typography-secondary' variant='sm'>
          {moment(notification.creationDate).format('HH:mm A')}
        </Text>
      </Grid>
    </CardContent>
  );
};

// {notification.asset?.name || 'Unassigned device'}
// {notification.device.name}
// {notification.device.deviceId}
