import React from 'react';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// types

import { getDeviceType } from '@core/api/types';
import { formatTotals } from './format';

// storages

import { useAlertsTotals } from '@core/storages/controllers/alertTotals';
import { useLocations } from '@core/storages/controllers/locations';

// styles

import styles from '../styles.module.scss';
import stylesTooltip from '@core/ui/components/ChartTooltip/styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { ChartNoData } from '@core/ui/components/ChartNoData';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { ColumnChart } from '@core/ui/components/ColumnChart';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { ProgressBar } from '@core/ui/components/ProgressBar';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import StationLineIcon from '@assets/icons/line/station.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';
import Users01LineIcon from '@assets/icons/line/users-01.svg?component';

// theme

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const colors = fullConfig.theme?.colors as { [key: string]: any };

const customTooltipTotal = function ({ series, seriesIndex, seriesEachIndex, dataPointIndex, w }: any) {
  return (
    `<div class="apexcharts-tooltip-series-group apexcharts-active apexcharts-dense mt-3" style='display: flex'>` +
      `<div class="apexcharts-tooltip-text">` +
      `<div class="apexcharts-tooltip-y-group">` +
      `<span class="apexcharts-tooltip-text-y-label">` +
      'Events' +
      `</span>` +
      `<span class="apexcharts-tooltip-text-y-value">` +
      series[seriesIndex] +
      `</span>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `<div class="apexcharts-tooltip-series-group apexcharts-active apexcharts-dense" style='display: flex'>` +
      `<div class="apexcharts-tooltip-text">` +
      `<div class="apexcharts-tooltip-y-group">` +
      `<span class="apexcharts-tooltip-text-y-label">` +
      'Source' +
      `</span>` +
      `<div class="flex items-center">` +
      `<span class="apexcharts-tooltip-marker apexcharts-disable-gutters" style='background-color: ${w.globals.markers.colors[seriesIndex]}'>` +
      `</span>` +
      `<span class="apexcharts-tooltip-text-y-value" style='font-weight: normal'>` +
      w.globals.initialSeries[seriesIndex].name ||
    t('general.notAvailable.label', 'n/a', 'Not Available.') + `</span>` + `</div>` + `</div>` + `</div>` + `</div>`
  );
};

const customTooltipHistory = function ({ series, seriesIndex, seriesEachIndex, dataPointIndex, w }: any) {
  let pointIndexArray = Array.from(series.map((item: { [key: number]: number }) => item[dataPointIndex]));
  let totalYValue = pointIndexArray.reduce((a: any, b: any) => {
    return a + b;
  }, 0);

  return (
    // HEADER
    `<div class='apexcharts-tooltip-title'>` +
    `<div class="apexcharts-tooltip-text">` +
    `<span class="apexcharts-tooltip-text-y-label">` +
    t('events.totalEvents.label', 'Total events', 'Total number of events.') +
    `</span>` +
    `<span class="apexcharts-tooltip-text-y-value">` +
    totalYValue +
    `</span>` +
    `</div>` +
    `</div>` +
    // CAMERAS
    w.globals.initialSeries
      .map((item: { name: string }, index: number) => {
        return (
          `<div class="apexcharts-tooltip-series-group apexcharts-active apexcharts-dense" style='display: flex'>` +
          `<span class="apexcharts-tooltip-marker" style='background-color: ${w.globals.markers.colors[index]}'>` +
          `</span>` +
          `<div class="apexcharts-tooltip-text">` +
          `<div class="apexcharts-tooltip-y-group">` +
          `<span class="apexcharts-tooltip-text-y-label">` +
          item.name +
          `</span>` +
          `<span class="apexcharts-tooltip-text-y-value">` +
          series[index][dataPointIndex] +
          `</span>` +
          `</div>` +
          `</div>` +
          `</div>`
        );
      })
      .join('') +
    // FOOTER
    `<div class='apexcharts-tooltip-title apexcharts-tooltip-footer'>` +
    `<div class="apexcharts-tooltip-text">` +
    `<span class="apexcharts-tooltip-text-y-label">` +
    t('date.date.label', 'Date', 'Specific point in time.') +
    `</span>` +
    `<span class="apexcharts-tooltip-text-y-value" style='font-weight: normal'>` +
    moment(w.globals.labels[dataPointIndex]).format('MMMM, YYYY') +
    `</span>` +
    `</div>` +
    `</div>`
  );
};

// TODO

enum Variants {
  Month = t('date.lastMonth.label', 'Last month', 'The previous calendar month from the current date.') as any,
  Year = t('date.lastYear.label', 'Last year', 'The previous calendar year from the current date.') as any,
}

const getVariantSubstraction = (variant: Variants) => {
  switch (variant) {
    case Variants.Month:
      return 'month';
    case Variants.Year:
      return 'year';
  }
};

const getVariantAggregation = (variant: Variants) => {
  switch (variant) {
    case Variants.Month:
      return 1;
    case Variants.Year:
      return 2;
  }
};

const getVariantXAxisLabelFormatter = (variant: Variants) => {
  switch (variant) {
    case Variants.Month:
      return 'D MMM';
    case Variants.Year:
      return 'MMM YY';
  }
};

// implementation

export const DomainStatus = () => {
  const [variant, setVariant] = React.useState<Variants>(Variants.Month);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleClickMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const locations = useLocations();

  const startDay = React.useMemo(() => moment().subtract(1, 'day').toISOString(), []);
  const endDay = React.useMemo(() => moment().toISOString(), []);

  const { cameras: dayTotals } = useAlertsTotals({
    locationId: locations.getCompany().locationId,
    startDate: startDay,
    endDate: endDay,
    byDeviceType: true,
    triggerType: 3, // it should filter cameras on backend in the future, so we can get rid of frontend filtering
  });

  // chart bar values

  const yBarAxisValues = React.useMemo(
    () =>
      dayTotals?.map((item) => ({
        name: getDeviceType(item.deviceType),
        data: [item.total],
      })),
    [dayTotals],
  );

  const customTooltipTotalArraySubtitle = yBarAxisValues
    ? Array.from(yBarAxisValues.map((item) => item.data)).flat()
    : [];

  const customTooltipTotalSubtitle = [...customTooltipTotalArraySubtitle].reduce((a: any, b: any) => {
    return a + b;
  }, 0);

  // chart values

  const startHistory = React.useMemo(
    () => moment().subtract(1, getVariantSubstraction(variant)).toISOString(),
    [variant],
  );

  const { cameras: historyTotals } = useAlertsTotals({
    locationId: locations.getCompany().locationId,
    startDate: startHistory,
    endDate: endDay,
    aggregation: getVariantAggregation(variant),
    byDeviceType: true,
    triggerType: 3, // it should filter cameras on backend in the future, so we can get rid of frontend filtering
  });

  const values = React.useMemo(() => formatTotals(historyTotals || []), [historyTotals]);
  const yAxisValues = values.yAxisValues.map((item) => ({
    name: getDeviceType(item.deviceType),
    data: item.data,
  }));
  const xAxisValues = values.xAxisValues;

  const customTooltipHistoryColors = [
    `${colors.accent.violet.subtle.DEFAULT}`,
    `${colors.accent.indigo.subtle.DEFAULT}`,
    `${colors.accent.blue.subtle.DEFAULT}`,
  ];

  const customTooltipHistoryColorsOnClick = [
    `${colors.accent.violet.tint.DEFAULT}`,
    `${colors.accent.indigo.tint.DEFAULT}`,
    `${colors.accent.blue.tint.DEFAULT}`,
  ];

  const [columnsColor, setColumnsColor] = React.useState(customTooltipHistoryColors);

  // PROGRESS

  const ChartLoading = () => (
    <Card fullHeight fullWidth color='transparent'>
      <Grid alignItems='center' justifyContent='center' fullHeight fullWidth>
        <CircularProgress />
      </Grid>
    </Card>
  );

  if (!dayTotals) return <ChartLoading />;
  if (!historyTotals) return <ChartLoading />;

  return (
    <>
      <Grid display='grid' className={styles['charts-container']}>
        <Card color='surface-02' fullWidth>
          <CardHeader alignItems='baseline' justifyContent='between'>
            <Text component='h3' variant='sm' weight='semibold'>
              {t('events.total.label', 'Total', 'Total events.')}
            </Text>
            <Button size='sm' variant='text'>
              {t('date.last24hours.label', 'Last 24 hours', 'Choose a specific 24-hours time interval.')}
            </Button>
          </CardHeader>
          <CardContent disablePaddingTop>
            {yBarAxisValues === undefined || yBarAxisValues.length == 0 ? (
              <Grid container direction='column'>
                <div className='fullWidth h-1.5 bg-secondary-tint-alpha mb-2' />
                <Grid alignItems='center'>
                  <div className='apexcharts-tooltip-marker bg-secondary' />
                  <Text color='typography-secondary' variant='xs'>
                    {t('asset.noDevices.label', 'No Devices', 'No devices.')}
                  </Text>
                </Grid>
              </Grid>
            ) : (
              <ColumnChart
                columnBorderRadius={0}
                columnHeight={15}
                customTooltip={customTooltipTotal}
                fullWidthColumn
                height={60}
                horizontal
                intersectTooltip
                isSparkline
                isStacked
                legendHorizontalAlign='left'
                legendOffsetX={-32}
                legendOffsetY={4}
                legendPosition='bottom'
                showGrid={false}
                showLegend
                showStroke
                showTooltip
                subtitle={customTooltipTotalSubtitle}
                subtitleAlign='left'
                subtitleFontSize='18px'
                subtitleOffsetX={-10}
                subtitleOffsetY={-4}
                tooltipHighlightDataSeries
                tooltipXShow={false}
                xAxis={false}
                xAxisValues={['']}
                xLabels={false}
                yAxis={false}
                //yAxisMaxValue={5464}
                yAxisValues={yBarAxisValues}
                yAxisColors={[
                  `${colors.accent.violet.subtle.DEFAULT}`,
                  `${colors.accent.indigo.subtle.DEFAULT}`,
                  `${colors.accent.blue.subtle.DEFAULT}`,
                  `${colors.accent.sky.subtle.DEFAULT}`,
                  `${colors.accent.cyan.subtle.DEFAULT}`,
                  `${colors.accent.teal.subtle.DEFAULT}`,
                ]}
              />
            )}
          </CardContent>
        </Card>
        <Card color='surface-02' fullWidth>
          <CardHeader alignItems='baseline' justifyContent='between' disablePaddingBottom>
            <Text component='h3' variant='sm' weight='semibold'>
              {t('asset.history.label', 'History', "Device's history.")}
            </Text>
            <Menu
              button={
                <Button
                  endIcon={menuOpen ? <ChevronUpLineIcon /> : <ChevronDownLineIcon />}
                  size='sm'
                  variant='text'
                  onClick={handleClickMenuOpen}
                >
                  {variant}
                </Button>
              }
              placement='bottom-end'
            >
              <MenuList>
                <MenuItem>
                  <MenuItemButton
                    active={variant === Variants.Month}
                    endIcon={variant === Variants.Month ? <CheckLineIcon /> : null}
                    onClick={() => setVariant(Variants.Month)}
                  >
                    {/* TODO */}
                    <MenuItemText title={Variants.Month as any} />
                  </MenuItemButton>
                </MenuItem>
                <MenuItem>
                  <MenuItemButton
                    active={variant === Variants.Year}
                    endIcon={variant === Variants.Year ? <CheckLineIcon /> : null}
                    onClick={() => setVariant(Variants.Year)}
                  >
                    {/* TODO */}
                    <MenuItemText title={Variants.Year as any} />
                  </MenuItemButton>
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardContent disablePaddingTop>
            <ColumnChart
              columnWidth={20}
              customTooltip={customTooltipHistory}
              height={220}
              isStacked
              sharedTooltip
              intersectTooltip={false}
              tooltipHighlightDataSeries
              showTooltip
              //xAxisTickAmount={12}
              xAxisValues={xAxisValues}
              yAxis={false}
              xAxisLabelFormatter={(value: number) => moment(value).format(getVariantXAxisLabelFormatter(variant))}
              //yAxisMaxValue={100}
              yAxisValues={yAxisValues}
              yAxisColors={columnsColor}
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
