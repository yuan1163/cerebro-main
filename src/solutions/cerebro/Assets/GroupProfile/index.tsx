import React from 'react';
import { useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';

// storages

import { useAssetGroup } from '@core/storages/controllers/assetGroups';
import { useAuth } from '@core/storages/auth';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { Asset, AssetGroup } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { DataGrid } from '@core/ui/components/DataGrid';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';
import { DataGridIconCellContent } from '@core/ui/components/DataGridIconCellContent';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { KickerContainer } from '@core/ui/components/Kicker/KickerContainer';
import { List } from '@core/ui/components/List';
import { ListDivider } from '@core/ui/components/ListDivider';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
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

import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import LineChartUp04Icon from '@assets/icons/line/line-chart-up-04.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

function DevicesList({ asset }: { asset: Asset }) {
  const navigate = useNavigate();
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
      <DataGridRow disableHover className={styles['data-grid-members']}>
        <DataGridCell disableGutters>
          <DataGridIconCellContent
            startIcon={<Avatar src={asset.files?.[0].url} size='sm' stillLife />}
            title={asset.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
          />
        </DataGridCell>

        {/* MENU */}

        <DataGridCell disableGutters>
          <DataGridCellContent>
            <Menu
              button={
                <IconButton
                  ariaLabel={t('general.menu.label', 'Menu', 'User Interface Navigation Menu.')}
                  component='div'
                  variant='text'
                >
                  <DotsVerticalLineIcon />
                </IconButton>
              }
              placement='bottom-end'
            >
              <MenuList>
                <MenuItem>
                  <MenuItemButton
                    onClick={() => navigate(`../../asset/${asset.assetId}`)}
                    startIcon={<LineChartUp04Icon />}
                  >
                    <MenuItemText title={t('asset.viewAsset.label', 'View asset', 'Navigate to the asset.')} />
                  </MenuItemButton>
                </MenuItem>
                {/* TODO */}
                {/* <MenuItem>
                  <MenuItemButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}${`/cerebro/assets/asset/${asset.assetId}`}`,
                      ),
                        handleShowSnackbar();
                    }}
                    startIcon={<Copy04LineIcon />}
                  >
                    <MenuItemText title='Copy link to Asset' />
                  </MenuItemButton>
                </MenuItem> */}
                {hasEditRights && (
                  <>
                    <ListDivider />
                    <MenuItem>
                      <MenuItemButton onClick={() => ''} startIcon={<Trash01LineIcon />} disabled>
                        <MenuItemText
                          title={t('asset.removeFromClass.label', 'Remove from class', 'Remove asset from class.')}
                        />
                      </MenuItemButton>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </DataGridCellContent>
        </DataGridCell>
      </DataGridRow>
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
}

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  // TODO any
  group?: any;
  devicesGroup?: any;
} & React.HTMLAttributes<HTMLElement>;

export const GroupProfile: React.FC<Props> = ({ className, group, handleEditProfile, ...props }) => {
  const controller = useAssetGroup(group);
  const navigate = useNavigate();
  // expanded table
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  // remove
  const remove = async () => {
    await controller.remove();
    navigate('..');
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
        title={t('asset.editClass.label', 'Edit class', 'Adjusting class configuration.')}
        disablePaddingBottom
      />

      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            {/* <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>Locations</ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    <Stack direction='row'>
                      <Chip
                        component={Link}
                        to={`../../locations/${group.locationId}`}
                      >{group.locationId}</Chip>
                    </Stack>
                  </List>
                </Grid>
              </Grid>
            </Grid> */}

            <Grid item>
              <Grid container direction='column' spacing={4}>
                <Grid item alignItems='stretch'>
                  <Icon className={styles['avatar']} color={group?.style} size='4xl' variant='tint'>
                    <FolderSolidIcon />
                  </Icon>
                  <Grid direction='column' justifyContent='between'>
                    <Headline
                      title={group?.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      subtitle={group?.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      size='xxl'
                    />
                    <KickerContainer
                      kickers={[
                        `${group?.assetsCount} ${
                          group?.assetsCount === 1
                            ? t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')
                            : t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.')
                        }`,
                      ]}
                    />
                  </Grid>
                </Grid>
                {hasEditRights && (
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item grow>
                        <Button fullWidth onClick={handleEditProfile} variant='outlined'>
                          {t('asset.editClass.label', 'Edit class', 'Adjusting class configuration.')}
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
                                <MenuItemText title={t('asset.deleteClass.label', 'Delete class', 'Delete class.')} />
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

            {controller?.getAssets() && controller.getAssets()!.length > 0 && (
              <Grid item>
                <Grid direction='column' grow>
                  <Grid item>
                    <ListSubheader disableGutters>
                      {t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')}
                    </ListSubheader>
                  </Grid>
                  <DataGrid disableBorder size='sm'>
                    <DataGridBody>
                      {controller.getAssets()?.map((asset, index) => (
                        <DevicesList key={index} asset={asset} />
                      ))}
                      {!open &&
                        controller
                          .getAssets()
                          ?.slice(3)
                          .map((asset, index) => <DevicesList key={index} asset={asset} />)}
                    </DataGridBody>
                  </DataGrid>
                  {/* {controller?.getAssets() && controller.getAssets()!.length >= 4 && (
                    <Button fullWidth onClick={handleClick} variant='outlined'>
                      {open ? 'See More' : 'Collapse'}
                    </Button>
                  )} */}
                </Grid>
              </Grid>
            )}
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
