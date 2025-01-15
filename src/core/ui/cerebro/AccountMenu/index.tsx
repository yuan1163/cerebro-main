import React from 'react';
//#region storages
import { observer } from 'mobx-react';
import { useAuth } from '@core/storages/auth';
//#endregion

//#region utils

import { t } from '@core/utils/translate';

//#endregion
//#region styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

//#endregion
//#region components
import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { Chip } from '@core/ui/components/Chip';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemText } from '@core/ui/components/ListItemText';
import { Skeleton } from '@core/ui/components/Skeleton';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
//#endregion
//#region images
//import mock from '@core/ui/organisms/Header/UserInfo/mock.png';
import { useAvatar } from '@core/storages/controllers/users';
//#endregion

type Props = {
  className?: string;
};

export const AccountMenu: React.FC<Props> = observer(({ className }) => {
  const auth = useAuth();
  const profile = auth.profile;
  const avatar = useAvatar(profile);

  if (!profile) {
    return <Skeleton />;
  }

  return (
    <div className={className}>
      <Card variant='outlined' className={styles['account']}>
        <Grid direction='column' className={styles['avatar-container']}>
          <Avatar
            className={styles.avatar}
            firstName={profile.firstName}
            lastName={profile.lastName}
            rounded
            src={avatar.getUrl()}
            size='4xl'
          />
          <Text className={styles['title']} component='h2'>{`${profile.firstName} ${profile.lastName}`}</Text>
          <Text className={styles['subtitle']} component='span'>
            {profile.jobTitle}
          </Text>
        </Grid>
        <Divider />
        <Grid direction='column' className={styles['content-container']}>
          <List className={styles['list']}>
            <ListItem disablePadding>
              <ListItemText>
                <Text className={styles['title']} component='span'>
                  {t('user.roles.label', 'Roles', 'User roles.')}
                </Text>
                <Text
                  className={styles['subtitle']}
                  component='span'
                  // title={profile.role ? profile.role.description : '–'}
                >
                  {profile.role ? profile.role.name : '–'}
                </Text>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText>
                <Text className={styles['title']} component='span'>
                  {t('general.phone.label', 'Phone', 'Phone.')}
                </Text>
                <Text className={styles['subtitle']} component='span'>
                  {profile.phone || '–'}
                </Text>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText>
                <Text className={styles['title']} component='span'>
                  {t('general.email.label', 'Email', 'Email.')}
                </Text>
                <Text className={styles['subtitle']} component='span'>
                  {profile.email || '–'}
                </Text>
              </ListItemText>
            </ListItem>
            {/* <ListItem disablePadding>
                            <ListItemText>
                                <span className={styles['title']}>
                                    {t(
                                        'user.groups.label',
                                        'Groups',
                                        'Label for user`s Groups'
                                    )}
                                </span>
                                <Stack
                                    direction='row'
                                    className={styles['chips-container']}
                                >
                                    {dummyChips.map((dummyItem, i) => (
                                        <Chip key={i}>{dummyItem.label}</Chip>
                                    ))}
                                </Stack>
                            </ListItemText>
                        </ListItem> */}
          </List>
          <Button className={styles['button']} fullWidth onClick={() => auth.logout()} variant='solid'>
            {t('login.signOutButton.label', 'Sign Out', 'Label for Sign Out button.')}
          </Button>
        </Grid>
      </Card>
    </div>
  );
});

// const dummyChips = [{ label: 'Supervisors' }, { label: 'Security' }];
