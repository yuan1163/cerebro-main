import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { LegendStandard } from '../LegendStandard';
import { Text } from '@core/ui/components/Text';

type Legend = {
  totalValue?: number | string;
  description?: string;
  alertStatus?: 'primary' | 'secondary' | SeverityPalette | string;
};

type RadialBarCard = {
  title?: string;
  icon?: React.ReactNode;
  online?: Legend;
  offline?: Legend;
};

type Props = {
  content?: RadialBarCard;
  className?: string;
};

export const RadialBarCard: React.FC<Props> = ({ content, className, ...props }) => {
  // CHART

  const totalNumberOfDevices = Number(content?.online?.totalValue) + Number(content?.offline?.totalValue);

  const onlinePercent = Math.ceil((Number(content?.online?.totalValue) * 100) / totalNumberOfDevices);

  const chartData = [onlinePercent];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
    },
    grid: {
      padding: {
        top: -16,
        bottom: -20,
        right: 10,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '55%',
        },
        track: {
          background: '#ff725f',
        },
        dataLabels: {
          name: {
            offsetY: 10,
            show: true,
            color: '#8597A9',
            fontSize: '8px',
            fontWeight: 'regular',
          },
          value: {
            show: true,
            offsetY: -17,
            color: '#556074',
            fontSize: '16px',
            fontWeight: 'bold',
            formatter: function (val) {
              return totalNumberOfDevices.toString();
            },
          },
        },
      },
    },
    fill: {
      colors: ['#91D848'],
      opacity: 1,
    },
    labels: ['Total devices'],
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
      <CardContent>
        <Grid container alignItems='center'>
          <Grid item className={styles['legend-content']}>
            <Grid direction='column' className={styles['legend-container']}>
              <Grid item className={styles['header']}>
                <Icon className={styles['icon']} size='lg' variant='tint'>
                  {content?.icon}
                </Icon>
                <Text variant='base' weight='bold'>
                  {content?.title}
                </Text>
              </Grid>
              <Grid item>
                <Grid container spacing={4}>
                  <Grid item>
                    <LegendStandard content={content?.online} />
                  </Grid>
                  <Grid item>
                    <LegendStandard content={content?.offline} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box className={styles['radialBarChart-container']}>
            <ReactApexChart type='radialBar' series={chartData} options={chartOptions} height={140} />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
