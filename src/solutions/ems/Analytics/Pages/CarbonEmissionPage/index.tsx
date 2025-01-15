import moment from 'moment';
import React, { useEffect } from 'react';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { ChartCard } from '@core/ui/ems/ChartCard';
import { BarChart } from '@core/ui/ems/Charts/BarChart';
import { CompareInfoBox } from '../../CompareInfoBox';
import { CurrentInfoBox } from '../../CurrentInfoBox';
import { RealTimeInfoBox } from '../../RealTimeInfoBox';

// icons
import CarbonEmission01SolidIcon from '@assets/icons/solid/carbon-emission-01.svg?component';
import PlugSolidIcon from '@assets/icons/solid/plug-in.svg?component';

// storages
import { useUI } from '@core/storages/ui';

// data fetch
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';
import { getCarbonEmission } from '../../data/getCarbonEmission';
import { getCarbonEmissionFactors } from '../../data/getCarbonEmissionFactors';
import { getContractCapacity } from '../../data/getContractCapacity';
import { getRealTimeData } from '../../data/getRealTimeData';
import { getRealTimePartData } from '../../data/getRealTimePartData';
import { getPageSwitch } from '../getPageSwitch';

import { SelectTime } from '@core/ui/ems/ChartCard/SelectTime';
import { SelectNode } from '../../SelectNode';

import { useLocations } from '@core/storages/controllers/locations';
import { ChartStateStorage } from '@solutions/ems/storages/chartState';
import { observer } from 'mobx-react';
import { Carbon_getProportionData, Carbon_getTrendData } from '../../data/getBarChartData';
import {
  CompareInfoCardFun_Month,
  CompareInfoCardFun_Week,
  CompareInfoCardFun_Yesterday,
  GetLastData,
} from '../../data/getCompareData';
import { getLocationBlackList } from '../../data/getLocationBlackList';

import ClockSolidIcon from '@assets/icons/solid/clock.svg?component';

type Props = {};

export const CarbonEmissionPage: React.FC<Props> = () => {
  const ui = useUI();
  const pageSwitch = getPageSwitch(ui.emsCurrentLocation === ui.currentFormation);
  const locationBlackList = getLocationBlackList();
  const accessFormation = !locationBlackList.includes(Number(ui.currentFormation));

  const CompareInfoCardContent = [
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.yesterday.label', 'Yesterday', 'The day before today.'),
      compareFun: CompareInfoCardFun_Yesterday,
      unit: t(
        'ems.cO2e.label',
        'CO2e',
        'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
      ),
      dataType: 'carbon',
    },
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
      compareFun: CompareInfoCardFun_Week,
      unit: t(
        'ems.cO2e.label',
        'CO2e',
        'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
      ),
      dataType: 'carbon',
    },
    {
      iconColor: 'primary',
      icon: <PlugSolidIcon />,
      historyText: t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
      compareFun: CompareInfoCardFun_Month,
      unit: t(
        'ems.cO2e.label',
        'CO2e',
        'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
      ),
      dataType: 'carbon',
    },
  ];

  // Class
  const TrendClass = new ChartStateStorage();
  const Proportion = new ChartStateStorage();

  useEffect(() => {
    TrendClass.setStartDate(moment().startOf('year').toISOString());
    TrendClass.setEndDate(moment().endOf('year').toISOString());

    Proportion.setStartDate(moment().startOf('month').set({ 'hour': 0, 'minute': 0, 'second': 0 }).toISOString());
    Proportion.setEndDate(moment().endOf('month').set({ 'hour': 0, 'minute': 0, 'second': 0 }).toISOString());
  }, []);

  // toggle

  const [selectedVariant, setSelectedVariant] = React.useState('carbon');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const carbonFactor = getCarbonEmissionFactors({ locationId: ui.emsCurrentLocation, year: moment.utc().year() });
  const currentKwhNode = getRealTimePartData({
    partLocationId: ui.emsCurrentLocation,
    paramName: 'energyHourly',
    expiredMs: 90 * (60 * 1000), // 90 mins
  });
  const currentCo2eNode = getCarbonEmission({
    consumption: currentKwhNode,
    factor: carbonFactor,
  });

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
                            'ems.currentCO2e.label',
                            'Current CO2e',
                            'The present carbon dioxide equivalent measurement.',
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
                          'ems.lastHourEmission.label',
                          'Last hour emission',
                          'The greenhouse gas emissions produced in the most recent 60-minute period.',
                        )}
                        icon={<PlugSolidIcon />}
                        iconColor='primary'
                        value={currentCo2eNode}
                        unit={t(
                          'ems.currentCO2e.label',
                          'Current CO2e',
                          'The present carbon dioxide equivalent measurement.',
                        )}
                      />
                    </Grid>
                    {CompareInfoCardContent.map((item, i) => {
                      return (
                        <Grid item lg={3} key={`carbon-info-${i}`}>
                          <CompareInfoBox
                            icon={item.icon}
                            iconColor={item.iconColor}
                            historyText={item.historyText}
                            compareFun={item.compareFun}
                            unit={item.unit}
                            interval={5 * 60 * 1000}
                            dataType={item.dataType}
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
                      'ems.cO2eTrend.label',
                      'CO2e Trend',
                      'The pattern or direction of carbon dioxide equivalent emissions over a specified period.',
                    )}
                    selectDateTimeElement={
                      <SelectTime id={'trend-select-year'} selectType='Year' chartStateClass={TrendClass} />
                    }
                  >
                    <BarChart
                      height={350}
                      getDataFun={Carbon_getTrendData}
                      ChartOptionSetting={VBarOptionSetting}
                      chartStateClass={TrendClass}
                    />
                  </ChartCard>
                </Grid>
                <Grid item lg={6}>
                  <ChartCard
                    title={t(
                      'ems.cO2eDistribution.label',
                      'CO2e Distribution',
                      'The breakdown or allocation of carbon dioxide equivalent emissions across different categories or sectors.',
                    )}
                    selectDateTimeElement={
                      <SelectTime id='proportion-select-month' selectType='Month' chartStateClass={Proportion} />
                    }
                  >
                    <BarChart
                      horizontal
                      height={350}
                      getDataFun={Carbon_getProportionData}
                      ChartOptionSetting={HBarOptionSetting}
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

// Chart options and data

const HBarOptionSetting = {
  colors: ['#40bf77'],
  xaxis: {
    maxTickAmount: 8,
    minTickAmount: 8,
  },
};
const VBarOptionSetting = {
  colors: ['#5cc9ff'],
  xaxis: {
    maxTickAmount: 8,
    minTickAmount: 8,
  },
};
