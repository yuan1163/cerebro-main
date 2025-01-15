import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons
import SmartPoleIcon from '@assets/icons/line/smart-pole.svg?component';
import Thermometer03LineIcon from '@assets/icons/line/thermometer-03.svg?component';
import LightBulb02Icon from '@assets/icons/line/lightbulb-02.svg?component';
import Signal02Icon from '@assets/icons/line/signal-02.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';

// data
import { AlertsQuery } from '@solutions/utilus/api/generated';

type Props = {
  alert: ElementOf<AlertsQuery['alerts']>;
};

export const getColorByAlertPriority = (priority?: number): string => {
  switch (priority) {
    case 1:
      return 'error';
    case 2:
      return 'warning';
    default:
      return 'trivial';
  }
};

export const getIconByDeviceType = (type?: number): React.ReactNode => {
  switch (type) {
    case 1:
      return <Signal02Icon />;
    case 2:
      return <VideoRecorderLineIcon />;
    case 3:
      return <LightBulb02Icon />;
    case 4:
      return <Thermometer03LineIcon />;
    default:
      return <SmartPoleIcon />;
  }
};

export const AlertCard: React.FC<Props> = ({ alert }) => {
  // TODO
  const cardColor: any = getColorByAlertPriority(alert.priority?.id);
  const deviceIcon = getIconByDeviceType(alert.device?.type?.id);
  return (
    <Card className={styles['card']} color={cardColor}>
      <CardContent>
        <Grid direction='column'>
          <Icon color={cardColor} size='lg' variant='soft' className={styles['icon']}>
            {deviceIcon}
          </Icon>
          <Text component='h6' variant='sm' weight='bold'>
            {alert.device?.name}
          </Text>
          <Text className={styles['subtitle']} color='typography-secondary' variant='xs'>
            {alert.device?.serial}
          </Text>
          <Text className={styles['location']} color='typography-tertiary' variant='sm' weight='bold'>
            {alert.device?.smartPole?.zone?.name}
          </Text>
          <Text color='typography-secondary' variant='xs'>
            {alert.message}
          </Text>
        </Grid>
      </CardContent>
    </Card>
  );
};
