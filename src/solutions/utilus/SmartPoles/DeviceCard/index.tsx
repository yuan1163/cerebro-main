import { DeviceQuery } from '@solutions/utilus/api/generated';
import { getIconByDeviceType } from '@solutions/utilus/Dashboard/AlertCard';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  device: DeviceQuery['device'];
  onClick?: () => void;
};

export const getMarkerColorByAlerts = (length?: number) => (length ? 'error' : 'success');

export const DeviceCard: React.FC<Props> = ({ device, onClick }) => {
  const isAlert = device?.alerts && device.alerts.length > 0;
  return (
    <Card color='surface-02' fullWidth>
      <CardContent size='xs'>
        <Grid container spacing={3} alignItems='stretch'>
          <Grid item>
            <Icon variant='tint' size='lg' color={(isAlert as any) && 'error'}>
              {getIconByDeviceType(device?.type?.id)}
            </Icon>
          </Grid>
          <Grid item>
            <Grid direction='column' justifyContent='center' className={styles['card-title']}>
              <Text variant='sm' weight='bold' overflow='hidden' textOverflow='ellipsis'>
                {device?.name}
              </Text>
              <Text variant='xs' color='typography-secondary' overflow='hidden' textOverflow='ellipsis'>
                {device?.serial}
              </Text>
            </Grid>
          </Grid>
          <Grid item grow>
            <Box className={styles['arrow-icon-container']}>
              <IconButton onClick={onClick} size='lg' className={styles['arrow-icon']}>
                <ArrowRightLineIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider className={styles['divider']} />
        <Grid alignItems='center'>
          <LegendMarker color={getMarkerColorByAlerts(device?.alerts.length)} disableGutterLeft />
          <Text variant='xs'>
            {isAlert ? device.alerts[0].message : t('asset.isOnline.label', 'Online', 'Device is online.')}
          </Text>
        </Grid>
      </CardContent>
    </Card>
  );
};
