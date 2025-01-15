import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// storages

import { useAsset } from '@core/storages/controllers/assets';
import { useAuth } from '@core/storages/auth';

// types

import { Asset } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Battery } from '@core/ui/components/Kicker/Battery';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { KickerContainer } from '@core/ui/components/Kicker/KickerContainer';
import { Link } from 'react-router-dom';
import { List } from '@core/ui/components/List';
import { ListDivider } from '@core/ui/components/ListDivider';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemIconHeadline } from '@core/ui/components/ListItemIconHeadline';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { OnlineStatus } from '@core/ui/components/Kicker/OnlineStatus';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Toast } from '@core/ui/components/Toast';

// icons

import BankNote03LineIcon from '@assets/icons/line/bank-note-03.svg?component';
import Building02LineIcon from '@assets/icons/line/building-02.svg?component';
import CalendarLineIcon from '@assets/icons/line/calendar.svg?component';
import ClockIcon from '@assets/icons/line/clock.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import File05LineIcon from '@assets/icons/line/file-05.svg?component';
import Key01LineIcon from '@assets/icons/line/key-01.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import LineChartUp04Icon from '@assets/icons/line/line-chart-up-04.svg?component';
import Mail01Icon from '@assets/icons/line/mail-01.svg?component';
import PhoneLineIcon from '@assets/icons/line/phone.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

type Props = {
  className?: string;
  handleEditAsset?: () => void;
  asset: Asset;
} & React.HTMLAttributes<HTMLElement>;

export const Profile: React.FC<Props> = ({ className, asset, handleEditAsset, ...props }) => {
  const detailsArray = [
    // {
    //   icon: <TrackerLineIcon />,
    //   kicker: 'Tracker ID',
    //   title: asset?.assetUid || '–',
    // },
    {
      icon: <File05LineIcon />,
      kicker: t('asset.assetDescriptionInput.label', 'Description', 'Field for asset description.'),
      title: asset?.description || '–',
    },

    {
      icon: <Building02LineIcon />,
      kicker: t('asset.manufacturer.label', 'Manufacturer', "Device's manufacturer."),
      title: asset?.manufacturer || '–',
    },
    {
      icon: <BankNote03LineIcon />,
      kicker: t('asset.costRange.label', 'Cost Range', 'Cost range of device.'),
      title: asset?.costRange || '–',
    },
  ];

  const locationsArray = [
    {
      icon: <ZoneLineIcon />,
      kicker: t('location.current.label', 'Current', 'Current location.'),
      title: asset?.location.name || '–',
    },
    // {
    //   icon: <ZoneLineIcon />,
    //   kicker: 'Designated',
    //   title: '–',
    // },
  ];

  // delete asset

  const navigate = useNavigate();

  const controller = useAsset(asset);

  const remove = async () => {
    await controller.remove();
    navigate('../asset');
  };

  // snackbar

  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const handleShowSnackbar = () => {
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2500);
  };

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Assets);

  return (
    <>
      <CardHeader
        disablePaddingBottom
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
        title={t('asset.assetDetails.label', 'Asset Details', 'Asset details.')}
      />
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container direction='column' spacing={4}>
                <Grid item>
                  <Grid alignItems='stretch'>
                    <Avatar className={styles['avatar']} size='4xl' src={asset.files?.[0].url} stillLife />
                    <Grid direction='column' justifyContent='between'>
                      <Headline title={asset?.name} subtitle={asset?.serialNumber} size='xxl' />
                      <KickerContainer kickers={['–']} />
                      {/* <KickerContainer kickers={[<OnlineStatus online />]} /> */}
                    </Grid>
                  </Grid>
                </Grid>

                {hasEditRights && (
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item grow>
                        <Button fullWidth onClick={handleEditAsset} variant='outlined'>
                          {t('asset.editAsset.label', 'Edit asset', 'Adjusting asset configuration.')}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Menu
                          button={
                            <IconButton
                              ariaLabel={t('general.menu.label', 'Menu', 'User Interface Navigation Menu.')}
                              component='div'
                              variant='outlined'
                            >
                              <DotsVerticalLineIcon />
                            </IconButton>
                          }
                          placement='bottom-end'
                        >
                          <MenuList>
                            <MenuItem>
                              <MenuItemButton
                                onClick={() => {
                                  navigator.clipboard.writeText(window.location.href), handleShowSnackbar();
                                }}
                                startIcon={<Copy04LineIcon />}
                              >
                                <MenuItemText
                                  title={t(
                                    'general.copyLink.label',
                                    'Copy link',
                                    'Action that allows to duplicate a web link or URL.',
                                  )}
                                />
                              </MenuItemButton>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem>
                              <MenuItemButton onClick={remove} startIcon={<Trash01LineIcon />}>
                                <MenuItemText title={t('asset.deleteAsset.label', 'Delete asset', 'Delete asset.')} />
                              </MenuItemButton>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t('asset.assetDetails.label', 'Asset Details', 'Asset details.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {detailsArray.map((item, index) => (
                      <ListItemIconHeadline
                        key={index}
                        icon={item.icon}
                        subtitle={item.kicker}
                        title={item.title ?? '–'}
                      />
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t('location.zone.label', 'Zone', 'Specific area that is defined for a particular purpose.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <Grid container direction='column'>
                    {locationsArray.map((item, index) => (
                      <ListItemIconHeadline
                        key={index}
                        icon={item.icon}
                        subtitle={item.kicker}
                        title={item.title ?? '–'}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {asset?.groups && asset?.groups?.length > 0 && (
              <Grid item>
                <Grid direction='column'>
                  <Grid item>
                    <ListSubheader disableGutters>
                      {t('asset.classes.label', 'Classes', 'Categories of assets.')}
                    </ListSubheader>
                  </Grid>
                  <Grid item>
                    <List>
                      <ListItem dense disablePaddingX>
                        <Stack direction='row'>
                          {/* TODO any */}
                          {asset?.groups?.map((asset: any, index) => (
                            <Grid item key={index}>
                              <Chip color={asset.style} component={Link} to={`../../group/${asset.groupId}`} uppercase>
                                {asset.name}
                              </Chip>
                            </Grid>
                          ))}
                        </Stack>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t('asset.assignee.label', 'Assignee', 'The person responsible for a specific device.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <Text color='typography-tertiary' variant='sm'>
                    {t(
                      'asset.noSPBCaption.label',
                      'There are no SPB here yet. Add SPB to this campus first by uploading a Mass Configuration file.',
                      'No SPB caption.',
                    )}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
      <Toast
        isShowing={snackOpen}
        message={t(
          'general.copyLinkSuccess.label',
          'Copied to clipboard!',
          'Desired content has been successfully copied.',
        )}
      />
    </>
  );
};
