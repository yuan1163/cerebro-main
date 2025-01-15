import React from 'react';
// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

import { useUI } from '@core/storages/ui';
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { IsFetching } from '@core/ui/ems/Charts/IsFetching';
import { NoData } from '@core/ui/ems/Charts/NoData';
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { consumptionFromLastMonth, ConsumptionStorage } from '@solutions/ems/storages/consumptionFromLastMonth';
import { string } from 'yup';
import { ColumnLineChart } from '../../ColumnLineChart';

type Props = {
  locationList: DeviceParts[];
};

export const ConsumptionChart: React.FC<Props> = ({ locationList }) => {
  const ui = useUI();

  const controller = consumptionFromLastMonth(ui.currentFormation);

  const thisMonthConsumptionData = controller.getThisMonthData();
  const TodayConsumptionData = controller.getTodayData();

  const thisMonthYaxis = locationList?.map((circuit) => {
    let sumValue: number | null = null;

    thisMonthConsumptionData
      ?.filter((data) => {
        return circuit ? `${circuit.deviceId}_${circuit.index}` === `${data.deviceId}_${data.index}` : false;
      })
      .map((filter_data) => {
        if (filter_data.value) {
          sumValue = sumValue === null ? 0 : sumValue;
          sumValue += Number(filter_data.value);
        }

        return sumValue;
      });

    return sumValue !== null ? Number(Number(sumValue).toFixed(2)) : null;
  });

  const todayYaxis = locationList?.map((circuit) => {
    let sumValue: number | null = null;

    TodayConsumptionData?.filter((data) => {
      return circuit ? `${circuit.deviceId}_${circuit.index}` === `${data.deviceId}_${data.index}` : false;
    }).map((filter_data) => {
      if (filter_data.value) {
        sumValue = sumValue === null ? 0 : sumValue;
        sumValue += Number(filter_data.value);
      }

      return sumValue;
    });

    return sumValue !== null ? Number(Number(sumValue).toFixed(2)) : null;
  });

  // X AXIS

  const xAxisValues = locationList.length
    ? locationList.map((item) => (item?.description ? item.description : '-'))
    : [];

  // Y AXIS

  const yAxisValues = [
    {
      data: todayYaxis,
      name: 'Today',
      type: 'column',
    },
    {
      data: thisMonthYaxis,
      name: 'This month',
      type: 'line',
    },
  ];

  return (
    <Card fullWidth className={styles['card']}>
      <CardHeader borderBottom title={t('ems.consumption.label', 'Consumption', 'Consumption title')} />
      <CardContent>
        {controller.IsFetching ? (
          <IsFetching height={145} />
        ) : xAxisValues.length ? (
          <Box>
            <ColumnLineChart
              height={145}
              xAxisValues={xAxisValues}
              yAxisValues={yAxisValues}
              showLegend
              showTooltip
              showStroke
              tooltipHighlightDataSeries
              sharedTooltip
            />
          </Box>
        ) : (
          <NoData height={145} />
        )}
      </CardContent>
    </Card>
  );
};
