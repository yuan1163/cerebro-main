import { Box } from '@core/ui/components/Box';

// styles
import styles from './styles.module.scss';

// storages
import { useUI } from '@core/storages/ui';

// components

import { Grid } from '@core/ui/components/Grid';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

//data
import { DeviceTypesQuery } from '@solutions/utilus/api/generated';
import { useDevicesCountFormation } from '@solutions/utilus/api/data/useDevicesCountFormation';
import { useAlertsCountFormation } from '@solutions/utilus/api/data/useAlertsCountFormation';

type Props = {
  type: ElementOf<DeviceTypesQuery['deviceTypes']>;
};

export const DeviceTypeItem: React.FC<Props> = ({ type }) => {
  const ui = useUI();
  const devices = useDevicesCountFormation(ui.currentFormation, type.id);
  const alerts = useAlertsCountFormation(ui.currentFormation, type.id);
  return (
    <Box className={styles.item}>
      <Text color='typography-secondary'>{type.name}</Text>
      <Box className={styles.values}>
        <Grid alignItems='center'>
          <LegendMarker color='error' />
          <Text color='typography-secondary'>{alerts}</Text>
        </Grid>
        <Text color='typography-primary' weight='bold'>
          {devices}
        </Text>
      </Box>
    </Box>
  );
};
