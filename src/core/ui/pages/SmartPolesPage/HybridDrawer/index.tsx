import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { BarChartCard } from '../BarChartCard';
import { Box } from '@core/ui/components/Box';
import { ButtonsWidget } from '../ButtonsWidget';
import { Grid } from '@core/ui/components/Grid';
import { LayerPopover } from '../LayerPopover';
import { PolesCard } from '../PolesCard';
import { RadialBarCard } from '../RadialBarCard';
import { Stack } from '@core/ui/components/Stack';

// icons

import Signal01LineIcon from '@assets/icons/line/signal-01.svg?component';
import SunLineIcon from '@assets/icons/line/sun.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';
import WifiLineIcon from '@assets/icons/line/wifi.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const HybridDrawer: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <>
      {/* <ButtonsWidget /> */}
      <Box className={styles['hybrid-drawer']}>
        <Grid container alignItems='end' className={styles['hybrid-drawer-content']}>
          <Stack spacing={2} className={styles['charts-content']}>
            <Grid item>
              <BarChartCard />
            </Grid>
            <Grid item>
              <Grid container spacing={2} wrap='wrap'>
                {radialBarData.map((item) => (
                  <Grid item lg={6}>
                    <RadialBarCard content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item className={styles['poles-card-container']}>
              <Grid container spacing={2}>
                {content.map((item) => (
                  <Grid item lg={6}>
                    <PolesCard content={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Stack>
          <Box>
            <LayerPopover className={styles['speed-dial']} />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

const content = [
  {
    header: t('solutions.polesTemperature.label', 'Poles Temperature', 'Poles temperature'),
    mainLegend: {
      totalValue: '24°',
      description: t('solutions.averagePerPole.label', 'Average per Pole', 'Average per Pole.'),
    },
    legend: [
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
    ],
    checkData: {
      title: t('events.checkOverheatedDevices.label', 'Check overheated devices', 'Check overheated devices.'),
      path: '#',
    },
  },
  {
    header: t('solutions.polesHumidity.label', 'Poles Humidity', 'Poles humidity.'),
    mainLegend: {
      totalValue: '15%',
      description: t('solutions.averagePerPole.label', 'Average per Pole', 'Average per Pole.'),
    },
    legend: [
      {
        totalValue: '199',
        description: t('events.stable.label', 'Stable', 'Stable.'),
        alertStatus: 'success',
      },
      {
        totalValue: '1',
        description: t('events.humid.label', 'Humid', 'Humid Pole.'),
        alertStatus: 'error',
      },
    ],
    checkData: {
      title: t('events.checkHumidDevices.label', 'Check humid devices', 'Check humid devices.'),
      path: '#',
    },
  },
];

const radialBarData = [
  {
    title: t('asset.gateways.label', 'Gateways', 'Gateways'),
    icon: <WifiLineIcon />,
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
