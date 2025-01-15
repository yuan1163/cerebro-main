import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// types

import { LocationType, Location, getDeviceType, AlertPriority } from '@core/api/types';

// storages

//import { useRedirector } from '@core/storages/redirector';
import { useAlerts } from '@core/storages/controllers/alerts';
import { useDevices } from '@core/storages/controllers/devices';
import { useMap } from '@core/storages/controllers/maps';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Image } from '@core/ui/components/Image';
import { LocationSchemaDevices } from './LocationSchemaDevices';
import { Pin } from '@core/ui/components/Pin';
import { SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';

// icons

import Expand03LineIcon from '@assets/icons/line/expand-03.svg?component';
import Minimize02LineIcon from '@assets/icons/line/minimize-02.svg?component';
import StationLineIcon from '@assets/icons/line/station.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';
// import ThreeDimensionalIcon from '@assets/icons/three-dimensional.svg?component';
// import TwoDimensionalIcon from '@assets/icons/two-dimensional.svg?component';

type Props = {
  className?: string;
  deviceType: SelectOption<number | undefined>;
  maximized: boolean;
  space: SelectOption<Location>;
};

export const LocationSchema: React.FC<Props> = observer(({ className, deviceType, space, maximized }) => {
  //const redirector = useRedirector();
  const ui = useUI();

  // two-dimensional toggle button
  const [twoDimensional, setTwoDimensional] = React.useState(true);
  const handleDimensionalClick = () => {
    setTwoDimensional(!twoDimensional);
  };

  const alerts = useAlerts({
    locationId: space.value.locationId,
    deviceType: deviceType.value,
  });

  const summaries = useDevices({ locationId: space.value.locationId });

  const maps = useMap({ locationId: space.value.locationId });

  const navigate = useNavigate();

  // pin offset

  const pinWidth = 3;
  const pinOffset = (pinWidth * 16) / 2;

  return (
    <Grid
      alignItems='center'
      justifyContent='center'
      grow
      fullHeight
      fullWidth
      className={cn(styles['schema-container'], className)}
    >
      <Stack className={styles['devices-container']} direction='column'>
        {locationTypes?.map((type) => (
          <LocationSchemaDevices
            key={type}
            caption={alerts.hasData() ? alerts.getCount(type) : '...'}
            summary={summaries.hasData() ? summaries.getCount(type) : '...'}
            title={getDeviceType(type)}
          />
        ))}
      </Stack>
      {/* icons */}
      <Stack direction='row' spacing={2} className={styles['icons-container']}>
        {/* <IconButton
          ariaLabel='2D'
          className={styles['icon-button']}
          onClick={handleDimensionalClick}
          size='lg'
          variant='control'
        >
          {twoDimensional ? <TwoDimensionalIcon /> : <ThreeDimensionalIcon />}
        </IconButton> */}
        <IconButton
          ariaLabel={t('general.expandView.label', 'Expand view', 'Expand view button.')}
          className={styles['icon-button']}
          onClick={() => (maximized ? ui.gotoDashboard() : ui.gotoLocations())}
          size='lg'
          variant='control'
        >
          {maximized ? <Minimize02LineIcon /> : <Expand03LineIcon />}
        </IconButton>
      </Stack>
      <Box className={styles['image-container']}>
        {alerts.hasData() &&
          maps.hasData() &&
          alerts.getData().map((item, i) => {
            const dimensions = maps.getDimensions();
            const xPosition = (100 * item.device.posX) / dimensions.width;
            const yPosition = (100 * item.device.posY) / dimensions.height;
            const alertPriority = item.rules
              ? Math.max(...item.rules?.map((rule) => rule.alertPriority))
              : AlertPriority.Critical;
            return (
              /* TODO use DeviceTypesEnum */
              <Pin
                key={`points-${i}`}
                color={alertPriority}
                onClick={() => item.asset && navigate(`../assets/${ui.currentFormation}/asset/${item.asset.assetId}`)}
                style={{
                  right: `calc((100% - ${xPosition}%) - ${pinOffset}px)`,
                  bottom: `calc((100% - ${yPosition}%) - ${pinOffset}px)`,
                }}
                title={
                  item.asset?.name ||
                  t('asset.unassignedDevice.label', 'Unassigned device', 'Unassigned device.') + item.device.deviceId
                }
                icon={
                  (item.device.deviceType === 101 && <StationLineIcon />) ||
                  (item.device.deviceType === 102 && <TrackerLineIcon />)
                }
              />
            );
          })}
        <Image src={maps.getImage()} className={styles['image']} />
      </Box>
    </Grid>
  );
});

const locationTypes = [101, 102];
