import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Componenct
import { Box } from '@core/ui/components/Box';

type optionSetting = {
  colors?: Array<string>;
  plotOptions?: {
    radialBar?: {
      dataLabels?: {
        name?: {
          offsetY?: number;
          show?: boolean;
          color?: string;
          fontSize?: string;
        };
        value?: {
          color?: string;
          offsetY?: number;
          fontSize?: string;
          fontWeight?: string;
        };
      };
      track?: {
        background?: string;
      };
    };
  };
};

const optionInitValue: optionSetting = {
  colors: ['#17a2e8'],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: -20,
          show: false,
          color: '#516170',
          fontSize: '24px',
        },
        value: {
          color: '#516170',
          offsetY: 7,
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
      track: {
        background: '#516170',
      },
    },
  },
};

type Props = {
  circleSize?: number;
  hollowSize?: string;
  optionSetting?: optionSetting;
  value: Array<number>;
  labelName?: Array<string>;
};

export const ProcessCircle: React.FC<Props> = ({
  circleSize = 100,
  hollowSize = '55%',
  optionSetting = optionInitValue,
  value,
  labelName = [''],
  ...props
}) => {
  const ProcessCircleChartOption: ApexOptions = {
    chart: {
      type: 'radialBar',
      toolbar: {
        show: false,
      },
      height: circleSize,
    },
    colors: optionSetting.colors,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: hollowSize,
        },
        track: {
          background: optionSetting.plotOptions?.radialBar?.track?.background,
        },

        dataLabels: {
          name: {
            offsetY: optionSetting?.plotOptions?.radialBar?.dataLabels?.name?.offsetY,
            show: optionSetting?.plotOptions?.radialBar?.dataLabels?.name?.show,
            color: optionSetting?.plotOptions?.radialBar?.dataLabels?.name?.color,
            fontSize: optionSetting?.plotOptions?.radialBar?.dataLabels?.name?.fontSize,
          },
          value: {
            color: optionSetting?.plotOptions?.radialBar?.dataLabels?.value?.color,
            offsetY: optionSetting?.plotOptions?.radialBar?.dataLabels?.value?.offsetY,
            fontSize: optionSetting?.plotOptions?.radialBar?.dataLabels?.value?.fontSize,
            fontWeight: optionSetting?.plotOptions?.radialBar?.dataLabels?.value?.fontWeight,
            show: true,
          },
        },
      },
    },
    grid: {
      padding: {
        top: -16,
        bottom: -20,
        right: 10,
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
    stroke: {
      lineCap: 'round',
    },
    labels: labelName,
    // responsive: [
    //   {
    //     breakpoint: 1000,
    //     options: {
    //       chart: {
    //         width: 150,
    //         height: 150,
    //       },
    //       plotOptions: {
    //         radialBar: {
    //           hollow: {
    //             margin: 15,
    //             size: '60%',
    //           },
    //         },
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <Box className={styles['processCircle-container']}>
      <ReactApexChart
        type='radialBar'
        options={ProcessCircleChartOption}
        height={circleSize}
        width={circleSize}
        series={value}
      />
    </Box>
  );
};
