import { Box } from '@core/ui/components/Box';

// utils

import { t } from '@core/utils/translate';
import { getAlertPriority } from '@core/utils/getAlertPriority';

// styles
import styles from './styles.module.scss';

// storages
import { useUI } from '@core/storages/ui';

// components

import { Grid } from '@core/ui/components/Grid';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

//data
import { getDeviceType } from '@core/api/types';
import { useDevices } from '@core/storages/controllers/devices';
import { useAlerts } from '@core/storages/controllers/alerts';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';

type Props = {
  type: number;
  locationId?: number;
};

export const DeviceTypeItem: React.FC<Props> = ({ type, locationId }) => {
  const ui = useUI();
  const devices = useDevices({ locationId });
  const alerts = useAlerts({ locationId });
  return (
    <Card elevation='xs' className={styles['cards-container']}>
      <CardContent size='xs'>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Grid alignItems='center' justifyContent='between' fullWidth>
              <Text color='typography-secondary' component='span' variant='xs'>
                {t('deviceTypes.Cameras', 'Cameras', 'Cameras device type.')}
              </Text>
              <Text component='span' variant='xs' weight='semibold'>
                {devices.getCount(type)}
              </Text>
            </Grid>
          </Grid>
          <Grid item>
            <Grid alignItems='center' justifyContent='between' fullWidth>
              <Text color='typography-secondary' component='span' variant='xs'>
                {t(
                  'events.criticalEvents.label',
                  'Critical events',
                  'Significant incidents that demand urgent attention.',
                )}
              </Text>
              <Grid alignItems='center'>
                <LegendMarker color='error' />
                <Text component='span' variant='xs' weight='semibold'>
                  0{/* {alerts.getCamerasAlerts().map((alert, i) => getAlertPriority(alert.alertPriority))} */}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// {getDeviceType(type)}
// {alerts.getCount(type)}
// {devices.getCount(type)}
// {alerts.getCamerasAlerts().map((alert, i) => console.log(alert);)}
