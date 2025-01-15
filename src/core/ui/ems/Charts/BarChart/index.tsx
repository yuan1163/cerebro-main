import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Storage
import { ChartStateStorage } from '@solutions/ems/storages/chartState';

// Type
import { ProportionDataOutput } from '@solutions/ems/Analytics/data/getBarChartData';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Componenct
import { Box } from '@core/ui/components/Box';
import { NoData } from '@core/ui/ems/Charts/NoData';
import ThemeContext from '@app/ThemeAdapter/ThemeContext';
import { getWindowSize } from '../Function/resize';
import { IsFetching } from '../IsFetching';

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
} & (HasValue | HasFun);

export const BarChart: React.FC<Props> = ({
  horizontal = false,
  ChartOptionSetting,
  xAxisData,
  yAxisData,
  height = 350,
  getDataFun,
  chartStateClass,
}) => {
  const { currentTheme, changeCurrentTheme } = React.useContext(ThemeContext);
  const themeMode: 'light' | 'dark' = currentTheme === 'light' ? 'light' : 'dark';
  let barWeight: string = '40%';
  let fetching = true;

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

  // console.log(yAxisData);

  const BarChartOption: ApexOptions = {
    chart: {
      width: '100%',
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: ChartOptionSetting?.colors,
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 5,
      max: ChartOptionSetting?.yaxis?.max,
      min: 0,
      labels: {
        formatter: ChartOptionSetting?.yaxis?.labels?.formatter,
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
        formatter: function (val) {
          return horizontal ? Number(val).toFixed(2) : val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: xAxis_tickAmount,
      categories: xAxisData,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: horizontal,
        columnWidth: barWeight,
        barHeight: barWeight,
      },
    },
    grid: {
      borderColor: 'rgba(143, 146, 149, 0.16)',
      padding: {
        top: -10,
        bottom: -10,
      },
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
      theme: themeMode,
    },
  };

  return (
    <Box className={styles['bar-container']}>
      {fetching ? (
        <IsFetching height={height} />
      ) : xAxisData?.length ? (
        <ReactApexChart type='bar' options={BarChartOption} height={height} series={yAxisData} />
      ) : (
        <NoData height={height} />
      )}
    </Box>
  );
};
