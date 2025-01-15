import React from 'react';
import { Navigate, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// api

import { UsersQuery } from '@solutions/utilus/api/generated';
import { UserGroupsQuery } from '@solutions/utilus/api/generated';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User, UserGroup, UserPermissions } from '@core/api/types';

// storages

import { useAuth } from '@core/storages/auth';
import { useUserGroup } from '@core/storages/controllers/userGroups';

// components

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
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { OnlineStatus } from '@core/ui/components/Kicker/OnlineStatus';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Toast } from '@core/ui/components/Toast';
import { UserAvatar } from '@core/ui/cerebro/UserAvatar';

// icons

import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
import User01Icon from '@assets/icons/line/user-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

function UsersList({ item }: any) {
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
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  return (
    <>
      <DataGridRow disableHover className={styles['data-grid-members']} key={item.id}>
        <DataGridCell disableGutters>
          <DataGridIconCellContent
            startIcon={<UserAvatar user={item} rounded size='sm' />}
            title={`${item.firstName} ${item.lastName}`}
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
                  <MenuItemButton onClick={() => navigate(`../../user/${item.userId}`)} startIcon={<User01Icon />}>
                    <MenuItemText
                      title={t(
                        'user.groupDescriptionInputVerification.label',
                        'You must enter description of group.',
                        'Input description of group for verification.',
                      )}
                    />
                  </MenuItemButton>
                </MenuItem>
                {hasEditRights && (
                  <>
                    <ListDivider />
                    <MenuItem>
                      <MenuItemButton onClick={() => ''} startIcon={<Trash01LineIcon />} disabled>
                        <MenuItemText
                          title={t('user.removeFromGroup.label', 'Remove from group', 'Remove user from group.')}
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
  group: UserGroup;
} & React.HTMLAttributes<HTMLElement>;

export const GroupProfile: React.FC<Props> = ({ className, group, handleEditProfile, ...props }) => {
  const controller = useUserGroup(group);
  const navigate = useNavigate();
  const members = controller.getMembers();

  // expanded table
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  // remove group

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
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  // dialogs

  const [openDialog, setDialogOpen] = React.useState(false);

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
        title={t('user.groupDetails.label', 'Group Details', 'User group details.')}
        disablePaddingBottom
      />
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container direction='column' spacing={4}>
                <Grid item alignItems='stretch'>
                  <Icon color={group?.style as any} className={styles['avatar']} size='4xl' variant='tint'>
                    <FolderSolidIcon />
                  </Icon>
                  <Grid direction='column' justifyContent='between'>
                    <Headline title={group?.name ?? '–'} subtitle={group?.description ?? '–'} size='xxl' />
                    <KickerContainer
                      kickers={[
                        `${members && members.length} ${
                          members && members.length === 1
                            ? t('user.member.label', 'Member', 'Group member.')
                            : t('user.members.label', 'Members', 'Group members.')
                        }`,
                      ]}
                    />
                  </Grid>
                </Grid>
                <ModalDelete
                  content={`${t(
                    'user.deleteGroupQuestion.label',
                    'Are you sure you want to remove group?',
                    'Confirmation prompt: Delete group?',
                  )} “${group.name}” ${t(
                    'company.fromCerebroApp.label',
                    'from Cerebro App?',
                    'Refers to the source app.',
                  )}`}
                  open={openDialog}
                  title={t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
                  close={() => {
                    setDialogOpen(false);
                  }}
                  cancel={() => {
                    setDialogOpen(false);
                  }}
                  confirm={() => {
                    remove();
                  }}
                />
                {hasEditRights && (
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
                              <MenuItemButton onClick={() => setDialogOpen(true)} startIcon={<Trash01LineIcon />}>
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
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='column' spacing={2}>
                {members && members.length > 0 && (
                  <Grid item>
                    <Grid direction='column' grow>
                      <Grid item>
                        <ListSubheader disableGutters>
                          {t('user.members.label', 'Members', 'Group members.')}
                        </ListSubheader>
                      </Grid>
                      <DataGrid disableBorder size='sm'>
                        <DataGridBody>
                          {members.map((item) => (
                            <UsersList key={item.userId} item={item} />
                          ))}
                          {/* {!open && group?.users.slice(3).map((item) => <UsersList item={item} />)} */}
                        </DataGridBody>
                      </DataGrid>
                      {/* {group?.users && group?.users?.length >= 4 && (
                    <Button fullWidth onClick={handleClick} variant='outlined'>
                      {open ? 'See More' : 'Collapse'}
                    </Button>
                  )} */}
                    </Grid>
                  </Grid>
                )}
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
