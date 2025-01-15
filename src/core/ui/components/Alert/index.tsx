import React from 'react';

// types

import { BrandPalette, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// utils

import { capitalizeFirstLetterOnly } from '@core/utils/capitalizeFirstLetter';
import { t } from '@core/utils/translate';

// components

import { Button } from '@core/ui/components/Button';
import { IconButton } from '@core/ui/components/IconButton';
import { SeverityIcon } from '@core/ui/components/SeverityIcon';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  action?: string;
  className?: string;
  color?: BrandPalette | SeverityPalette;
  onAction?: () => void;
  onClose?: () => void;
  severity?: SeverityPalette;
  title?: string;
  variant?: 'single-row';
} & React.HTMLAttributes<HTMLElement>;

function AlertButton({ action, color, onAction }: Props) {
  return (
    <Button color={color} onClick={onAction} variant='text'>
      {action}
    </Button>
  );
}

export const Alert: React.FC<Props> = ({
  action,
  children,
  className,
  color = 'trivial',
  onAction,
  onClose,
  severity,
  title,
  variant,
}) => {
  const isSingleRow = variant === 'single-row';
  return (
    <div
      className={cn(
        styles['alert-container'],
        isSingleRow && styles['alert-container-single-row'],
        styles[`alert-container-color-${color}`],
        className,
      )}
      role='alert'
    >
      <div className={styles['severity-icon-container']}>
        <SeverityIcon className={styles['severity-icon']} severity={severity} />
      </div>
      <div className={styles['alert-content']}>
        {title && (
          <Text
            className={cn(styles['title'], styles[`title-color-${color}`])}
            component='div'
            variant='sm'
            weight='semibold'
          >
            {capitalizeFirstLetterOnly(title)}
          </Text>
        )}
        {children && (
          <Text className={cn(styles['content'], styles[`content-color-${color}`])} variant='sm'>
            {children}
          </Text>
        )}
        {!isSingleRow && action && (
          <div className={styles['button-container']}>
            <AlertButton action={action} color={color} onAction={onAction} />
          </div>
        )}
      </div>
      <div className={styles['action-container']}>
        {isSingleRow && action && <AlertButton action={action} color={color} onAction={onAction} />}
        {onClose && (
          <IconButton
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            color={color}
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
