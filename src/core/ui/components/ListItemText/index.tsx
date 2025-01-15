import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  disableGutters?: boolean;
  shrink?: boolean;
  subtitle?: string;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ListItemText: React.FC<Props> = ({
  children,
  className,
  disableGutters = false,
  shrink = false,
  subtitle,
  title,
  ...props
}) => {
  return (
    <div className={cn(styles['list-item-text'], shrink && styles['list-item-text-shrink'], className)} {...props}>
      {title && (
        <div className={styles['list-item-text-content']}>
          {title && (
            <Text
              className={styles['title']}
              component='h5'
              variant='sm'
              weight={title && subtitle ? 'semibold' : 'medium'}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className={styles['subtitle']} component='p' variant='sm' weight='normal'>
              {subtitle}
            </Text>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
