import React from 'react';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';
import { getCameraDetails } from '@core/utils/getCameraDetails';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { AlertPriority, Notification } from '@core/api/types';

// api

import { useDeviceParameters } from '@solutions/ems/api/hook/useDeviceParameters';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// components

import { AssetImage } from '@core/ui/cerebro/AssetImage';
import { Box } from '@core/ui/components/Box';
import { CameraPreview } from '@core/ui/components/CameraPreview';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { FormationMapMini } from '@solutions/ai/Dashboard/(legacy)/FormationMapMini';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Indicator } from '@core/ui/components/Indicator';
import { Issue } from '@solutions/cerebro/Notifications/EventSidebar/Issue';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { LocationSchemaMini } from '@core/ui/cerebro/LocationSchemaMini';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// icons

import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

import { getColor, getText, getAssetName } from '../NotificationsPage';

type Props = {
  className?: string;
  event: Partial<Notification>;
  handleEditProfile?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export const EventSidebar: React.FC<Props> = ({ className, handleEditProfile, event, ...props }) => {
  const locations = useLocations();
  const ui = useUI();
  const timezone = locations.getElementById(ui.currentFormation)?.timezone;
  const userContactInfo = [
    {
      icon: <LayersThree01LineIcon />,
      kicker: t('location.current.label', 'Current', 'Current location.'),
      title: locations.getElementById(event?.device?.ownerLocationId)?.name,
    },
    {
      icon: <ZoneLineIcon />,
      kicker: t('location.designated.label', 'Designated', 'Designated location.'),
      title: locations.getElementById(event?.device?.ownerLocationId)?.name,
    },
  ];
  const parameters = useDeviceParameters({
    locationId: event.device?.ownerLocationId,
    deviceId: event.device?.deviceId,
  });

  const navigate = useNavigate();

  return (
    <>
      <CardHeader
        action={
          <IconButton
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            size='lg'
            onClick={() => navigate('..')}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
        title={t('events.eventDetails.label', 'Event Details', 'In-depth information about the event.')}
        disablePaddingBottom
      />
      <CardContent borderBottom>
        {/* VIDEO */}

        <Grid direction='column' fullWidth gap={3}>
          <Grid alignItems='center'>
            <Indicator severity={getColor(event)} />
            <Grid container direction='column'>
              <Text variant='sm' weight='medium'>
                {/* {getText(event) ?? t('general.notAvailable.label', 'n/a', 'Not Available.')} */}
                {event.alertName}
              </Text>
              <Text color='typography-secondary' variant='sm'>
                {getAssetName(event)}
              </Text>
            </Grid>
          </Grid>
          <Issue event={event} locationId={ui.currentFormation} issueId={event.issueIds?.[0]} />
          {/* `${moment(event.creationDate)
                      .tz(timezone as string)
                      .format('MM/DD/YYYY HH:mm A')}` ?? '–' */}
          <CameraPreview snapshot={event.alertImageUrl} />
        </Grid>

        {/* <Grid item>
            <Text color='typography-secondary' variant='sm'>
              {`${t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')} "${getAssetName(
                event,
              )}" ${getText(event)?.toLowerCase() ?? t('issue.isNotAssigned.label', 'is not assigned', '')}.`}
            </Text>
          </Grid> */}
      </CardContent>
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Grid gap={3}>
                {/* <AssetImage asset={event.asset} className={styles['avatar']} size='4xl' stillLife /> */}
                <Icon color={getColor(event)} size='lg' variant='tint'>
                  <VideoRecorderLineIcon />
                </Icon>
                <Grid direction='column' justifyContent='between'>
                  <Grid direction='column'>
                    <Text variant='sm' weight='medium'>
                      {getAssetName(event)}
                    </Text>
                    <Text color='typography-secondary' variant='sm'>
                      {event.location?.name}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box className={styles['map-wrapper']}>
                <FormationMapMini event={[event]} />
              </Box>
            </Grid>
            <Grid item>
              <Grid direction='column' gap={2} fullWidth>
                <Text variant='sm' weight='semibold'>
                  {t(
                    'general.details.label',
                    'Details',
                    'Details provide in-depth information about a particular subject or topic.',
                  )}
                </Text>

                {parameters?.data?.map((item, i) => {
                  const cameraName = item.name || '';
                  return (
                    <Grid
                      key={i}
                      display='grid'
                      alignItems='end'
                      justifyContent='between'
                      gap={2}
                      className='grid-cols-[1fr_1fr]'
                    >
                      <Text
                        color='typography-secondary'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='sm'
                        weight='medium'
                        whiteSpace='nowrap'
                      >
                        {getCameraDetails(cameraName)}
                      </Text>
                      <Text
                        align='right'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='sm'
                        weight='medium'
                        whiteSpace='nowrap'
                      >
                        {item.value}
                      </Text>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
    </>
  );
};
