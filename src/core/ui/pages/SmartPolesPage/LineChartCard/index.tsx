import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { LegendStandard } from '../LegendStandard';
import { Text } from '@core/ui/components/Text';

type Content = {
  title?: string;
  header?: {
    totalValue?: string;
    description?: string;
    alertStatus?: string;
  };
  legend?: Array<{
    totalValue?: string;
    description?: string;
    alertStatus?: string;
  }>;
  chartData?: any;
  colors?: Array<string>;
  fill?: {
    gradient?: {
      opacityFrom: number;
      opacityTo: number;
      gradientToColors: Array<string>;
    };
  };
  yaxis?: {
    max?: number;
    labels?: {
      formatter?(val: any): any;
    };
  };
};

type Props = {
  className?: string;
  content?: Content;
};

export const LineChartCard: React.FC<Props> = ({ className, content, ...props }) => {
  const chartOptions: ApexOptions = {
    chart: {
      width: '100%',
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    colors: content?.colors,
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 4,
      max: content?.yaxis?.max,
      min: 0,
      labels: {
        formatter: content?.yaxis?.labels?.formatter,
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (value: string) {
          return moment(Number(value)).format('HH:mm');
        },
        style: {
          colors: '#8597a9',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      borderColor: 'rgba(133, 151, 169, 0.16)',
      padding: {
        top: -5,
        bottom: -10,
      },
    },
    fill: {
      gradient: {
        opacityFrom: content?.fill?.gradient?.opacityFrom,
        opacityTo: content?.fill?.gradient?.opacityTo,
        gradientToColors: content?.fill?.gradient?.gradientToColors,
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
  };
  return (
    <Card fullWidth>
      <CardContent className={styles['card-content']}>
        <Grid container>
          <Grid item>
            <Grid direction='column' className={styles['legend-container']}>
              <Text variant='base' weight='bold' className={styles['title']}>
                {content?.title}
              </Text>
              <Grid item>
                <LegendStandard content={content?.header} />
              </Grid>
              <Grid
                container
                justifyContent='evenly'
                direction='column'
                className={styles['legend-standard-container']}
              >
                {content?.legend?.map((item) => (
                  <Grid item>
                    <LegendStandard content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Box className={styles['lineChart-container']}>
            <ReactApexChart type='area' series={content?.chartData} options={chartOptions} height={192} />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
