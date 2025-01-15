import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Storage
import { ChartStateStorage } from '@solutions/ems/storages/chartState';

// Type
import { ProportionDataOutput } from '@solutions/ems/Analytics/data/getBarChartData';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Componenct
import ThemeContext from '@app/ThemeAdapter/ThemeContext';
import { Box } from '@core/ui/components/Box';
import { IsFetching } from '@core/ui/ems/Charts/IsFetching';
import { NoData } from '@core/ui/ems/Charts/NoData';
import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import { getWindowSize } from '../Function/resize';

type HasValue = {
  xAxisData: Array<string>;
  yAxisData: any;
  getDataFun?: never;
  chartStateClass?: never;
};

type HasFun = {
  xAxisData?: never;
  yAxisData?: never;
  getDataFun: (START_DATETIME: string | undefined, END_DATETIME: string | undefined) => ProportionDataOutput;
  chartStateClass?: ChartStateStorage;
};

type optionSetting = {
  colors?: Array<string>;
  yaxis?: {
    max?: number;
    labels?: {
      formatter?(val: any): any;
    };
  };
  xaxis?: {
    maxTickAmount?: number;
    minTickAmount?: number;
  };
};

type Props = {
  height?: number;
  horizontal?: boolean;
  ChartOptionSetting: optionSetting;
  fetching?: boolean;
} & (HasValue | HasFun);

export const PieChart: React.FC<Props> = ({
  horizontal = false,
  ChartOptionSetting,
  xAxisData,
  yAxisData,
  height = 350,
  fetching = true,
  getDataFun,
  chartStateClass,
}) => {
  const { currentTheme, changeCurrentTheme } = React.useContext(ThemeContext);
  const themeMode: 'light' | 'dark' = currentTheme === 'light' ? 'light' : 'dark';
  let barWeight: string = '40%';

  const [windowSize, setWindowSize] = useState(getWindowSize());
  let xAxis_tickAmount: number | 'dataPoints' | undefined =
    windowSize.innerWidth > 1400 ? ChartOptionSetting?.xaxis?.maxTickAmount : ChartOptionSetting?.xaxis?.minTickAmount;

  if (getDataFun) {
    const apiData = getDataFun(chartStateClass?.StartDate, chartStateClass?.EndDate);

    yAxisData = apiData.yAxisData;
    xAxisData = apiData.xAxis;
    fetching = apiData.isFetching;

    if (xAxisData?.length <= 2) barWeight = '20%';
  }

  const fullConfig = resolveConfig(tailwindConfig);

  const colors = fullConfig.theme?.colors as { [key: string]: any };
  const fontSize = fullConfig.theme?.fontSize as { [key: string]: any };
  const fontFamily = fullConfig.theme?.fontFamily as { [key: string]: any };
  const fontWeight = fullConfig.theme?.fontWeight as { [key: string]: any };

  const chartFontFamily = `${fontFamily.sans}`;
  const chartFontSize = `${fontSize.xs[0]}`;

  // console.log(yAxisData);

  const PieChartOption: ApexOptions = {
    chart: {
      width: '100%',
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: xAxisData,
    // colors: ChartOptionSetting?.colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      offsetX: 100,
      position: 'right',
    },
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
    tooltip: {
      style: {
        fontSize: chartFontSize,
        fontFamily: chartFontFamily,
      },
      // cssClass: styles['tooltip'],
      theme: 'light',
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 1600,
        options: {
          legend: {
            offsetX: 0,
            position: 'right',
          },
        },
      },
    ],
  };

  // console.log(yAxisData);

  return (
    <Box className={styles['bar-container']}>
      {fetching ? (
        <IsFetching height={height} />
      ) : xAxisData?.length && yAxisData[0].data.length ? (
        <ReactApexChart
          type='donut'
          options={PieChartOption}
          height={height}
          series={yAxisData[0].data.map((d: any) => (d ? Number(d) : 0))}
        />
      ) : (
        <NoData height={height} />
      )}
    </Box>
  );
};
