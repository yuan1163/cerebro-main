import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// COMPONENTS

import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Select, SelectOption } from '@core/ui/components/Select';
import { Text } from '@core/ui/components/Text';

// GET TIME
import { GetMonthRnage, GetYearRnage } from '@core/ui/ems/ChartCard/SelectTime/getTime';
import { ChartStateStorage } from '@solutions/ems/storages/chartState';

const lastTimeRange: SelectOption<number>[] = [
  {
    label: t('date.last6hours.label', 'Last 6 hours', 'Choose a specific 6-hours time interval.'),
    value: moment().subtract(6, 'hour').utc().valueOf(),
  },
  {
    label: t('date.last12hours.label', 'Last 12 hours', 'Choose a specific 12-hours time interval.'),
    value: moment().subtract(12, 'hour').utc().valueOf(),
  },
  {
    label: t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.'),
    value: moment().subtract(1, 'day').utc().valueOf(),
  },
];

type selectTimeRangeProps = {
  [key: string]: SelectOption<number>[];
};

type Props = {
  className?: string;
  selectType: 'Last' | 'Month' | 'Year';
  id: string;
  setChartCardRender?: Dispatch<SetStateAction<Number | null>>;
  chartStateClass: ChartStateStorage;
};

export const SelectTime: React.FC<Props> = ({ className, selectType, id, setChartCardRender, chartStateClass }) => {
  const yearRange: SelectOption<number>[] = GetYearRnage();
  const selectTimeRange: selectTimeRangeProps = {
    Last: lastTimeRange,
    Year: yearRange,
  };

  const getSelectedOption: { Last: number; Month: number; Year: number } = {
    Last: 0,
    Year: selectTimeRange['Year'].length - 1,
    Month: Number(moment().format('M')) - 1,
  };

  if (selectType === 'Month') {
    const [startYearFilter, setStartYearFilter] = useState(selectTimeRange['Year'][getSelectedOption['Year']]);
    const [startMonthFilter, setStartMonthFilter] = useState(
      GetMonthRnage(Number(startYearFilter['label']))[getSelectedOption['Month']],
    );

    const onYearFilterChange = (option: SelectOption<number>) => {
      if (startYearFilter.label === option.label) {
        return;
      }

      const year: number = Number(option['label']);
      const month: string = GetMonthRnage(Number(option['label'])).filter((obj) => {
        return obj.label === startMonthFilter.label;
      })[0]['value'];

      chartStateClass.setStartDate(
        moment()
          .startOf('month')
          .set({ 'hour': 0, 'minute': 0, 'second': 0, 'year': year, 'month': Number(month) - 1 })
          .toISOString(),
      );
      chartStateClass.setEndDate(
        moment()
          .set({ 'hour': 23, 'minute': 59, 'second': 59, 'year': year, 'month': Number(month) - 1 })
          .endOf('month')
          .toISOString(),
      );

      setStartYearFilter(option);
      setChartCardRender && setChartCardRender(moment().valueOf());
    };

    const onMonthFilterChange = (option: SelectOption<string>) => {
      if (startMonthFilter.label === option.label) {
        return;
      }

      const year: number = Number(startYearFilter['label']);
      const month: string = GetMonthRnage(Number(startYearFilter['label'])).filter((obj) => {
        return obj.label === option.label;
      })[0]['value'];

      chartStateClass.setStartDate(
        moment()
          .set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0, 'year': year, 'month': Number(month) - 1 })
          .startOf('month')
          .toISOString(),
      );

      chartStateClass.setEndDate(
        moment()
          .set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0, 'year': year, 'month': Number(month) - 1 })
          .endOf('month')
          .toISOString(),
      );

      setStartMonthFilter(option);
      setChartCardRender && setChartCardRender(moment().valueOf());
    };

    return (
      <Grid container justifyContent='between' spacing={3}>
        <Grid item>
          <DataSelect
            id={id}
            onChange={onYearFilterChange}
            options={selectTimeRange['Year']}
            present={(item) => item?.label}
            value={startYearFilter}
          />
        </Grid>
        <Grid item>
          <DataSelect
            id={id}
            onChange={onMonthFilterChange}
            options={GetMonthRnage(Number(startYearFilter['label']))}
            present={(item) => item?.label}
            value={startMonthFilter}
            width={44}
          />
        </Grid>
      </Grid>
    );
  } else {
    const [startDateFilter, setStartDateFilter] = useState(selectTimeRange[selectType][getSelectedOption[selectType]]);

    const onYearFilterChange = (option: SelectOption<number>) => {
      const year = Number(option.label);

      chartStateClass.setStartDate(
        moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'year': year }).startOf('year').toISOString(),
      );
      chartStateClass.setEndDate(
        moment().set({ 'hour': 23, 'minute': 59, 'second': 59, 'year': year }).endOf('year').toISOString(),
      );
      setStartDateFilter(option);

      setChartCardRender && setChartCardRender(moment().valueOf());
    };

    return (
      <Grid>
        <DataSelect
          id={id}
          className={className}
          onChange={onYearFilterChange}
          options={selectTimeRange[selectType]}
          present={(item) => item?.label}
          value={startDateFilter}
        />
      </Grid>
    );
  }
};
