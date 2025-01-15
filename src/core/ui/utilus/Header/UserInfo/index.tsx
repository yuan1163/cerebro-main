import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AccountMenu } from '@core/ui/cerebro/AccountMenu';
import { Avatar } from '@core/ui/components/Avatar';
import { IconButton } from '@core/ui/components/IconButton';
import { Popover, Transition } from '@headlessui/react';
import { Skeleton } from '@core/ui/components/Skeleton';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

// images
//import mock from './mock.png';
import { useAuth } from '@core/storages/auth';
import { useAvatar } from '@core/storages/controllers/users';

export const UserInfo = () => {
  const auth = useAuth();
  const profile = auth.profile;
  const avatar = useAvatar(profile);
  if (!profile) {
    return <Skeleton />;
  }

  return (
    <Popover className={styles.popover}>
      <Popover.Button className={styles['popover-button']}>
        <Avatar firstName={profile.firstName} lastName={profile.lastName} rounded src={avatar.getUrl()} />
      </Popover.Button>
      <Transition
        enter='transition duration-standard ease-in-out-standard'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-standard ease-out-standard'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Popover.Panel className={styles['popover-panel']} static>
          {({ close }) => (
            <>
              <IconButton
                ariaLabel={t('general.closePopover.label', 'Close popover', 'Close popover.')}
                className={styles['popover-close-button']}
                onClick={() => {
                  close();
                }}
                variant='text'
              >
                <XCloseLineIcon />
              </IconButton>
              <AccountMenu />
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
