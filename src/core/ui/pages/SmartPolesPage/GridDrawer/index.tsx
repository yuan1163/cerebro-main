import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { BarChartCard } from '../BarChartCard';
import { Box } from '@core/ui/components/Box';
import { DrawerMenu } from '../DrawerMenu';
import { Grid } from '@core/ui/components/Grid';
import { LineChartCard } from '../LineChartCard';
import { RadialBarCardLarge } from '../RadialBarCardLarge';

// icons

import Signal01LineIcon from '@assets/icons/line/signal-01.svg?component';
import SunLineIcon from '@assets/icons/line/sun.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';
import WifiLineIcon from '@assets/icons/line/wifi.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const GridDrawer: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Box className={styles['grid-drawer']}>
      <Grid container direction='column' spacing={2} className={styles['grid-drawer-content']}>
        <Grid item className={styles['grid-drawer-item']}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <BarChartCard />
            </Grid>
            <Grid item lg={6}>
              <LineChartCard content={lineCardContent} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles['grid-drawer-item']}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <LineChartCard content={lineCardContent01} />
            </Grid>
            <Grid item lg={6}>
              <Grid container spacing={2}>
                {radialBarData.slice(0, 2).map((item) => (
                  <Grid item lg={6}>
                    <RadialBarCardLarge content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles['grid-drawer-item']}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <LineChartCard content={lineCardContent02} />
            </Grid>
            <Grid item lg={6}>
              <Grid container spacing={2}>
                {radialBarData.slice(2, 4).map((item) => (
                  <Grid item lg={6}>
                    <RadialBarCardLarge content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const lineCardContent = {
  'title': t('events.events.label', 'Disconnect', 'Disconnect notification.'),
  'header': {
    totalValue: '10456',
    description: t('date.last24h.label', 'Last 24h', 'Choose a specific 24-hours time interval.'),
    alertStatus: '',
  },
  'legend': [
    {
      totalValue: '456',
      description: t('events.criticalEvent.label', 'Critical', 'Critical event.'),
      alertStatus: '',
    },
    {
      totalValue: '1000',
      description: t('events.default.label', 'Default', 'Default event.'),
      alertStatus: '',
    },
  ],
  'chartData': [
    {
      data: [
        { x: 1664661600000, y: 1480 },
        { x: 1664668800000, y: 950 },
        { x: 1664679600000, y: 1600 },
        { x: 1664690400000, y: 930 },
        { x: 1664704800000, y: 2000 },
        { x: 1664719200000, y: 1100 },
        { x: 1664730000000, y: 1600 },
        { x: 1664737200000, y: 980 },
        { x: 1664744400000, y: 800 },
      ],
    },
  ],
  'yaxis': {
    'max': 2000,
  },
  'colors': ['#4ba5fd'],
  'fill': {
    'gradient': {
      'opacityFrom': 0.3,
      'opacityTo': 0.1,
      'gradientToColors': ['#4ba5fd'],
    },
  },
};

const lineCardContent01 = {
  'title': t('solutions.polesTemperature.label', 'Poles Temperature', 'Poles temperature'),
  'header': {
    totalValue: '24º',
    description: t('solutions.averagePerPole.label', 'Average per Pole', 'Average per Pole.'),
    alertStatus: '',
  },
  'legend': [
    {
      totalValue: '196',
      description: t('events.stable.label', 'Stable', 'Stable.'),
      alertStatus: 'success',
    },
    {
      totalValue: '4',
      description: t('events.overheated.label', 'Overheated', 'Overheated Pole.'),
      alertStatus: 'error',
    },
  ],
  'chartData': [
    {
      data: [
        { x: 1664708400000, y: 19 },
        { x: 1664712000000, y: 25 },
        { x: 1664715600000, y: 19 },
        { x: 1664715600000, y: 19 },
        { x: 1664717400000, y: 25 },
        { x: 1664721000000, y: 19 },
        { x: 1664722800000, y: 40 },
        { x: 1664724000000, y: 30 },
        { x: 1664724000000, y: 30 },
        { x: 1664725500000, y: 20 },
        { x: 1664726400000, y: 25 },
      ],
    },
  ],
  'yaxis': {
    'max': 40,
    'labels': {
      'formatter': function (value: any) {
        return `${value}°`;
      },
    },
  },
  'colors': ['#ffba5f'],
  'fill': {
    'gradient': {
      'opacityFrom': 0.4,
      'opacityTo': 0.2,
      'gradientToColors': ['#4ba5fd'],
    },
  },
};

const lineCardContent02 = {
  'title': t('solutions.polesHumidity.label', 'Poles Humidity', 'Poles humidity.'),
  'header': {
    totalValue: '15%',
    description: t('solutions.averagePerPole.label', 'Average per Pole', 'Average per Pole.'),
    alertStatus: '',
  },
  'legend': [
    {
      totalValue: '199',
      description: t('events.stable.label', 'Stable', 'Stable.'),
      alertStatus: 'success',
    },
    {
      totalValue: '1',
      description: t('events.overheated.label', 'Overheated', 'Overheated Pole.'),
      alertStatus: 'error',
    },
  ],
  'chartData': [
    {
      data: [
        { x: 1664877600000, y: 15 },
        { x: 1664878500000, y: 16 },
        { x: 1664880300000, y: 14 },
        { x: 1664881200000, y: 16 },
        { x: 1664883000000, y: 13 },
        { x: 1664884800000, y: 17 },
        { x: 1664886600000, y: 20 },
        { x: 1664888100000, y: 50 },
        { x: 1664889300000, y: 25 },
        { x: 1664890200000, y: 17 },
        { x: 1664892000000, y: 23 },
        { x: 1664895600000, y: 15 },
        { x: 1664897400000, y: 19 },
        { x: 1664899200000, y: 40 },
      ],
    },
  ],
  'yaxis': {
    'max': 100,
    'labels': {
      'formatter': function (value: any) {
        return `${value}%`;
      },
    },
  },
  'colors': ['#77E7FF'],
  'fill': {
    'gradient': {
      'opacityFrom': 0.3,
      'opacityTo': 0.1,
      'gradientToColors': ['#4ba5fd'],
    },
  },
};

const radialBarData = [
  {
    title: t('asset.gateways.label', 'Gateways', 'Gateways'),
    icon: <WifiLineIcon />,
    checkData: {
      title: t(
        'events.checkDisconnectedDevices.label',
        'Check disconnected devices',
        'Disconnected devices notification.',
      ),
      path: '/',
    },
    online: {
      totalValue: 180,
      description: t('asset.isOnline.label', 'Online', 'Device is online.'),
      alertStatus: 'success',
    },
    offline: {
      totalValue: 20,
      description: t('asset.isOffline.label', 'Offline', 'Device is offline.'),
      alertStatus: 'error',
    },
  },
  {
    title: t('asset.cameras.label', 'Cameras', 'Cameras.'),
    icon: <VideoRecorderLineIcon />,
    checkData: {
      title: t(
        'events.checkDisconnectedDevices.label',
        'Check disconnected devices',
        'Disconnected devices notification.',
      ),
      path: '/',
    },
    online: {
      totalValue: 2450,
      description: t('asset.isOnline.label', 'Online', 'Device is online.'),
      alertStatus: 'success',
    },
    offline: {
      totalValue: 50,
      description: t('asset.isOffline.label', 'Offline', 'Device is offline.'),
      alertStatus: 'error',
    },
  },
  {
    title: t('asset.LEDLights.label', 'LED Lights', 'LED Lights'),
    icon: <SunLineIcon />,
    checkData: {
      title: t(
        'events.checkDisconnectedDevices.label',
        'Check disconnected devices',
        'Disconnected devices notification.',
      ),
      path: '/',
    },
    online: {
      totalValue: 80,
      description: t('asset.isOnline.label', 'Online', 'Device is online.'),
      alertStatus: 'success',
    },
    offline: {
      totalValue: 180,
      description: t('asset.isOffline.label', 'Offline', 'Device is offline.'),
      alertStatus: 'error',
    },
  },
  {
    title: t('asset.sensors.label', 'Sensors', 'Sensors.'),
    icon: <Signal01LineIcon />,
    checkData: {
      title: t(
        'events.checkDisconnectedDevices.label',
        'Check disconnected devices',
        'Disconnected devices notification.',
      ),
      path: '/',
    },
    online: {
      totalValue: 1700,
      description: t('asset.isOnline.label', 'Online', 'Device is online.'),
      alertStatus: 'success',
    },
    offline: {
      totalValue: 180,
      description: t('asset.isOffline.label', 'Offline', 'Device is offline.'),
      alertStatus: 'error',
    },
  },
];
