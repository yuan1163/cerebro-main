import React from 'react';

// utils

import { t } from '@core/utils/translate';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User } from '@core/api/types';

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

// icons

import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
import User01Icon from '@assets/icons/line/user-01.svg?component';

function UsersList({ item }: any) {
  return (
    <DataGridRow key={item.id} className={styles['data-grid-members']}>
      {/* AVATAR */}

      <DataGridCell>
        <DataGridIconCellContent
          startIcon={<Avatar firstName={item.firstName} rounded src={item.avatar} />}
          title={`${item.firstName} ${item.lastName}`}
        />
      </DataGridCell>

      {/* MENU */}

      <DataGridCell variant='icon'>
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
                <MenuItemButton onClick={() => ''} startIcon={<User01Icon />}>
                  <MenuItemText
                    title={t(
                      'user.groupDescriptionInputVerification.label',
                      'You must enter description of group.',
                      'Input description of group for verification.',
                    )}
                  />
                </MenuItemButton>
              </MenuItem>
              <MenuItem>
                <MenuItemButton
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
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
                <MenuItemButton onClick={() => ''} startIcon={<Trash01LineIcon />}>
                  <MenuItemText
                    title={t('user.removeFromGroup.label', 'Remove from group', 'Remove user from group.')}
                  />
                </MenuItemButton>
              </MenuItem>
            </MenuList>
          </Menu>
        </DataGridCellContent>
      </DataGridCell>
    </DataGridRow>
  );
}

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  group?: ElementOf<UserGroupsQuery['userGroups']>;
} & React.HTMLAttributes<HTMLElement>;

export const GroupProfile: React.FC<Props> = ({ className, group, handleEditProfile, ...props }) => {
  // expanded table
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='stretch'>
            <Icon color='primary' className={styles['avatar']} size='3xl' variant='tint'>
              <FolderSolidIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={group?.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                subtitle={group?.description ?? '–'}
                size='xxl'
              />
              <KickerContainer kickers={[group?.users.length]} />
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item grow>
                <Button fullWidth onClick={handleEditProfile} variant='outlined'>
                  {t('user.editGroup.label', 'Edit Group', 'Edit user group.')}
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
                      <MenuItemButton onClick={() => ''} startIcon={<LayersThree01LineIcon />}>
                        <MenuItemText
                          title={t(
                            'location.changelocations.label',
                            'Change locations',
                            'Action of switching the geographical positions.',
                          )}
                        />
                      </MenuItemButton>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemButton
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
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
                      <MenuItemButton onClick={() => ''} startIcon={<Trash01LineIcon />}>
                        <MenuItemText
                          title={t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
                        />
                      </MenuItemButton>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t('location.locations.label', 'Locations', 'Locations.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    <Stack direction='row'>
                      <Chip>{t('general.notAvailable.label', 'n/a', 'Not Available.')}</Chip>
                    </Stack>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid direction='column' grow>
                <Grid item>
                  <ListSubheader disableGutters>{t('user.members.label', 'Members', 'Group members.')}</ListSubheader>
                </Grid>
                <DataGrid disableLastBorder size='sm'>
                  <DataGridBody>
                    {group?.users.slice(0, 3).map((item) => (
                      <UsersList item={item} />
                    ))}
                    {!open && group?.users.slice(3).map((item) => <UsersList key={item.id} item={item} />)}
                  </DataGridBody>
                </DataGrid>
                {group?.users && group?.users?.length >= 4 && (
                  <Button fullWidth onClick={handleClick} variant='outlined'>
                    {open
                      ? t('general.seeMore.label', 'See More', 'See more button or link.')
                      : t('general.collapse.label', 'Collapse', 'Collapse button.')}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
    </>
  );
};
