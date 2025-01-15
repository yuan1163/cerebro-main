import React from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// types

import { Asset, Device, Notification } from '@core/api/types';

// storages
import { useAlerts } from '@core/storages/controllers/alerts';
import { useMap } from '@core/storages/controllers/maps';
import { useUI } from '@core/storages/ui';
//import { useRedirector } from '@core/storages/redirector';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/cerebro/LocationSchema/styles.module.scss';
import stylesMini from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Chip } from '@core/ui/components/Chip';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Image } from '@core/ui/components/Image';
import { Pin } from '@core/ui/components/Pin';
import { SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';

// icons

import StationLineIcon from '@assets/icons/line/station.svg?component';
import Expand03LineIcon from '@assets/icons/line/expand-03.svg?component';
import Minimize02LineIcon from '@assets/icons/line/minimize-02.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';

type Props = {
  // building: SelectOption<Location>;
  // space: SelectOption<Location>;
  // deviceType: SelectOption<number | undefined>;
  asset?: Asset;
  className?: string;
  device?: Device;
  event?: Partial<Notification>;
  //routeElement?: string;
};

export const LocationSchemaMini: React.FC<Props> = observer(
  //  ({ building, space, asset, deviceType, device, className }) => {
  ({ asset, device, event, className }) => {
    //const redirector = useRedirector();
    const ui = useUI();

    const maps = useMap({ locationId: device?.ownerLocationId });

    const alerts = useAlerts({
      locationId: device?.ownerLocationId,
      // locationId: space.value.locationId,
      // deviceType: deviceType.value,
    });

    let xPosition;
    let yPosition;
    if (maps.hasData()) {
      const dimensions = maps.getDimensions();
      xPosition = (100 * (event?.posX ?? 0)) / dimensions.width;
      yPosition = (100 * (event?.posY ?? 0)) / dimensions.height;
    }

    // pin offset

    const pinWidth = 3;
    const pinOffset = (pinWidth * 16) / 2;
    const mapWrapperHeight = 174;
    const mapWrapperWidth = 408;

    return (
      <div className={cn(styles['schema-container'], stylesMini['schema-container-mini'], className)}>
        {/* {asset?.assetUid && (
          <Box className={styles['asset-chip-container']}>
            <Chip color='secondary' startIcon={<StationLineIcon />}>{asset?.assetUid}</Chip>
          </Box>
        )} */}
        <Stack direction='row' spacing={2} className={styles['icons-container']}>
          <IconButton
            ariaLabel={t('general.expandView.label', 'Expand view', 'Expand view button.')}
            className={styles['icon-button']}
            disabled
            // onClick={() => ui.gotoLocations()}
            size='lg'
            variant='control'
          >
            <Expand03LineIcon />
          </IconButton>
        </Stack>
        <Box
          className={stylesMini['image-container-absolute']}
          style={{
            minHeight: `${maps.hasData() && maps?.dimensions?.height}px`,
            minWidth: `${maps.hasData() && maps?.dimensions?.width}px`,
            right: `calc(-${maps?.dimensions?.width}px + ${event?.posX}px + ${mapWrapperWidth}px / 2)`,
            bottom: `calc(-${maps?.dimensions?.height}px + ${event?.posY}px + ${mapWrapperHeight}px / 2)`,
          }}
        >
          <Box className={stylesMini['image-wrapper-relative']}>
            {maps.hasData() && (
              <Pin
                color={event?.alertPriority}
                style={{
                  right: `calc((100% - ${xPosition}%) - ${pinOffset}px)`,
                  bottom: `calc((100% - ${yPosition}%) - ${pinOffset}px)`,
                }}
                icon={
                  (device?.deviceType === 101 && <StationLineIcon />) ||
                  (device?.deviceType === 102 && <TrackerLineIcon />)
                }
              />
            )}
            <Image
              className={styles['image']}
              src={maps.getImage()}
              style={{
                minHeight: `${maps.hasData() && maps?.dimensions?.height}px`,
                minWidth: `${maps.hasData() && maps?.dimensions?.width}px`,
              }}
            />
          </Box>
        </Box>
      </div>
    );
  },
);
