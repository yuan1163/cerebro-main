import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { SeverityPalette, SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Alert } from '@core/ui/components/Alert';

type Props = {
  className?: string;
  color?: SeverityPalette;
  maxUsers?: number;
  onAction?: () => void;
  onClose?: () => void;
  severity?: SeverityPalette;
  users?: number;
} & React.HTMLAttributes<HTMLElement>;

export const MaxUsersAlert: React.FC<Props> = ({
  children,
  className,
  onClose,
  onAction,
  maxUsers,
  users,
  color,
  severity,
}) => {
  return (
    <Alert
      action={t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.')}
      color={color}
      onAction={onAction}
      severity={severity}
      variant='single-row'
    >
      <span>
        {severity === 'warning' &&
          t(
            'user.userLimitAlmostReached.label',
            'User limit almost reached',
            'Description for an alert message providing details on nearing the user limit.',
          ) + '.'}
        {severity === 'error' &&
          t(
            'user.userLimitReached.label',
            'Users limit reached',
            'Description for an alert message indicating the maximum user limit has been reached and no additional users can be added.',
          ) + '.'}
      </span>{' '}
      <span>{t('user.currentLimitUsage.label', 'Current limit usage', 'Current limit.') + ':'}</span>{' '}
      <strong>{users}</strong>{' '}
      <span>{t('general.ofPreposition.label', 'of', 'Preposition indicating belonging.')}</span>{' '}
      <strong>{maxUsers}</strong>{' '}
      <span>
        {t('user.usersPlural.label', 'users', 'Label for the plural form of user, indicating multiple individuals.') +
          '.'}
      </span>
    </Alert>
  );
};
