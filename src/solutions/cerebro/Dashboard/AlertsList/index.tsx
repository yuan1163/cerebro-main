import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// types

import { AlertStatus } from '@core/api/types';

// storages

import { useNotifications } from '@core/storages/controllers/notifications';
import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { NotificationCard } from '../NotificationCard';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Select, SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// icons

import FilterFunnel01LineIcon from '@assets/icons/line/filter-funnel-01.svg?component';

const timeRange: SelectOption<number>[] = [
  //{ label: 'All messages' }, startDate is required parameter
  {
    label: t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
    value: moment().subtract(1, 'month').valueOf(),
  },
  {
    label: t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
    value: moment().subtract(7, 'day').valueOf(),
  },
  {
    label: t('date.last3Days.label', 'Last 3 days', 'Choose a specific 3-days time interval.'),
    value: moment().subtract(3, 'day').valueOf(),
  },
  {
    label: t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.'),
    value: moment().subtract(24, 'hour').valueOf(),
  },
  {
    label: t('date.last12hours.label', 'Last 12 hours', 'Choose a specific 12-hours time interval.'),
    value: moment().subtract(12, 'hour').valueOf(),
  },
  {
    label: t('date.last3hours.label', 'Last 3 hours', 'Choose a specific 3-hours time interval.'),
    value: moment().subtract(3, 'hour').valueOf(),
  },
  {
    label: '2024.11.1-2024.11.30',
    value: 1730390400000
  },
];

type AlertsListProps = {
  className?: string;
};

export const AlertsList: React.FC<AlertsListProps> = observer(({ className }) => {
  const ui = useUI();

  const [startDateFilter, setStartDateFilter] = useState(timeRange[0]);
  const [endDateFilter, setEndDateFilter] = useState(0);

  const notifications = useNotifications(
    {
      locationId: ui.currentFormation,
      startDate: startDateFilter.value,
      // @ts-ignore
      endDate: endDateFilter.value,
      status: AlertStatus.Active,
    },
    true,
  );

  const onDateFilterChange = (option: SelectOption<number>) => {
    if (option.label === '2024.11.1-2024.11.30') {
      const startDate = 1730390400000;
      const endDate = 1732982399000;
      setStartDateFilter({ label: '2024.11.1-2024.11.30', value: startDate });
      // setEndDateFilter(endDate);
      // @ts-ignore
      setEndDateFilter({ label: '2024.11.1-2024.11.30', value: endDate });
    } else {
      setStartDateFilter(option);
    }
  };

  const onFilterIconClick = () => {
    setStartDateFilter(startDateFilter);
  };

  return (
    <Card fullHeight className={cn(styles['card'], className)} scrollable>
      {/* 最近發生的事件-標題 */}
      <CardHeader disablePaddingBottom>
        <Grid alignItems='baseline' container spacing={2}>
          <Grid item>
            <Text component='h3' variant='lg' weight='semibold'>
              {t('events.recentEvents.label', 'Recent events', 'Recent events.')}
            </Text>
          </Grid>
          <Grid item>
            <Text color='typography-secondary' variant='sm' weight='medium'>
              {notifications.hasData() && notifications.getData().length}
            </Text>
          </Grid>
        </Grid>
      </CardHeader>

      {/* 事件日期區間-下拉選單 */}
      <CardContent borderBottom>
        <DataSelect
          id='time-range-select'
          onChange={onDateFilterChange}
          options={timeRange}
          placeholder={t(
            'general.filterByDate.label',
            'Filter by date',
            'Function that allows to refine a list of items by specifying a particular date range.',
          )}
          present={(item) => item?.label}
          value={startDateFilter}
          size='sm'
        />
      </CardContent>

      {/* 事件清單 */}
      <CardContent disablePadding scrollable>
        <Scrollbar>
          <List className={styles['list']}>
            {notifications.hasData() &&
              notifications.getData().map((notification, i) => (
                <ListItem className={styles['list-item']} disablePadding key={`notifications-${i}`}>
                  <NotificationCard notification={notification} />
                </ListItem>
              ))}
          </List>
        </Scrollbar>
      </CardContent>
    </Card>
  );
});

{
  /* <IconButton ariaLabel='filter alerts' onClick={onFilterIconClick} size='lg' variant='outlined'>
            <FilterFunnel01LineIcon />
          </IconButton> */
}
