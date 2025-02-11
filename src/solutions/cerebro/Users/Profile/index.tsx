import { parsePhoneNumber } from 'libphonenumber-js';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User, UserPermissions } from '@core/api/types';

// api

import { UserGroupsQuery, UsersQuery } from '@solutions/utilus/api/generated';

// storages

import { useAuth } from '@core/storages/auth';
import { useUser } from '@core/storages/controllers/users';

// components

import { Avatar } from '@core/ui/components/Avatar';
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
import { OnlineStatus } from '@core/ui/components/Kicker/OnlineStatus';
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
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Toast } from '@core/ui/components/Toast';
import { Link } from 'react-router-dom';

// icons

import CalendarLineIcon from '@assets/icons/line/calendar.svg?component';
import ClockIcon from '@assets/icons/line/clock.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import Key01LineIcon from '@assets/icons/line/key-01.svg?component';
import Mail01Icon from '@assets/icons/line/mail-01.svg?component';
import PasscodeResetLineIcon from '@assets/icons/line/passcode-reset.svg?component';
import PhoneLineIcon from '@assets/icons/line/phone.svg?component';
import ReinviteLineIcon from '@assets/icons/line/reinvite.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  user?: Partial<User>;
} & React.HTMLAttributes<HTMLElement>;

// PHONE

export const Profile: React.FC<Props> = ({ className, handleEditProfile, user, ...props }) => {
  const userContactInfo = [
    {
      icon: <Mail01Icon />,
      kicker: t('general.email.label', 'Email', 'Email.'),
      title: user?.email || '–',
    },
    {
      icon: <PhoneLineIcon />,
      kicker: t('general.phone.label', 'Phone', 'Phone.'),
      title: user?.phone || '–',
    },
    {
      icon: <CalendarLineIcon />,
      kicker: t('user.memberSince.label', 'Member since', 'Joined on.'),
      title: `${moment(user?.creationDate).format('DD MMMM YYYY')}`,
    },
  ];

  // remove account

  const controller = useUser(user!);
  const navigate = useNavigate();

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
        title={t('user.userDetails.label', 'User Details', 'Information about a user.')}
        disablePaddingBottom
      />
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container direction='column' spacing={4}>
                <Grid item alignItems='stretch'>
                  <Avatar
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    className={styles['avatar']}
                    size='4xl'
                    // src={user?.avatar ?? ''}
                    src={user?.files?.[0]?.url ?? ''}
                    />
                  <Grid direction='column' justifyContent='between' fullWidth>
                    <Headline
                      title={`${user?.firstName} ${user?.lastName}` || '–'}
                      subtitle={user?.jobTitle ?? '–'}
                      size='xxl'
                    />
                    <KickerContainer
                      kickers={[
                        `${
                          user?.category === 1
                            ? t('user.admin.label', 'Admin', 'The main controller & manager.')
                            : t('user.contact.label', 'Contact', 'User contact.')
                        }`,
                      ]}
                    />
                  </Grid>
                </Grid>

                <ModalDelete
                  content={`${t(
                    'user.deleteAccountQuestion.label',
                    'Are you sure you want to remove user?',
                    'Confirmation prompt: Delete user profile?',
                  )} ${user?.firstName} ${user?.lastName} ${t(
                    'company.fromCerebroApp.label',
                    'from Cerebro App?',
                    'Refers to the source app.',
                  )}`}
                  open={openDialog}
                  title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
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
                          {t('user.editUser.label', 'Edit User', 'Editing User.')}
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
                            <MenuItem>
                              <MenuItemButton onClick={() => ''} startIcon={<PasscodeResetLineIcon />} disabled>
                                <MenuItemText
                                  title={t(
                                    'general.sendResetPasswordEmail.label',
                                    'Send reset password email',
                                    'A prompt that triggers an email to users for password recovery or change.',
                                  )}
                                />
                              </MenuItemButton>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem>
                              <MenuItemButton onClick={() => setDialogOpen(true)} startIcon={<Trash01LineIcon />}>
                                <MenuItemText
                                  title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
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
                <Grid item>
                  <Grid direction='column'>
                    <Grid item>
                      <ListSubheader disableGutters>
                        {t('user.userDetails.label', 'User Details', 'Information about a user.')}
                      </ListSubheader>
                    </Grid>
                    <Grid item>
                      <List>
                        {userContactInfo.map((item, index) => (
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
                {user?.groups && user?.groups.length > 0 && (
                  <Grid item>
                    <Grid direction='column'>
                      <Grid item>
                        <ListSubheader disableGutters>{t('user.groups.label', 'Groups', 'User groups.')}</ListSubheader>
                      </Grid>
                      <Grid item>
                        <List>
                          <ListItem dense disablePaddingX>
                            <Stack direction='row'>
                              {user?.groups?.map((item: any) => (
                                <Chip
                                  key={item?.groupId}
                                  color={item.style}
                                  component={Link}
                                  to={`../../group/${item.groupId}`}
                                  uppercase
                                >
                                  {item?.name}
                                </Chip>
                              ))}
                            </Stack>
                          </ListItem>
                        </List>
                      </Grid>
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
