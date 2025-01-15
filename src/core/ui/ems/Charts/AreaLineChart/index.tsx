import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// type
import { AreaChartDataOutput } from '@solutions/ems/Analytics/data/getAreaChartData';

// storages
import { ChartStateStorage } from '@solutions/ems/storages/chartState';

// SCSS
import styles from './styles.module.scss';

// Componenct
import ThemeContext from '@app/ThemeAdapter/ThemeContext';
import { Box } from '@core/ui/components/Box';
import { NoData } from '@core/ui/ems/Charts/NoData';

// Function
import { getWindowSize } from '../Function/resize';
import { IsFetching } from '../IsFetching';

export type optionSetting = {
  stroke?: any;
  colors?: Array<string>;
  fill?: {
    gradient?: {
      opacityFrom: number;
      opacityTo: number;
      stops: Array<number>;
    };
  };
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

type HasValue = {
  xAxisData: string[];
  yAxisData: any;
  getDataFun?: never;
  chartStateClass?: never;
};

type HasFun = {
  xAxisData?: never;
  yAxisData?: never;
  // getDataFun: (START_DATETIME: string | undefined, END_DATETIME: string | undefined) => AreaChartDataOutput;
  getDataFun: Function;

  chartStateClass?: ChartStateStorage;
};

type Props = {
  height?: number;
  ChartOptionSetting: optionSetting;
} & (HasValue | HasFun);

export const AreaLineChart: React.FC<Props> = ({
  height = 350,
  ChartOptionSetting,
  xAxisData,
  yAxisData,
  getDataFun,
  chartStateClass,
}) => {
  // mode
  const { currentTheme, changeCurrentTheme } = React.useContext(ThemeContext);
  const themeMode: 'light' | 'dark' = currentTheme === 'light' ? 'light' : 'dark';
  let fetching = true;

  const [windowSize, setWindowSize] = useState(getWindowSize());
  let xAxis_tickAmount: number | 'dataPoints' | undefined =
    windowSize.innerWidth > 1400 ? ChartOptionSetting?.xaxis?.maxTickAmount : ChartOptionSetting?.xaxis?.minTickAmount;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (getDataFun) {
    const apiData = getDataFun(
      chartStateClass?.StartDate,
      chartStateClass?.EndDate,
      chartStateClass?.DataType,
      chartStateClass?.SelectedType,
    );
    xAxisData = apiData?.xAxis;
    yAxisData = apiData?.yAxis;
    fetching = apiData?.isFetching;
  }

  const AreaChartOptions: ApexOptions = {
    chart: {
      width: '100%',
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ChartOptionSetting?.colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: ChartOptionSetting?.stroke?.curve,
      width: ChartOptionSetting?.stroke?.width,
    },
    yaxis: {
      tickAmount: 5,
      // max: ChartOptionSetting?.yaxis?.max,
      // min: 0,
      labels: {
        show: true,
        align: 'center',
        formatter: ChartOptionSetting?.yaxis?.labels?.formatter,
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
      },
    },
    fill: ChartOptionSetting?.fill,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#8597a9',
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
        rotate: 0,
        // rotateAlways: true,
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
    <Box className={styles['area-container']}>
      {fetching ? (
        <IsFetching height={height} />
      ) : xAxisData?.length ? (
        <ReactApexChart type='area' options={AreaChartOptions} height={height} series={yAxisData} />
      ) : (
        <NoData height={height} />
      )}
    </Box>
  );
};
