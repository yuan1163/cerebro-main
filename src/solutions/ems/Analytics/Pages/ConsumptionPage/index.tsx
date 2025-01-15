import moment from 'moment';
import React, { useEffect } from 'react';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Type
import { SelectDateTimeRangeOption } from '@core/ui/ems/ChartCard/SelectDateTimeRange';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { ChartCard } from '@core/ui/ems/ChartCard';
import { SelectDateTimeRange } from '@core/ui/ems/ChartCard/SelectDateTimeRange';
import { AreaLineChart, optionSetting } from '@core/ui/ems/Charts/AreaLineChart';
import { BarChart } from '@core/ui/ems/Charts/BarChart';
import { CompareInfoBox } from '../../CompareInfoBox';
import { CurrentInfoBox } from '../../CurrentInfoBox';
import { RealTimeInfoBox } from '../../RealTimeInfoBox';
import { SelectNode } from '../../SelectNode';

// icons
import ChevronDownIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpIcon from '@assets/icons/line/chevron-up.svg?component';
import CarbonEmission01SolidIcon from '@assets/icons/solid/carbon-emission-01.svg?component';
import PlugSolidIcon from '@assets/icons/solid/plug-in.svg?component';

// storages
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// data fetch
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';
import { PieChart } from '@core/ui/ems/Charts/PieChart';
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';
import { ChartStateStorage } from '@solutions/ems/storages/chartState';
import { Consumption_getAreaChartData } from '../../data/getAreaChartData';
import { Consumption_getProportionData } from '../../data/getBarChartData';
import { getCarbonEmission } from '../../data/getCarbonEmission';
import { getCarbonEmissionFactors } from '../../data/getCarbonEmissionFactors';
import {
  CompareInfoCardFun_Month,
  CompareInfoCardFun_Week,
  CompareInfoCardFun_Yesterday,
  GetLastData,
} from '../../data/getCompareData';
import { getContractCapacity } from '../../data/getContractCapacity';
import { getLocationBlackList } from '../../data/getLocationBlackList';
import { getRealTimeData } from '../../data/getRealTimeData';
import { getRealTimePartData } from '../../data/getRealTimePartData';
import { getPageSwitch } from '../getPageSwitch';

import ClockSolidIcon from '@assets/icons/solid/clock.svg?component';

type Props = {};

