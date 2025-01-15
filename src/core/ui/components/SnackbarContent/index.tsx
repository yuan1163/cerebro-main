import React from 'react';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Paper } from '@core/ui/components/Paper';
import { Text } from '@core/ui/components/Text';

type Props = {
  action?: React.ReactNode;
  message?: React.ReactNode;
  severity?: SeverityPalette | string;
  variant?: 'default' | 'toast';
} & React.HTMLAttributes<HTMLElement>;

export const SnackbarContent: React.FC<Props> = ({
  action,
  className,
  message,
  severity = 'default',
  variant = 'default',
  ...props
}) => {
  return (
    <Paper
      className={cn(
        styles[`snackbar-content`],
        styles[`snackbar-content-${variant}`],
        styles[`snackbar-content-${severity}`],
        className,
      )}
      role='alert'
      {...props}
    >
      <Text className={styles['snackbar-content-message']} color='typography-inverse' variant='sm'>
        {message}
      </Text>
      <div className={styles['snackbar-content-action']}>{action}</div>
    </Paper>
  );
};
