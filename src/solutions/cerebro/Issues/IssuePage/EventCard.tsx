import React from 'react';

// types

import { AlertPriority, Notification } from '@core/api/types';

// storages

import { useNotification } from '@core/storages/controllers/notifications';

// components

import { Grid } from '@core/ui/components/Grid';
import { Indicator } from '@core/ui/components/Indicator';
import { Text } from '@core/ui/components/Text';
import { getAssetName, getText } from '@solutions/cerebro/Notifications/NotificationsPage';

function getAlertPriority(priority: AlertPriority) {
  switch (priority) {
    case AlertPriority.Critical:
      return { label: 'Critical', color: 'error' };
    case AlertPriority.Warning:
      return { label: 'Warning', color: 'success' };
    case AlertPriority.Normal:
      return { label: 'Normal', color: 'warning' };
    case AlertPriority.Trivial:
      return { label: 'Trivial', color: 'trivial' };
  }
}

type Props = {
  locationId: number;
  alert: Partial<Notification>;
};

export const EventCard: React.FC<Props> = ({ locationId, alert }) => {
  const { data } = useNotification(locationId, alert);
  const item = data?.[0];
  if (!item) return null;
  return (
    <Grid alignItems='center'>
      <Indicator severity={getAlertPriority(item.alertPriority).color} />
      <Grid container direction='column'>
        <Text variant='sm' weight='medium'>
          {getText(item)}
        </Text>
        <Text color='typography-secondary' variant='sm'>
          {getAssetName(item)}
        </Text>
      </Grid>
    </Grid>
  );
};
