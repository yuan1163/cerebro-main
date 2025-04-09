import moment from 'moment';
import React, { useEffect } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// type

import { factors } from '@solutions/ems/storages/consumptionCurrent12Month';

// storages

import { useUI } from '@core/storages/ui';
import { consumptionCurrent12Month } from '@solutions/ems/storages/consumptionCurrent12Month';
import { consumptionFromLastMonth } from '@solutions/ems/storages/consumptionFromLastMonth';
import { demandFromLastMonth } from '@solutions/ems/storages/demandFromLastMonth';

// data

import { getCarbonEmission } from '@solutions/ems/Analytics/data/getCarbonEmission';
import { getCarbonEmissionFactors } from '@solutions/ems/Analytics/data/getCarbonEmissionFactors';
import { getLocationBlackList } from '@solutions/ems/Analytics/data/getLocationBlackList';
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Grid } from '@core/ui/components/Grid';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import AccordionItem from '../../Components/NodeSummary/AccordionItem';
import ConsumptionTrend from '../../Components/NodeSummary/ConsumptionTrend';
import MonthNodeConsumption from '../../Components/NodeSummary/MonthNodeConsumption';
import { getPageSwitch } from '../getPageSwitch';

const NodeSummary = () => {
  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState<string>('node_summary');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const ui = useUI();
  const locationBlackList = getLocationBlackList();
  const accessFormation = !locationBlackList.includes(Number(ui.currentFormation));

  const rootLocationInfo = getRootLocationInfo(accessFormation);

  // Values

  const consumption = consumptionFromLastMonth(ui.currentFormation);
  const demand = demandFromLastMonth(ui.currentFormation, rootLocationInfo.deviceSPBMId);

  const consump12Month = consumptionCurrent12Month(ui.currentFormation);
  const consumptionMonthly = consump12Month.getAllMonth();

  let factors: factors = {};

  const thisYear = moment().year().toString();
  const lastYear = moment().subtract(1, 'year').year().toString();
  factors[thisYear] = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: thisYear,
  });
  factors[lastYear] = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: lastYear,
  });

  const co2eMonthly = consump12Month.getALLMonthCo2e(factors);

  const CEFThisMon = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: moment().year(),
  });

  const CEFLastMon = getCarbonEmissionFactors({
    locationId: ui.currentFormation,
    year: moment().subtract(1, 'month').year(),
  });

  // consumption_data

  const conToday = consumption.getTodaySum();
  const conYesterday = consumption.getYesterdaySum();
  const conThisWeek = consumption.getThisWeekSum();
  const conLastWeek = consumption.getLastWeekSum();

  const conThisMon = consumption.getThisMonSum();
  const conLastMon = consumption.getLastMonSum();

  // co2e_data

  const co2eThisMon = CEFThisMon ? conThisMon * CEFThisMon : null;
  const con2eLastMon = CEFLastMon ? conLastMon * CEFLastMon : null;

  // maxDemand

  const maxDemandThisMon = demand.getThisMonMax();
  const maxDemandLastMon = demand.getLastMonMax();

  const consumption_data = {
    'day': {
      'current': {
        'title': 'Today',
        'subTitle': moment().format('MM/DD/YYYY'),
        'valueText': conToday.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': 'primary',
      },
      'previous': {
        'title': t('date.yesterday.label', 'Yesterday', 'The day before today.'),
        'subTitle': moment().subtract(1, 'days').format('MM/DD/YYYY'),
        'valueText': conYesterday.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': undefined,
      },
    },
    'week': {
      'current': {
        'title': 'This week',
        // 'subTitle': '11/07/23 ~ 11/12/23',
        'subTitle': `${moment().weekday(1).format('MM/DD/YYYY')} ~ ${moment().format('MM/DD/YYYY')}`,
        'valueText': conThisWeek.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': 'primary',
      },
      'previous': {
        'title': t('date.lastWeek.label', 'Last week', 'The seven days prior to the current day.'),
        'subTitle': `${moment().subtract(7, 'days').weekday(1).format('MM/DD/YYYY')} ~ ${moment()
          .subtract(7, 'days')
          .weekday(7)
          .format('MM/DD/YYYY')}`,
        'valueText': conLastWeek.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': undefined,
      },
    },
    'month': {
      'current': {
        'title': 'This month',
        'subTitle': `${moment().startOf('month').format('MM/DD/YYYY')} ~ ${moment().format('MM/DD/YYYY')}`,
        'valueText': conThisMon.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': 'primary',
      },
      'previous': {
        'title': t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
        'subTitle': `${moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY')} ~ ${moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('MM/DD/YYYY')}`,
        'valueText': conLastMon.toFixed(),
        'valueUnit': 'kWh',
        'valueColor': undefined,
      },
    },
  };

  const co2e_data = {
    'month': {
      'current': {
        'title': 'This month',
        'subTitle': `${moment().startOf('month').format('MM/DD/YYYY')} ~ ${moment().format('MM/DD/YYYY')}`,
        'valueText': co2eThisMon ? co2eThisMon.toFixed() : '-',
        'valueUnit': 'CO2e',
        'valueColor': 'primary',
      },
      'previous': {
        'title': t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
        'subTitle': `${moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY')} ~ ${moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('MM/DD/YYYY')}`,
        'valueText': con2eLastMon ? con2eLastMon.toFixed() : '-',
        'valueUnit': 'CO2e',
        'valueColor': undefined,
      },
    },
  };

  const max_demand_data = {
    'month': {
      'current': {
        'title': 'This month',
        'subTitle': `${moment().startOf('month').format('MM/DD/YYYY')} ~ ${moment().format('MM/DD/YYYY')}`,
        'valueText': maxDemandThisMon ? maxDemandThisMon.toFixed() : '-',
        'valueUnit': 'kW',
        'valueColor': 'primary',
      },
      'previous': {
        'title': t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.'),
        'subTitle': `${moment().subtract(1, 'months').startOf('month').format('MM/DD/YYYY')} ~ ${moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('MM/DD/YYYY')}`,
        'valueText': maxDemandLastMon ? maxDemandLastMon.toFixed() : '-',
        'valueUnit': 'kW',
        'valueColor': undefined,
      },
    },
  };

  return (
    <>
      <Grid container direction='column' spacing={3} grow>
        <Grid item>
          <Stack direction='row' className={styles['stack']}>
            <SegmentedControl
              aria-label='screen selection'
              buttons={pageSwitch.toggleButtons}
              onChange={onSegmentedControlVariantChange}
              value={selectedVariant}
            />
          </Stack>
        </Grid>
        <Grid item grow>
          <UnitContainer>
            <Unit variant='sidebar' className={cn(styles['summary-unit'], styles['summary-sidebar'])}>
              <Scrollbar>
                <AccordionGroup gap>
                  {/* Consumption */}
                  <Accordion
                    key={`node_summary.sidebar.consumption`}
                    customTitle={
                      <Text component='h2' variant='lg' weight='semibold'>
                        {t('ems.consumption.label', 'Consumption', 'Energy usage.')}
                      </Text>
                    }
                    disableGutters
                    defaultOpen
                    shadow
                    rounded
                    divider
                    variant='solid'
                  >
                    {Object.values(consumption_data).map((data, index) => {
                      const current = data.current;
                      const previous = data.previous;

                      return (
                        <Grid container key={`consumption.${index}`} className={styles['accordion-item-container']}>
                          <Grid item fullWidth key={current.title}>
                            <AccordionItem
                              key={`consumption.${index}.currentItem`}
                              title={current.title}
                              subTitle={current.subTitle}
                              valueText={current.valueText}
                              valueUnit={current.valueUnit}
                              valueColor={current.valueColor}
                            />
                          </Grid>
                          <Grid item fullWidth key={previous.title}>
                            <AccordionItem
                              key={`consumption.${index}.previousItem`}
                              title={previous.title}
                              subTitle={previous.subTitle}
                              valueText={previous.valueText}
                              valueUnit={previous.valueUnit}
                              valueColor={previous.valueColor}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Accordion>

                  {/* CO2e */}

                  <Accordion
                    key={`node_summary.sidebar.CO2e`}
                    customTitle={
                      <Text component='h2' variant='lg' weight='semibold'>
                        {t('ems.CO2e.label', 'CO2e', 'Emission of CO2 in kilogram.')}
                      </Text>
                    }
                    disableGutters
                    defaultOpen
                    shadow
                    rounded
                    variant='solid'
                  >
                    {Object.values(co2e_data).map((data, index) => {
                      const current = data.current;
                      const previous = data.previous;

                      return (
                        <Grid container key={`co2e.${index}`} className={styles['accordion-item-container']}>
                          <Grid item fullWidth key={current.title}>
                            <AccordionItem
                              key={`co2e.${index}.currentItem`}
                              title={current.title}
                              subTitle={current.subTitle}
                              valueText={current.valueText}
                              valueUnit={current.valueUnit}
                              valueColor={current.valueColor}
                            />
                          </Grid>
                          <Grid item fullWidth key={previous.title}>
                            <AccordionItem
                              key={`co2e.${index}.previousItem`}
                              title={previous.title}
                              subTitle={previous.subTitle}
                              valueText={previous.valueText}
                              valueUnit={previous.valueUnit}
                              valueColor={previous.valueColor}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Accordion>

                  {/* Max Demand */}

                  <Accordion
                    key={`snode_summary.sidebar.max_demand`}
                    customTitle={
                      <Text component='h2' variant='lg' weight='semibold'>
                        Max Demand
                      </Text>
                    }
                    disableGutters
                    defaultOpen
                    shadow
                    rounded
                    variant='solid'
                  >
                    {Object.values(max_demand_data).map((data, index) => {
                      const current = data.current;
                      const previous = data.previous;

                      return (
                        <Grid container key={`max_demand.${index}`} className={styles['accordion-item-container']}>
                          <Grid item fullWidth key={current.title}>
                            <AccordionItem
                              key={`max_demand.${index}.currentItem`}
                              title={current.title}
                              subTitle={current.subTitle}
                              valueText={current.valueText}
                              valueUnit={current.valueUnit}
                              valueColor={current.valueColor}
                            />
                          </Grid>
                          <Grid item fullWidth key={previous.title}>
                            <AccordionItem
                              key={`max_demand.${index}.previousItem`}
                              title={previous.title}
                              subTitle={previous.subTitle}
                              valueText={previous.valueText}
                              valueUnit={previous.valueUnit}
                              valueColor={previous.valueColor}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Accordion>
                </AccordionGroup>
              </Scrollbar>
            </Unit>
            <Unit height='full' className={styles['summary-unit']}>
              <Scrollbar>
                <Grid className={styles['container']} display='grid' fullHeight>
                  <ConsumptionTrend
                    co2e={Object.values(co2eMonthly)}
                    consumption={Object.values(consumptionMonthly)}
                    date={Object.keys(consumptionMonthly)}
                    isFetching={consump12Month.IsFetching}
                  />
                  <MonthNodeConsumption />
                </Grid>
              </Scrollbar>
            </Unit>
          </UnitContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default NodeSummary;
