import { observer } from 'mobx-react';
import React, { useState } from 'react';
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
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Input } from '@core/ui/components/Input';
import { SelectOption } from '@core/ui/components/Select';
import { IsFetching } from '@core/ui/ems/Charts/IsFetching';
import { NoData } from '@core/ui/ems/Charts/NoData';
import { LineChartCard } from '@core/ui/pages/SmartPolesPage/LineChartCard';
import { DeviceHistoryParameter, DeviceParametersHistoryOutput } from '@solutions/ems/api/entities/deviceItems';
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { Datepicker } from '@solutions/ems/Reporting/Components/Datepicker';

import moment from 'moment';
import { array } from 'yup';
import { ColumnOverlappingChart } from '../../ColumnOverlappingChart';
import Daterangepicker from '../../Daterangepicker';
import { LineChart } from '../../LineChart';
import { getData } from './data/getData';
import { electricityData } from './stroages/electricityData';

type Props = {
  locationList: DeviceParts[];
};

export const HistoricalTrendChart: React.FC<Props> = observer(({ locationList }) => {
  const ui = useUI();
  const controller = electricityData();

  const electricityOption: ['energyHourly', 'power', 'current', 'phaseVoltage'] = [
    'energyHourly',
    'power',
    'current',
    'phaseVoltage',
  ];

  const electricityOptionLabel: { energyHourly: string; power: string; current: string; phaseVoltage: string } = {
    'energyHourly': 'Consumption(kWh)',
    'power': 'Power(kW)',
    'current': 'Current(A)',
    'phaseVoltage': 'Voltage(V)',
  };

  const [selectElectricity, setSelectElectricity] = useState<'energyHourly' | 'power' | 'current' | 'phaseVoltage'>(
    electricityOption[0],
  );

  const onElectricityChange = (option: any) => {
    setSelectElectricity(option);
  };

  const filter = {
    paramName: selectElectricity,
    partLocationId: ui.currentFormation,
    startDate: moment(controller.startDate).startOf('day').valueOf(),
    endDate: moment(controller.endDate).endOf('day').valueOf(),
  };

  const dataArray = getData(filter, locationList);

  const xAxisValues = dataArray.data?.length
    ? dataArray.data[0].map((data) =>
        selectElectricity === 'energyHourly'
          ? moment(data.measureDateMs).format('MM/DD/YY HH:00')
          : moment(data.measureDateMs).format('MM/DD/YY HH:mm'),
      )
    : [];

  const yAxisValues = dataArray.data?.map((data, index) => {
    const yAxisValueDate = new Array(xAxisValues.length).fill(null);

    data.map((d) => {
      // console.log(moment(d?.measureDateMs).format('MM/DD/YY HH:mm'));

      const index = xAxisValues.indexOf(
        selectElectricity === 'energyHourly'
          ? moment(d?.measureDateMs).format('MM/DD/YY HH:00')
          : moment(d?.measureDateMs).format('MM/DD/YY HH:mm'),
      );

      yAxisValueDate[index] = Number(d.value);
    });

    const yAxisValue = {
      data: yAxisValueDate,
      name: locationList[index]?.description ? locationList[index].description : '-',
      type: 'line',
    };

    return yAxisValue;
  });

  // console.log(dataArray);
  // console.log(xAxisValues);

  return (
    <Card fullWidth className={styles['card']}>
      <CardHeader borderBottom title={t('ems.historicalTrend.label', 'Historical Trend', 'Historical Trend title')}>
        <Grid justifyContent='end' fullWidth gap={3}>
          <Grid className='w-56'>
            <DataSelect
              options={electricityOption}
              present={(item: 'energyHourly' | 'power' | 'current' | 'phaseVoltage') => electricityOptionLabel[item]}
              value={selectElectricity}
              onChange={onElectricityChange}
            />
          </Grid>
          <Daterangepicker />
        </Grid>
      </CardHeader>
      <CardContent>
        <Box>
          {dataArray.isFetching ? (
            <IsFetching height={230} />
          ) : xAxisValues.length ? (
            <LineChart
              height={230}
              xAxisValues={xAxisValues}
              yAxisValues={yAxisValues}
              showLegend
              showTooltip
              tooltipHighlightDataSeries
              sharedTooltip
              xAxisTickAmount={5}
            />
          ) : (
            <NoData height={230} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
});
