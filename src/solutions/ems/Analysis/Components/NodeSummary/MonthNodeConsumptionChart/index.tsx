import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { Location, LocationType } from '@core/api/types';

import { useUI } from '@core/storages/ui';
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { ColumnChart } from '@core/ui/components/ColumnChart';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { GetYearRnage } from '@core/ui/ems/ChartCard/SelectTime/getTime';
import { IsFetching } from '@core/ui/ems/Charts/IsFetching';
import { NoData } from '@core/ui/ems/Charts/NoData';
import { getCarbonEmissionFactors } from '@solutions/ems/Analytics/data/getCarbonEmissionFactors';
import { consumptionFromLastMonth } from '@solutions/ems/storages/consumptionFromLastMonth';
import moment from 'moment';
import { ColumnLineChart } from '../../ColumnLineChart';

const flat = (hierarchy: Location[] | undefined): Location[] => {
  if (!hierarchy) {
    return [];
  }
  const result = [...hierarchy];
  for (const item of hierarchy) {
    result.push(...flat(item.children));
  }
  return result;
};

type Props<ItemType = any> = {
  searchLocations: Location[];
} & React.HTMLAttributes<HTMLElement>;

const MonthNodeConsumptionChart: React.FC<Props> = ({ searchLocations }) => {
  // LOCATION ARRAY

  // console.log(searchLocations);

  const searchLocationsArray = searchLocations.map((location) => {
    let childrenLocation = flat(location?.children);
    if (childrenLocation.length < 1) childrenLocation.push(location);

    return childrenLocation.map((location) => location.locationId);
  });

  // console.log(searchLocationsArray);

  const ui = useUI();

  const consumption = consumptionFromLastMonth(ui.currentFormation);

  // CEF

  const CEFThisMon = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: moment().year(),
  });
  const CEFLastMon = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: moment().subtract(1, 'month').year(),
  });

  // Y AXIS

  const lastMonthConsumption = searchLocationsArray.map((locationIdArray) =>
    Number(consumption.getLastMonSum(locationIdArray).toFixed()),
  );
  const lastMonthCO2e = CEFLastMon
    ? lastMonthConsumption.map((consumption) => Number((consumption * CEFLastMon).toFixed()))
    : [];

  const thisMonthConsumption = searchLocationsArray.map((locationIdArray) =>
    Number(consumption.getThisMonSum(locationIdArray).toFixed()),
  );

  const thisMonthCO2e = CEFThisMon
    ? thisMonthConsumption.map((consumption) => Number((consumption * CEFThisMon).toFixed()))
    : [];

  const yAxisValues = [
    {
      name: t('ems.kWhThisMonth.label', 'kWh this month', 'Month Node Consumption label'),
      type: 'column',
      // data: [440, 505, 414, 671, 227, 413],
      data: thisMonthConsumption,
    },
    {
      name: t('ems.cO2eThisMonth.label', 'cO2e this month', 'Month Node Consumption label'),
      type: 'line',
      // data: [27, 43, 22, 17, 31, 22],
      data: thisMonthCO2e,
    },
    {
      name: t('ems.kWhLastMonth.label', 'kWh last month', 'Month Node Consumption label'),
      type: 'column',
      // data: [220, 247, 206, 374, 106, 200],
      data: lastMonthConsumption,
    },
    {
      name: t('ems.cO2eLastMonth.label', 'cO2e last month', 'Month Node Consumption label'),
      type: 'line',
      // data: [10, 5, 7, 6, 6, 10],
      data: lastMonthCO2e,
    },
  ];

  const xAxisValues = searchLocations.map((location) => location.name);

  // const xAxisValues = ['SMT_1', 'SMT_2', 'SMT_3', 'SMT_4', 'SMT_5', 'SMT_6', 'SMT_7', 'SMT_8', 'SMT_9'];

  return (
    <Card fullWidth className={styles['card']}>
      <CardContent disablePaddingTop>
        <Box className={styles['barChart-container']}>
          {consumption.IsFetching ? (
            <IsFetching height={250} />
          ) : xAxisValues ? (
            <ColumnLineChart
              height={250}
              xAxisValues={xAxisValues}
              yAxisValues={yAxisValues}
              showLegend
              showTooltip
              showStroke
              tooltipHighlightDataSeries
              sharedTooltip
            />
          ) : (
            <NoData height={250} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthNodeConsumptionChart;
