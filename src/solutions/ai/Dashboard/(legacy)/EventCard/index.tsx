import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { useUI } from '@core/storages/ui';

// data
import { Notification } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { Bull } from '@core/ui/components/Bull';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Indicator } from '@core/ui/components/Indicator';
import { Link } from '@core/ui/components/Link';
import { Text } from '@core/ui/components/Text';

type Props = {
  event: Notification;
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
  const severity = getSeverityByAlertPriority(event.alertPriority);
  const ui = useUI();
  const navigate = useNavigate();
  return (
    <CardContent
      fullWidth
      onClick={() => navigate(`/${ui.activeSolution}/events/${ui.currentFormation}/event/${event.alertId}`)}
    >
      <Grid alignItems='center' justifyContent='between'>
        <Grid alignItems='center'>
          <Indicator severity={severity} />
          <Grid direction='column'>
            <Text variant='sm' weight='medium'>
              {event.alertName}
            </Text>
            <Text color='typography-secondary' variant='sm'>
              {event.device?.name}
            </Text>
          </Grid>
        </Grid>
        <Text color='typography-secondary' variant='sm'>
          {moment(event.creationDate).format('MM/DD/YYYY HH:mm')}
        </Text>
      </Grid>
    </CardContent>
  );
};
// {event.location?.name;}
