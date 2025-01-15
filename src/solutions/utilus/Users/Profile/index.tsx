import React from 'react';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User } from '@core/api/types';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';

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
import { Link } from 'react-router-dom';
import { List } from '@core/ui/components/List';
import { ListDivider } from '@core/ui/components/ListDivider';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
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

type Props = {
  className?: string;
  list?: UsersQuery['users'];
  handleEditProfile?: () => void;
  user?: ElementOf<UsersQuery['users']>;
  groupList?: UserGroupsQuery['userGroups'];
} & React.HTMLAttributes<HTMLElement>;

export const Profile: React.FC<Props> = ({ className, groupList, handleEditProfile, list, user, ...props }) => {
  const userContactInfo = [
    {
      icon: <Key01LineIcon />,
      kicker: t('user.roleInput.label', 'Role', 'User role input label.'),
      title: user?.role?.name || '–',
    },
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
      title: '–',
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='stretch'>
            <Avatar
              className={styles['avatar']}
              firstName={user?.firstName ?? ''}
              size='4xl'
              src={user?.avatar ?? ''}
            />
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={`${user?.firstName} ${user?.lastName}` || '–'}
                subtitle={user?.jobTitle ?? '–'}
                size='xxl'
              />
              <KickerContainer kickers={['–']} />
              {/* <KickerContainer kickers={[<OnlineStatus online />, '2:15 PM Local Time']} /> */}
            </Grid>
          </Grid>
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
                      variant='outlined'
                    >
                      <DotsVerticalLineIcon />
                    </IconButton>
                  }
                  placement='bottom-end'
                >
                  <MenuList>
                    <MenuItem>
                      <MenuItemButton onClick={() => ''} startIcon={<ReinviteLineIcon />}>
                        <MenuItemText title={t('user.reinviteUser.label', 'Reinvite User', 'A call to rejoin.')} />
                      </MenuItemButton>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemButton onClick={() => ''} startIcon={<PasscodeResetLineIcon />}>
                        <MenuItemText
                          title={t(
                            'general.sendResetPasswordEmail.label',
                            'Send reset password email',
                            'A prompt that triggers an email to users for password recovery or change.',
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
                        <MenuItemText title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')} />
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
                    {t(
                      'general.details.label',
                      'Details',
                      'Details provide in-depth information about a particular subject or topic.',
                    )}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {userContactInfo.map((item, index) => (
                      <ListItem dense disablePaddingX key={index}>
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
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>{t('user.groups.label', 'Groups', 'User groups.')}</ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    <ListItem dense disablePaddingX>
                      <Stack direction='row'>
                        {/* TODO delete any */}
                        {user?.groups?.map((item: any) => (
                          <Chip key={item?.id} color='primary' component={Link} to={`../group/${item.id}`}>
                            {item?.name}
                          </Chip>
                        ))}
                      </Stack>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
    </>
  );
};
