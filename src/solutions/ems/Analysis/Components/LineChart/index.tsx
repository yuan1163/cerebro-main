import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

// theme

import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

const colors = fullConfig.theme?.colors as { [key: string]: any };
const fontSize = fullConfig.theme?.fontSize as { [key: string]: any };
const fontFamily = fullConfig.theme?.fontFamily as { [key: string]: any };
const fontWeight = fullConfig.theme?.fontWeight as { [key: string]: any };

const chartColor = `${colors.typography.tertiary}`;
const chartSecondaryColor = `${colors.typography.primary}`;
const chartFontFamily = `${fontFamily.sans}`;
const chartFontSize = `${fontSize.xs[0]}`;
const chartFontSizeLg = `${fontSize.lg[0]}`;
const gridPadding = 12;

// styles

import { cn } from '@core/utils/classnames';
import { t } from '@core/utils/translate';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  columnBorderRadius?: number;
  columnBorderRadiusApplication?: 'around' | 'end';
  columnBorderRadiusWhenStacked?: 'all' | 'last';
  columnHeight?: number;
  columnWidth?: number;
  customTooltip?: any;
  dataPointMouseEnter?: (value: any) => void;
  dataPointSelectionFunction?: (value: any) => void;
  fullWidthColumn?: boolean;
  height?: number | string;
  horizontal?: boolean;
  intersectTooltip?: boolean;
  isAnimated?: boolean;
  isSparkline?: boolean;
  isStacked?: boolean;
  legendFormatter?: (value: any) => void;
  legendHorizontalAlign?: string;
  legendOffsetX?: number;
  legendOffsetY?: number;
  legendPosition?: string;
  sharedTooltip?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showStroke?: boolean;
  showTooltip?: boolean;
  subtitle?: number | string;
  subtitleAlign?: string;
  subtitleFontSize?: number | string;
  subtitleOffsetX?: number;
  subtitleOffsetY?: number;
  tooltipHighlightDataSeries?: boolean;
  tooltipXShow?: boolean;
  xAxis?: boolean;
  xAxisLabelFormatter?: (value: any) => void;
  xAxisMaxValue?: number | string;
  xAxisTickAmount?: number;
  xAxisValues?: Array<number | string>;
  xLabels?: boolean;
  yAxis?: boolean;
  yAxisColors?: Array<string>;
  yAxisMaxValue?: number | string;
  yAxisValues?: ApexAxisChartSeries | ApexNonAxisChartSeries;
} & React.HTMLAttributes<HTMLElement>;

export const LineChart: React.FC<Props> = ({
  className,
  columnBorderRadius = 2,
  columnHeight,
  columnWidth = 40,
  customTooltip,
  dataPointMouseEnter,
  dataPointSelectionFunction,
  fullWidthColumn = false,
  height,
  horizontal = false,
  intersectTooltip = false,
  isAnimated = false,
  isSparkline = false,
  isStacked = false,
  legendFormatter,
  legendHorizontalAlign = 'center',
  legendOffsetX = 0,
  legendOffsetY = 0,
  legendPosition = 'bottom',
  sharedTooltip = false,
  showGrid = true,
  showLegend = false,
  showStroke = false,
  showTooltip = false,
  subtitle,
  subtitleAlign,
  subtitleFontSize,
  subtitleOffsetX,
  subtitleOffsetY,
  tooltipHighlightDataSeries = false,
  xAxis = true,
  tooltipXShow = true,
  xAxisLabelFormatter,
  xAxisMaxValue,
  xAxisTickAmount,
  xAxisValues = [],
  xLabels = true,
  yAxis = true,
  yAxisColors = [
    `${colors.primary.DEFAULT}`,
    `${colors.error.DEFAULT}`,
    `${colors.success.DEFAULT}`,
    `${colors.warning.DEFAULT}`,
    `${colors.trivial.DEFAULT}`,
    `${colors.fuchsia.DEFAULT}`,
  ],
  yAxisMaxValue,
  yAxisValues = [],
  ...props
}) => {
  const series = yAxisValues;
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: false,
      },
      stacked: isStacked,
      stackType: fullWidthColumn && '100%',
      animations: {
        enabled: isAnimated,
      },
      sparkline: {
        enabled: isSparkline,
      },
      type: 'line',
      events: {
        dataPointSelection: dataPointSelectionFunction, // click on column
        dataPointMouseEnter: dataPointMouseEnter,
      },
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        columnWidth: `${columnWidth}%`,
        barHeight: `${columnHeight}%`,
        borderRadius: columnBorderRadius,
      },
    },
    colors: yAxisColors,
    dataLabels: {
      enabled: false,
    },
    yaxis: [
      {
        show: yAxis,
        labels: {
          style: {
            colors: chartColor,
            fontFamily: chartFontFamily,
            fontSize: chartFontSize,
          },
          offsetX: -10,
        },
      },
    ],
    xaxis: {
      show: xAxis,
      categories: xAxisValues,
      tickAmount: xAxisTickAmount,
      max: xAxisMaxValue,
      crosshairs: {
        show: false, // to delete a shadow on hover
      },
      labels: {
        show: xLabels,
        rotate: 0,
        formatter: xAxisLabelFormatter,
        style: {
          colors: chartColor,
          fontFamily: chartFontFamily,
          fontSize: chartFontSize,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: showTooltip,
      custom: customTooltip,
      shared: sharedTooltip,
      intersect: intersectTooltip,
      theme: 'light',
      style: {
        fontSize: chartFontSize,
        fontFamily: chartFontFamily,
      },
      onDatasetHover: {
        highlightDataSeries: tooltipHighlightDataSeries,
      },
      y: {
        title: {
          formatter(seriesName: string) {
            return seriesName;
          }, // to delete colon
        },
      },
      x: {
        show: tooltipXShow,
      },
    },
    grid: {
      show: showGrid,
      borderColor: `${colors.divider.DEFAULT}`,
      padding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 5,
      },
    },
    subtitle: {
      text: subtitle,
      floating: true,
      align: subtitleAlign,
      offsetX: subtitleOffsetX,
      offsetY: subtitleOffsetY,
      margin: 0,
      style: {
        fontFamily: chartFontFamily,
        fontSize: subtitleFontSize,
        fontWeight: `${fontWeight.semibold}`,
        color: `${chartSecondaryColor}`,
      },
    },
    legend: {
      show: showLegend,
      showForSingleSeries: true,
      position: legendPosition,
      horizontalAlign: legendHorizontalAlign,
      offsetX: legendOffsetX,
      offsetY: legendOffsetY,
      labels: {
        colors: `${colors.typography.secondary}`,
      },
      containerPadding: 0,
      formatter: legendFormatter,
      markers: {
        width: 6,
        height: 6,
        radius: 12,
        offsetX: -2,
        offsetY: -1,
      },
      itemMargin: {
        horizontal: 8,
      },
    },
    // noData: {
    //   text: undefined,
    //   align: 'center',
    //   verticalAlign: 'middle',
    //   offsetX: 0,
    //   offsetY: 0,
    //   style: {
    //     color: undefined,
    //     fontSize: '14px',
    //     fontFamily: undefined,
    //   },
    // },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
  };

  return <ReactApexChart type='line' height={height} options={options as ApexOptions} series={series} />;
};