export const ConsumptionPage: React.FC<Props> = () => {
  // let currentKw, contractCapacity;
  const ui = useUI();
  const pageSwitch = getPageSwitch(ui.emsCurrentLocation === ui.currentFormation);
  const locationBlackList = getLocationBlackList();
  const accessFormation = !locationBlackList.includes(Number(ui.currentFormation));

  const currentKwhNode = getRealTimePartData({
    partLocationId: ui.emsCurrentLocation,
    paramName: 'energyHourly',
    expiredMs: 90 * (60 * 1000), // 90 mins
  });

  const CompareInfoCardContent = [
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.yesterday.label', 'Yesterday', 'The day before today.'),
      compareFun: CompareInfoCardFun_Yesterday,
      unit: 'kWh',
      dataType: 'consumption',
    },
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
      compareFun: CompareInfoCardFun_Week,
      unit: 'kWh',
      dataType: 'consumption',
    },
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
      compareFun: CompareInfoCardFun_Month,
      unit: 'kWh',
      dataType: 'consumption',
    },
  ];

  // Class
  const TrendClass = new ChartStateStorage();
  const Proportion = new ChartStateStorage();

  useEffect(() => {
    TrendClass.setStartDate(moment.utc().subtract('6', 'hours').format('YYYY-MM-DDTHH:mm:00').toString());
    TrendClass.setEndDate(moment.utc().format('YYYY-MM-DDTHH:mm:00').toString());

    Proportion.setStartDate(moment.utc().subtract('6', 'hours').format('YYYY-MM-DDTHH:mm:00').toString());
    Proportion.setEndDate(moment.utc().format('YYYY-MM-DDTHH:mm:00').toString());
  }, []);

  // toggle

  const [selectedVariant, setSelectedVariant] = React.useState('consumption');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  // GET DEVICE SPBM
  const rootLocationInfo = getRootLocationInfo(accessFormation);

  // GET CONTRACT CAPACITY
  const contractCapacity = getContractCapacity({ locationId: rootLocationInfo.locationId })?.capacity;

  // CURRENT KW
  const currentKw = getRealTimeData({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    paramName: 'demand',
    index: 'P',
    expiredMs: 30 * (60 * 1000), // 30 mins
  });

  // CURRENT KWH
  const currentKwhRoot = getRealTimeData({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    paramName: 'energyHourly',
    index: 'P',
    expiredMs: 90 * (60 * 1000), // 90 mins
  });

  // CURRENT CO2E
  const carbonFactor = getCarbonEmissionFactors({
    locationId: rootLocationInfo.locationId,
    year: moment().year(),
  });

  const currentCo2e = getCarbonEmission({
    consumption: currentKwhRoot && currentKwhRoot.value,
    factor: carbonFactor,
  });

  // GET TODAY DATA
  const lastData = GetLastData();

  return (
    <>
      <Stack direction='row' className={styles['stack']}>
        <SegmentedControl
          aria-label={t(
            'general.screenSelection.label',
            'Screen selection',
            'Process of choosing a particular section of a webpage.',
          )}
          buttons={pageSwitch.toggleButtons}
          onChange={onSegmentedControlVariantChange}
          value={selectedVariant}
        />
        <SelectNode />
      </Stack>
      <UnitContainer>
        <Unit>
          <Grid container spacing={3} direction={'column'} className={cn(styles['panel'])}>
            {/* CurrentInfoBox */}
            {accessFormation && rootLocationInfo.deviceSPBMId && (
              <Grid item>
                <Card className={styles['card']} fullWidth>
                  <CardContent>
                    <Grid container spacing={2} className={'overflow-auto'}>
                      {ui.currentFormation === rootLocationInfo.locationId && rootLocationInfo.deviceSPBMId ? (
                        <Grid item fullWidth>
                          <CurrentInfoBox
                            color='primary'
                            title={t('ems.currentKW.label', 'Current kW', 'The present kilowatt measurement.')}
                            icon={<PlugSolidIcon />}
                            variant='inactive'
                            currentValue={currentKw && currentKw.value}
                            isChart={true}
                            contractValue={contractCapacity}
                            unit={t('ems.kW.label', 'kW', 'A unit measuring power output or consumption.')}
                            updatedAt={currentKw && moment(currentKw.updateDateMs).format('MM/DD/YYYY HH:mm:ss')}
                          ></CurrentInfoBox>
                        </Grid>
                      ) : null}
                      <Grid item fullWidth>
                        <CurrentInfoBox
                          color='primary'
                          title={t(
                            'ems.currentKWh.label',
                            'Current kWh',
                            'The total kilowatt-hours accumulated up to now.',
                          )}
                          icon={<PlugSolidIcon />}
                          variant='active'
                          currentValue={currentKwhRoot && currentKwhRoot.value}
                          unit={t('ems.kWh.label', 'kWh', 'A unit measuring energy consumption over time.')}
                          updatedAt={
                            currentKwhRoot && moment(currentKwhRoot.updateDateMs).format('MM/DD/YYYY HH:mm:ss')
                          }
                        ></CurrentInfoBox>
                      </Grid>
                      <Grid item fullWidth>
                        <CurrentInfoBox
                          color='primary'
                          title={t(
                            'ems.currentCO2e.label',
                            'Current CO2e',
                            'The present carbon dioxide equivalent measurement.',
                          )}
                          icon={<CarbonEmission01SolidIcon />}
                          variant='inactive'
                          currentValue={currentCo2e}
                          unit={t(
                            'ems.cO2e.label',
                            'CO2e',
                            'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
                          )}
                          updatedAt={
                            currentKwhRoot && carbonFactor
                              ? moment(currentKwhRoot.updateDateMs).format('MM/DD/YYYY HH:mm:ss')
                              : '-'
                          }
                        ></CurrentInfoBox>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* RealTimeBox and CompareInfoBox*/}
            <Grid item>
              <Card className={styles['card']} fullWidth>
                <CardContent>
                  <Grid gap={2} alignItems='center' className={styles['last-updated-container']}>
                    <Icon color={'typography-primary'} size={'sm'} variant={'plain'} rounded>
                      <ClockSolidIcon />
                    </Icon>
                    <Text color={'typography-primary'} variant={'sm'} lineHeight='relaxed'>
                      Last updated: {lastData ? moment(lastData.measureDateMs).format('MM/DD/YYYY HH:mm:ss') : '-'}
                    </Text>
                  </Grid>

                  <Grid container spacing={2} wrap='wrap'>
                    <Grid item lg={3}>
                      <RealTimeInfoBox
                        title={t(
                          'ems.lastHourConsumption.label',
                          'Last hour Consumption',
                          'The energy used in the most recent 60-minute period.',
                        )}
                        icon={<PlugSolidIcon />}
                        iconColor='primary'
                        value={currentKwhNode}
                        unit={t('ems.kWh.label', 'kWh', 'A unit measuring energy consumption over time.')}
                      />
                    </Grid>
                    {CompareInfoCardContent.map((item, i) => {
                      return (
                        <Grid item lg={3} key={`compare-info-${i}`}>
                          <CompareInfoBox
                            icon={item.icon}
                            iconColor={item.iconColor}
                            historyText={item.historyText}
                            compareFun={item.compareFun}
                            unit={item.unit}
                            interval={5 * 60 * 1000}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* Chart Card */}
            <Grid item>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <ChartCard
                    title={t(
                      'ems.consumptionTrend.label',
                      'Consumption Trend',
                      'The pattern or direction of energy use over a specified period.',
                    )}
                    selectDateTimeElement={
                      <SelectDateTimeRange
                        id={'trend-selectDateTimeRange'}
                        options={lastTimeRange}
                        limitTimeValue={144}
                        limitTimeType={'hour'}
                        chartStateClass={TrendClass}
                      />
                    }
                  >
                    <AreaLineChart
                      height={350}
                      ChartOptionSetting={AreaLineChartOptionSetting}
                      getDataFun={Consumption_getAreaChartData}
                      chartStateClass={TrendClass}
                    />
                  </ChartCard>
                </Grid>
                <Grid item lg={6}>
                  <ChartCard
                    title={t(
                      'ems.consumptionDistribution.label',
                      'Consumption Distribution',
                      'The breakdown or allocation of energy use across different categories or sectors.',
                    )}
                    selectDateTimeElement={
                      <SelectDateTimeRange
                        id={'trend-selectDateTimeRange'}
                        options={lastTimeRange}
                        limitTimeValue={144}
                        limitTimeType={'hour'}
                        chartStateClass={Proportion}
                      />
                    }
                  >
                    {/* <BarChart
                      horizontal
                      height={350}
                      getDataFun={Consumption_getProportionData}
                      ChartOptionSetting={BarOptionSetting}
                      chartStateClass={Proportion}
                    /> */}
                    <PieChart
                      horizontal
                      height={350}
                      getDataFun={Consumption_getProportionData}
                      ChartOptionSetting={BarOptionSetting}
                      chartStateClass={Proportion}
                    />
                  </ChartCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
};

const AreaLineChartOptionSetting: optionSetting = {
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#4ba5fd', '#7d8fa1'],
  fill: {
    gradient: {
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [20, 100, 100, 100],
    },
  },
  xaxis: {
    maxTickAmount: 4,
    minTickAmount: 3,
  },
};

const BarOptionSetting = {
  colors: ['#40bf77'],
  xaxis: {
    maxTickAmount: 8,
    minTickAmount: 8,
  },
};

// SelectDateTimeRange
const lastTimeRange: SelectDateTimeRangeOption<number>[] = [
  {
    label: t('date.last6hours.label', 'Last 6 hours', 'Choose a specific 6-hours time interval.'),
    value: moment.utc().subtract(6, 'hour').valueOf(),
    startDateText: `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
      'date.6hours.label',
      '6 hours',
      'A duration spanning 6 consecutive hours.',
    )}`,
    endDateText: t('date.now.label', 'Now', 'The current moment or present time.'),
    type: 'last',
    timeValue: 6,
    timeType: 'hour',
  },
  {
    label: t('date.last12hours.label', 'Last 12 hours', 'Choose a specific 12-hours time interval.'),
    value: moment.utc().subtract(12, 'hour').valueOf(),
    startDateText: `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
      'date.12hours.label',
      '12 hours',
      'A duration spanning 12 consecutive hours.',
    )}`,
    endDateText: t('date.now.label', 'Now', 'The current moment or present time.'),
    type: 'last',
    timeValue: 12,
    timeType: 'hour',
  },
  {
    label: t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.'),
    value: moment.utc().subtract(1, 'day').valueOf(),
    startDateText: `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
      'date.day1.label',
      '1 day',
      'A 24-hour time span.',
    )}`,
    endDateText: t('date.now.label', 'Now', 'The current moment or present time.'),
    type: 'last',
    timeValue: 24,
    timeType: 'hour',
  },
  {
    label: t('date.last7days.label', 'Last 7 days', 'Choose a specific 7-days time interval.'),
    value: moment.utc().subtract(7, 'day').valueOf(),
    startDateText: `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
      'date.day7.label',
      '7 day',
      'A 7-days time span.',
    )}`,
    endDateText: t('date.now.label', 'Now', 'The current moment or present time.'),
    type: 'last',
    timeValue: 7,
    timeType: 'day',
  },
  {
    label: t('date.thisMonth.label', 'This month', 'Choose this month.'),
    value: moment.utc().valueOf(),
    startDateText: moment().startOf('month').format('MM-DD-YYYY'),
    endDateText: moment().endOf('month').format('MM-DD-YYYY'),
    type: 'current',
    timeValue: 1,
    timeType: 'month',
  },
  {
    label: t('date.thisYear.label', 'This year', 'Choose this year.'),
    value: moment.utc().valueOf(),
    startDateText: moment().startOf('year').format('MM-DD-YYYY'),
    endDateText: moment().endOf('year').format('MM-DD-YYYY'),
    type: 'current',
    timeValue: 1,
    timeType: 'year',
  },
  // {
  //   label: t('date.last12Month.label', 'Last 12 month', 'Choose last 12 month.'),
  //   value: moment.utc().subtract(12, 'month').valueOf(),
  //   startDateText: `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
  //     'date.month12.label',
  //     '12 month',
  //     'A 12-months time span.',
  //   )}`,
  //   endDateText: t('date.now.label', 'Now', 'The current moment or present time.'),
  //   type: 'last',
  //   timeValue: 1,
  //   timeType: 'year',
  // },
];
