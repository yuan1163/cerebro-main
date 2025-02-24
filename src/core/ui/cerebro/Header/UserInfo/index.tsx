import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import ThemeContext from '@app/ThemeAdapter/ThemeContext';

// storages

import { useAuth } from '@core/storages/auth';
import { useAvatar } from '@core/storages/controllers/users';

// translations draft

import { DataSelect } from '@core/ui/components/DataSelect';
import { useTranslation } from '@core/storages/translation';
import { observer } from 'mobx-react';
import { languages } from '@core/utils/translations/config';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { IconButton } from '@core/ui/components/IconButton';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemHeader } from '@core/ui/components/MenuItemHeader';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { Modal } from '@core/ui/components/Modal';
import { Skeleton } from '@core/ui/components/Skeleton';
import { Switch } from '@core/ui/components/Switch';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';
import LogOut01LineIcon from '@assets/icons/line/log-out-01.svg?component';
import Moon01LineIcon from '@assets/icons/line/moon-01.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';
import Translate01LineIcon from '@assets/icons/line/translate-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

export const UserInfo = observer(() => {
  const auth = useAuth();
  const profile = auth.profile;
  const avatar = useAvatar(profile);
  if (!profile) {
    return <Skeleton />;
  }

  // theme

  const { currentTheme, changeCurrentTheme } = React.useContext(ThemeContext);

  const onSwitchChange = () => {
    changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  // LANGUAGE

  const [languageModalOpen, setLanguageModalOpen] = React.useState<boolean>(false);

  // translations draft

  const translation = useTranslation();

  return (
    <>
      <Menu
        button={
          <Avatar rounded size='lg' src={avatar.getUrl()} firstName={profile.firstName} lastName={profile.lastName} />
        }
        rounded
        placement='bottom-end'
      >
        <MenuList component='div' width={64}>
          <MenuItemHeader>
            <Avatar rounded size='xl' src={avatar.getUrl()} />
            <MenuItemText title={`${profile.firstName} ${profile.lastName}`} subtitle={profile.jobTitle} />
          </MenuItemHeader>
          <ListDivider />
          {/* <MenuItem>
            <MenuItemButton disabled startIcon={<Settings01LineIcon />}>
              <MenuItemText title='Settings' />
            </MenuItemButton>
          </MenuItem> */}

          <MenuItem>
            <MenuItemButton
              onClick={onSwitchChange}
              startIcon={<Moon01LineIcon />}
              action={<Switch onChange={onSwitchChange} isChecked={currentTheme === 'dark' ? true : false} />}
            >
              <MenuItemText
                title={t(
                  'theme.dark.label',
                  'Dark mode',
                  'This string is used for the option to enable the dark theme in the app.',
                )}
              />
            </MenuItemButton>
          </MenuItem>

          {/* MODAL */}
          {/*
          <MenuItem>
            <MenuItemButton>
              <DataSelect
                label={t(
                  'general.language.label',
                  'Language',
                  'Specific language in which the UI is presented to the user.',
                )}
                present={(value) => value}
                options={languages}
                value={translation.language}
                onChange={(value) => translation.setLanguage(value)}
              />
            </MenuItemButton>
          </MenuItem> */}

          <MenuItem>
            <MenuItemButton
              onClick={() => setLanguageModalOpen(true)}
              shortcut={languages.find((item) => item.id === translation.language)?.name}
              startIcon={<Translate01LineIcon />}
            >
              <MenuItemText
                title={t(
                  'general.language.label',
                  'Language',
                  'Specific language in which the UI is presented to the user.',
                )}
              />
            </MenuItemButton>
          </MenuItem>

          <ListDivider />
          <MenuItem>
            <MenuItemButton startIcon={<LogOut01LineIcon />} onClick={() => auth.logout()}>
              <MenuItemText title={t('login.signOutButton.label', 'Sign Out', 'Label for Sign Out button.')} />
            </MenuItemButton>
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal open={languageModalOpen} onClose={() => setLanguageModalOpen(false)}>
        <Card width={29}>
          <CardHeader
            action={
              <IconButton
                ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
                color='icon-secondary'
                onClick={() => setLanguageModalOpen(false)}
                size='lg'
                variant='text'
              >
                <XCloseLineIcon />
              </IconButton>
            }
            borderBottom
            headerContentSize='sm'
            size='sm'
            title={t('general.selectLanguage.label', 'Select Language', 'Choose a language from the list.')}
          />
          <CardContent size='xxs'>
            {/* 語言列表 */}
            <MenuList disablePadding>
              {languages.map((language) => (
                <MenuItem key={language.id} disablePadding>
                  <MenuItemButton
                    active={translation.language === language.id}
                    endIcon={translation.language === language.id ? <CheckLineIcon /> : null}
                    onClick={() => translation.setLanguage(language.id)}
                  >
                    <MenuItemText titleFontWeight='medium' title={language.name} subtitle={language.localName} />
                  </MenuItemButton>
                </MenuItem>
              ))}
            </MenuList>
          </CardContent>
          {/* <CardActions borderTop>
            <div className='flex justify-end gap-2'>
              <Button onClick={() => setLanguageModalOpen(false)} variant='outlined'>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
              <Button onClick={() => setLanguageModalOpen(false)} variant='solid'>
                {t('general.applyButton.label', 'Apply', 'Confirms the selected choices.')}
              </Button>
            </div>
          </CardActions> */}
        </Card>
      </Modal>
    </>
  );
});
