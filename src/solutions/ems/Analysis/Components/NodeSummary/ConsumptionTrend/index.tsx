import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

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
import moment from 'moment';
import { ColumnLineChart } from '../../ColumnLineChart';

type Props = {
  date?: string[];
  consumption: number[];
  co2e: number[];
  isFetching: boolean;
};

const ConsumptionTrend: React.FC<Props> = ({ date, consumption, co2e, isFetching = true }) => {
  const yAxisValues = [
    {
      name: t('ems.ConsumptionTrend.legend', 'Consumption(kWh)', 'Consumption Trend legend label'),
      type: 'column',
      data: consumption.map((x) => {
        return Number(x.toFixed());
      }),
    },
    {
      name: t('ems.CO2e.label', 'CO2e', 'Emission of CO2 in kilogram.'),
      type: 'line',
      data: co2e.map((x) => {
        return Number(x.toFixed());
      }),
    },
  ];

  const xAxisValues = date;

  // console.log(xAxisValues);
  // console.log(yAxisValues);

  return (
    <Card fullWidth className={styles['card']}>
      <CardHeader
        // action={
        //   <Grid className='w-36'>
        //     <DataSelect options={yearOptions} present={(item) => item?.label} value={yearOptions[0]}></DataSelect>
        //   </Grid>
        // }
        borderBottom
        title={t('ems.consumptionTrend.label', 'Consumption Trend', 'Consumption Trend title')}
      />
      <CardContent>
        <Box className={styles['barChart-container']}>
          {isFetching ? (
            <IsFetching height={175} />
          ) : xAxisValues ? (
            <ColumnLineChart
              height={175}
              xAxisValues={xAxisValues}
              yAxisValues={yAxisValues}
              showLegend
              showTooltip
              showStroke
              tooltipHighlightDataSeries
              sharedTooltip
            />
          ) : (
            <NoData height={175} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsumptionTrend;
