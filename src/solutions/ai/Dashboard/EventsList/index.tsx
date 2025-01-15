import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// data
import { useNotifications } from '@core/storages/controllers/notifications';

// storages
import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Divider } from '@core/ui/components/Divider';
import { EventCard } from '../EventCard';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// icons
import FilterFunnel01LineIcon from '@assets/icons/line/filter-funnel-01.svg?component';

type Interval = {
  title: string;
  value?: Moment;
};

const intervals: Interval[] = [
  // { title: t('events.allMessages.label', 'All messages', 'All messages.') },
  {
    title: t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
    value: moment().subtract(1, 'month'),
  },
  {
    title: t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
    value: moment().subtract(7, 'day'),
  },
  {
    title: t('date.last3Days.label', 'Last 3 days', 'Choose a specific 3-days time interval.'),
    value: moment().subtract(3, 'day'),
  },
  {
    title: t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.'),
    value: moment().subtract(24, 'hour'),
  },
  {
    title: t('date.last3hours.label', 'Last 3 hours', 'Choose a specific 3-hours time interval.'),
    value: moment().subtract(3, 'hour'),
  },
];

type AlertsListProps = {
  className?: string;
};

export const EventsList: React.FC<AlertsListProps> = observer(({ className }) => {
  const ui = useUI();

  const [startDateFilter, setStartDateFilter] = useState(intervals[4]);

  const events = useNotifications({
    locationId: ui.currentFormation,
    startDate: startDateFilter.value?.valueOf(),
    triggerType: 3,
  });

  return (
    <Card className={cn(styles['card'], className)} scrollable>
      <CardHeader disablePaddingBottom title={t('events.alertMessage.label', 'Alert message', 'Alert message.')} />

      <CardContent borderBottom>
        <Stack className={styles['filter']} direction='row'>
          <DataSelect
            className='w-full'
            options={intervals}
            present={(item) => item.title}
            placeholder={t(
              'general.selectInterval.label',
              'Select interval',
              'Specific time duration from a list of options or settings.',
            )}
            value={startDateFilter}
            onChange={(option) => setStartDateFilter(option)}
          />
        </Stack>
      </CardContent>
      <CardContent scrollable disablePadding>
        {events.isLoading ? (
          <div className={styles['progress']}>
            <CircularProgress variant='text' />
          </div>
        ) : (
          <Scrollbar>
            <List className={styles['list']}>
              {events.hasData() &&
                events.getData().map((event) => (
                  <ListItem key={event.alertId} className={styles['list-item']} disablePadding>
                    <EventCard event={event} />
                  </ListItem>
                ))}
            </List>
          </Scrollbar>
        )}
      </CardContent>
    </Card>
  );
});
