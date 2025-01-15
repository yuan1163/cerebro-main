import React from 'react';
import { SmartPoleQuery } from '@solutions/utilus/api/generated';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Map } from '@core/ui/utilus/Map';
import { Text } from '@core/ui/components/Text';
import { DeviceCard } from '@solutions/utilus/SmartPoles/DeviceCard';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { CardContent } from '@core/ui/components/CardContent';

type Props = {
  pole: SmartPoleQuery['smartPole'];
};

const DETAILS_ZOOM = 18;

export const SummaryTab: React.FC<Props> = ({ pole }) => {
  if (!pole) return null;
  return (
    <Grid container direction='column'>
      <CardContent fullWidth>
        <Map points={[pole]} zoom={DETAILS_ZOOM} className={styles['map']} />
      </CardContent>
      <CardContent className={styles['title']}>
        <Text component='h3' variant='sm' weight='bold'>
          {`${t('asset.devices.label', 'Devices', 'Devices')}.`}
        </Text>
      </CardContent>
      <CardContent className={styles['card-content']} scrollable>
        <Scrollbar>
          <Grid container spacing={2} wrap='wrap'>
            {pole.devices.map((device) => (
              <Grid item lg={6}>
                <DeviceCard key={device.id} device={device} />
              </Grid>
            ))}
          </Grid>
        </Scrollbar>
      </CardContent>
    </Grid>
  );
};
