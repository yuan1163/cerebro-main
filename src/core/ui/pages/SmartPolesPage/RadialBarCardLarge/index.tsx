import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { LegendStandard } from '../LegendStandard';
import { Text } from '@core/ui/components/Text';
import { Link } from '@core/ui/components/Link';

type Legend = {
  totalValue?: number | string;
  description?: string;
  alertStatus?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | string;
};

type RadialBarCard = {
  title?: string;
  icon?: React.ReactNode;
  online?: Legend;
  offline?: Legend;
  checkData?: {
    title?: string;
    path?: string;
  };
};

type Props = {
  content?: RadialBarCard;
  className?: string;
};

export const RadialBarCardLarge: React.FC<Props> = ({ content, className, ...props }) => {
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
          size: '60%',
        },
        track: {
          background: '#ff725f',
        },
        dataLabels: {
          name: {
            offsetY: 20,
            show: true,
            color: '#8597A9',
            fontSize: '13px',
            fontWeight: 'regular',
          },
          value: {
            show: true,
            offsetY: -17,
            color: '#556074',
            fontSize: '26px',
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
      <CardContent className={styles['card-content']}>
        <Grid container alignItems='center' className={styles['legend']}>
          <Grid item className={styles['legend-content']}>
            <Grid direction='column' className={styles['legend-container']}>
              <Grid item className={styles['header']}>
                <Grid container alignItems='center'>
                  <Icon variant='soft' size='lg' className={styles['icon']}>
                    {content?.icon}
                  </Icon>
                  <Text variant='base' weight='bold'>
                    {content?.title}
                  </Text>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction='column' spacing={4}>
                  <Grid item>
                    <LegendStandard content={content?.online} />
                  </Grid>
                  <Grid item>
                    <LegendStandard content={content?.offline} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Link to={content?.checkData?.path || '#'}>
                  <Text variant='xs' color='typography-secondary' decoration='underline'>
                    {content?.checkData?.title}
                  </Text>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Box className={styles['radialBarChart-container']}>
            <ReactApexChart type='radialBar' series={chartData} options={chartOptions} height={208} />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
