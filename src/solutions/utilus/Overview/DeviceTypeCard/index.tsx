import React from 'react';
import { DeviceTypesQuery } from '@solutions/utilus/api/generated';

// styles
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Progress } from '@core/ui/components/Progress';
import { Text } from '@core/ui/components/Text';

// data
import { useDevicesCountZone } from '@solutions/utilus/api/data/useDevicesCountZone';
import { useAlertsCountZone } from '@solutions/utilus/api/data/useAlertsCountZone';

type Props = {
  zoneId: number;
  type: ElementOf<DeviceTypesQuery['deviceTypes']>;
};

export const DeviceTypeCard: React.FC<Props> = ({ zoneId, type }) => {
  const devices = useDevicesCountZone(zoneId, type.id);
  const alerts = useAlertsCountZone(zoneId, type.id);
  if (devices === undefined || alerts === undefined) return null;
  if (devices === 0) return null;
  const ok = devices - alerts;
  return (
    <Grid item lg={6}>
      <Card className={styles['card']} fullWidth>
        <CardContent size='sm'>
          <Grid justifyContent='between' alignItems='baseline' className={styles['count-container']}>
            <Text variant='xs' color='typography-tertiary' weight='bold'>
              {type.name}
            </Text>
            <Box>
              <Text variant='xs' color='typography-secondary' component='span' weight='bold'>
                <span>{ok}/</span>
              </Text>
              <Text variant='xs' color='typography-primary' component='span' weight='bold'>
                {devices}
              </Text>
            </Box>
          </Grid>
          <Progress total={devices} value={ok} />
        </CardContent>
      </Card>
    </Grid>
  );
};
