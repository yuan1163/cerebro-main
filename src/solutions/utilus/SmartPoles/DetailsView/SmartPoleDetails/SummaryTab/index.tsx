import React from 'react';
import { SmartPoleQuery } from '@solutions/utilus/api/generated';

import { useDeviceParameters } from '@solutions/utilus/api/data/useDeviceParameters';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { DeviceCard } from '../../../DeviceCard';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Map } from '@core/ui/utilus/Map';
import { MeteringCard } from './MeteringCard';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

type Props = {
  pole: SmartPoleQuery['smartPole'];
};

const DETAILS_ZOOM = 18;

export const SummaryTab: React.FC<Props> = ({ pole }) => {
  const parameters = useDeviceParameters({ locationId: pole?.connectLocationId, deviceId: pole?.connectDeviceId });
  if (!pole) return null;
  return (
    <Scrollbar>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Map className={styles['map']} points={[pole]} zoom={DETAILS_ZOOM} />
        </Grid>
        <Grid item>
          <Grid container direction='column' grow spacing={2}>
            <Grid item>
              <Text variant='sm' component='h3' weight='bold'>
                {`${t('asset.devices.label', 'Devices', 'Devices')}.`}
              </Text>
            </Grid>
            <Grid item>
              <Grid container spacing={2} wrap='wrap'>
                {pole.devices.map((device) => (
                  <Grid item lg={3}>
                    <DeviceCard key={device.id} device={device} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='column' grow spacing={2}>
            <Grid item>
              <Text variant='sm' component='h3' weight='bold'>
                {t('solutions.metering.label', 'Metering', 'Metering.')}
              </Text>
            </Grid>
            <Divider />
            <Grid item>
              {!pole?.connectDeviceId && (
                <Text>
                  {t(
                    'solutions.smartPoleRealDevice.label',
                    'This Smart Pole is not connected to a real device',
                    'Smart Pole caption.',
                  )}
                </Text>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item grow>
          <Scrollbar className={styles['table']}>
            {parameters?.map((parameter, i) => (
              <MeteringCard key={i} parameter={parameter} />
            ))}
          </Scrollbar>
        </Grid>
      </Grid>
    </Scrollbar>
  );
};
