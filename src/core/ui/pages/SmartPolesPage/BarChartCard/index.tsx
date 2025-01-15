import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { ColumnChart } from '@core/ui/components/ColumnChart';
import { Grid } from '@core/ui/components/Grid';
import { LegendStandard } from '../LegendStandard';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const BarChartCard: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Card fullWidth>
      <CardContent className={styles['card-content']}>
        <Grid container>
          <Grid item>
            <Grid direction='column' className={styles['legend-container']}>
              <Text variant='base' weight='bold' className={styles['title']}>
                {t('solutions.smartPoles.label', 'Smart Poles', 'Smart Poles')}
              </Text>
              <Grid item>
                <LegendStandard variant='large' content={header} />
              </Grid>
              <Grid
                container
                justifyContent='evenly'
                direction='column'
                className={styles['legend-standard-container']}
              >
                {legend.map((item) => (
                  <Grid item>
                    <LegendStandard content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Box className={styles['barChart-container']}>
            <ColumnChart height={200} xAxisValues={xAxisValues} yAxisValues={yAxisValues} yAxisMaxValue={200} />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

const header = {
  totalValue: '200',
  description: t('solutions.totalSmartPoles.label', 'Total Smart Poles', 'Total Smart Poles.'),
  alertStatus: '',
};

const legend = [
  {
    totalValue: '180',
    description: t('events.stable.label', 'Stable', 'Stable.'),
    alertStatus: 'success',
  },
  {
    totalValue: '20',
    description: t('events.problem.label', 'Problem', 'Problem.'),
    alertStatus: 'error',
  },
];

// CHART

const yAxisValues = [60, 10, 100, 20, 30, 10];

const xAxisValues = ['11:00', '12:20', '14:00', '14:02', '16:20', '17:00'];

// const chartOptions: ApexOptions = {

//
//   labels: ['1664096400000', '1664101200000', '1664107200000', '1664107320000', '1664115600000', '1664118000000'],
//   xaxis: {
//     type: 'category',
//     max: 1664118000000,
//     labels: {
//       formatter: function (value: string) {
//         return moment(Number(value)).format('HH:mm');
//       }
