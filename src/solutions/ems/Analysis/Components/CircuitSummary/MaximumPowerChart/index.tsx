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
import { powerFromLastMonth } from '@solutions/ems/storages/powerFromLastMonth';
import { ColumnOverlappingChart } from '../../ColumnOverlappingChart';

type Props = {
  locationList: DeviceParts[];
};

export const MaximumPowerChart: React.FC<Props> = ({ locationList }) => {
  const ui = useUI();

  const controller = powerFromLastMonth(ui.currentFormation, locationList);

  const thisMonthPowerData = controller.getThisMonthData();
  const TodayPowerData = controller.getTodayData();

  const thisMonthYaxis = thisMonthPowerData?.map((circuitData) =>
    circuitData.reduce(
      (max, data) => (data.value ? (Number(data.value) > max ? Number(data.value) : max) : max),
      Number.MIN_SAFE_INTEGER,
    ),
  );
  const todayYaxis = TodayPowerData?.map((circuitData) =>
    circuitData.reduce(
      (max, data) => (data.value ? (Number(data.value) > max ? Number(data.value) : max) : max),
      Number.MIN_SAFE_INTEGER,
    ),
  );

  const xAxisValues = locationList.length
    ? locationList.map((item) => (item?.description ? item.description : '-'))
    : [];

  const yAxisValues = [
    {
      name: 'Today',
      // data: [10, 10, 14, 16, 13],
      data: todayYaxis ? todayYaxis : [],
      type: 'bar',
    },
    {
      name: 'This month',
      // data: [10, 14, 20, 21, 23],
      data: thisMonthYaxis ? thisMonthYaxis : [],
      type: 'bar',
    },
  ];

  return (
    <Card fullWidth className={styles['card']}>
      <CardHeader borderBottom title={t('ems.maximumPower.label', 'Maximum Power', 'Maximum Power title')} />
      <CardContent>
        <Box>
          {controller.IsFetching ? (
            <IsFetching height={145} />
          ) : xAxisValues.length ? (
            <ColumnOverlappingChart
              height={145}
              xAxisValues={xAxisValues}
              yAxisValues={yAxisValues}
              showLegend
              showTooltip
              tooltipHighlightDataSeries
              sharedTooltip
              // isStacked
            />
          ) : (
            <NoData height={145} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
