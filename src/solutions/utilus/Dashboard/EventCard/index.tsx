import React from 'react';
import moment from 'moment';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { Bull } from '@core/ui/components/Bull';
import { Card } from '@core/ui/components/Card';
import { Divider } from '@core/ui/components/Divider';
import { EventsQuery } from '@solutions/utilus/api/generated';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

type Props = {
  event: ElementOf<EventsQuery['events']>;
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

export const EventCard: React.FC<Props> = ({ event }) => {
  const severity = getSeverityByAlertPriority(event.priority?.id);
  return (
    <Card className={styles['card']} color='surface-02' severity={severity}>
      <Grid direction='column' className={styles['content']}>
        <time className={styles['moment']}>{moment(event.moment).format('MM/DD/YYYY HH:mm')}</time>
        <Text component='h5' variant='sm' weight='bold' className={styles['name']}>
          {event.device?.name}
        </Text>
        <Grid alignItems='center' className={styles['device']}>
          <Text component='span' variant='xs'>
            {event.device?.smartPole?.name}
          </Text>
          <Bull />
          <Text color='typography-secondary' component='span' variant='xs'>
            {event.device?.smartPole?.zone?.name}
          </Text>
        </Grid>
        <Divider className={styles['divider']} />
        <Text component='span' variant='sm' color='typography-tertiary'>
          {event.message}
        </Text>
      </Grid>
    </Card>
  );
};
