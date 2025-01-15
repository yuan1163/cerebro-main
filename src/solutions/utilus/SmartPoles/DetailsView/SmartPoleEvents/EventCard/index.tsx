import React from 'react';
import moment from 'moment';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';
import { EventsQuery } from '@solutions/utilus/api/generated';

import { getSeverityByAlertPriority } from '@solutions/utilus/Dashboard/EventCard';

type Props = {
  event: ElementOf<EventsQuery['events']>;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  const severity = getSeverityByAlertPriority(event.priority?.id);
  return (
    <Card className={styles['card']} color='surface-02' severity={severity}>
      <Grid direction='column' className={styles['content']}>
        <time className={styles['moment']}>{moment(event.moment).format('MM/DD/YYYY HH:MM')}</time>
        <Text component='h5' variant='sm' weight='bold' className={styles['name']}>
          {event.device?.name}
        </Text>
        <Text component='span' variant='sm' color='typography-tertiary'>
          {event.message}
        </Text>
      </Grid>
    </Card>
  );
};
