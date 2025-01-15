import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { IconButton } from '@core/ui/components/IconButton';
import { Modal } from '@core/ui/components/Modal';
import { SeverityIcon } from '@core/ui/components/SeverityIcon';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  maxUsers?: number;
  onClose?: () => void;
  open?: boolean;
  severity?: SeverityPalette;
  users?: number;
} & React.HTMLAttributes<HTMLElement>;

export const MaxUsersModal: React.FC<Props> = ({ children, className, onClose, open, maxUsers, users, severity }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card width='modal'>
        <CardHeader
          action={
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              color='icon-secondary'
              onClick={onClose}
              size='lg'
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          }
          className='card-header'
          disablePaddingBottom
          size='sm'
        >
          <div className={styles['card-header-content']}>
            <SeverityIcon severity={severity} />
            {severity === 'warning' && (
              <Text variant='lg' weight='semibold'>
                {t(
                  'user.userLimitAlmostReached.label',
                  'User limit almost reached',
                  'Description for an alert message providing details on nearing the user limit.',
                )}
              </Text>
            )}
            {severity === 'error' && (
              <Text variant='lg' weight='semibold'>
                {t(
                  'user.userLimitReached.label',
                  'Users limit reached',
                  'Description for an alert message indicating the maximum user limit has been reached and no additional users can be added.',
                )}
              </Text>
            )}
          </div>
        </CardHeader>
        <CardContent className={styles['card-content']} size='sm'>
          <Card color='surface-02'>
            <CardContent className={styles['alert-container']} size='xs'>
              <Text variant='sm'>{t('user.currentLimitUsage.label', 'Current limit usage', 'Current limit.')}:</Text>
              <Text variant='sm'>
                <strong>{users}</strong>{' '}
                <span>{t('general.ofPreposition.label', 'of', 'Preposition indicating belonging.')}</span>{' '}
                <strong>{maxUsers}</strong>{' '}
                <span>
                  {t(
                    'user.usersPlural.label',
                    'users',
                    'Label for the plural form of user, indicating multiple individuals.',
                  )}
                </span>
              </Text>
            </CardContent>
          </Card>
          {severity === 'warning' && (
            <>
              <Text color='typography-secondary' variant='sm'>
                {t(
                  'user.userLimitModalcaption01.label',
                  'The user limit may be reached soon, and new user additions will be restricted once the maximum limit is reached. You can either delete an existing user or increase the limit',
                  'Description for an alert message providing details on nearing the user limit.',
                )}
                .
              </Text>
              <Text color='typography-secondary' variant='sm'>
                {t(
                  'user.userLimitModalcaption02.label',
                  'For assistance in increasing the limit, please contact sales',
                  'Description for an alert message providing details on nearing the user limit.',
                )}
                .
              </Text>
            </>
          )}
          {severity === 'error' && (
            <>
              <Text color='typography-secondary' variant='sm'>
                {t(
                  'user.userLimitModalcaption03.label',
                  'Sorry, you can’t add new users, because you have reached the maximum users limit. You can either delete an existing user or increase limit',
                  'Description for an alert message indicating the maximum user limit has been reached and no additional users can be added.',
                )}
                .
              </Text>
              <Text color='typography-secondary' variant='sm'>
                {t(
                  'user.userLimitModalcaption02.label',
                  'For assistance in increasing the limit, please contact sales',
                  'Description for an alert message providing details on nearing the user limit.',
                )}
                .
              </Text>
            </>
          )}
        </CardContent>
        <CardActions borderTop>
          <div className={styles['actions-container']}>
            <Button onClick={onClose} variant='outlined'>
              {t('general.closeButton.label', 'Close', 'Close button.')}
            </Button>
          </div>
        </CardActions>
      </Card>
    </Modal>
  );
};
