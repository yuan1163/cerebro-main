import React from 'react';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { AlertPriority, Notification } from '@core/api/types';

// api

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { CreateIssueModal } from '../CreateIssueModal';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { Indicator } from '@core/ui/components/Indicator';
import { KickerContainer } from '@core/ui/components/Kicker/KickerContainer';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { LocationSchemaMini } from '@core/ui/cerebro/LocationSchemaMini';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// icons

import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

import { Issue } from './Issue';
import { getColor, getText, getAssetName } from '../NotificationsPage';
import { AssetImage } from '@core/ui/cerebro/AssetImage';

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  event: Partial<Notification>;
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

  return (
    <>
      <CardHeader borderBottom>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <Grid alignItems='center'>
              <Grid item>
                <Grid alignItems='center'>
                  <Indicator severity={getColor(event)} />
                  <Grid container direction='column'>
                    <Text variant='sm' weight='medium'>
                      {getText(event) ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                    </Text>
                    <Text color='typography-secondary' variant='sm'>
                      {getAssetName(event)}
                    </Text>
                  </Grid>
                </Grid>
                {/* `${moment(event.creationDate)
                      .tz(timezone as string)
                      .format('MM/DD/YYYY HH:mm A')}` ?? '–' */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Text color='typography-secondary' variant='sm'>
              {`${t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')} "${getAssetName(
                event,
              )}" ${getText(event)?.toLowerCase() ?? t('issue.isNotAssigned.label', 'is not assigned', '')}.`}
            </Text>
          </Grid>
          <Issue event={event} locationId={ui.currentFormation} issueId={event.issueIds?.[0]} />
        </Grid>
      </CardHeader>
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Grid alignItems='stretch'>
                <Grid item>
                  <AssetImage asset={event.asset} className={styles['avatar']} size='4xl' stillLife />
                </Grid>
                <Grid item>
                  <Grid direction='column' justifyContent='between'>
                    <Grid direction='column'>
                      <Text variant='base' weight='medium'>
                        {getAssetName(event)}
                      </Text>
                      <Text color='typography-secondary' variant='sm' weight='medium'>
                        {event.device?.deviceId ?? '–'}
                      </Text>
                    </Grid>
                    {/* <KickerContainer kickers={[`–`]} /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box className={styles['map-wrapper']}>
                <LocationSchemaMini asset={event.asset} device={event.device} event={event} />
              </Box>
            </Grid>
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t('location.location.label', 'Location', 'Location title.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {userContactInfo.map((item) => (
                      <ListItem dense disablePaddingX key={item.kicker}>
                        <ListItemIcon>
                          <Icon color='secondary' size='lg' variant='tint'>
                            {item.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText disableGutters>
                          <Headline reverse size='sm' subtitle={item.kicker} title={item.title ?? '–'} />
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {event.asset && (
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Grid direction='column'>
                  <Grid item>
                    <ListSubheader disableGutters>Class</ListSubheader>
                  </Grid>
                  <Grid item>
                    <Stack direction='row'>
                      <Chip>{event.asset.assetId}</Chip>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )} */}
          {/* <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>Assignee</ListSubheader>
                </Grid>
                <Grid item>
                  <Stack direction='row'>
                    <Chip>Managers</Chip>
                    <Chip>B2 Nurses</Chip>
                    <Chip>Therapy Nurces</Chip>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
        </Scrollbar>
      </CardContent>
    </>
  );
};
