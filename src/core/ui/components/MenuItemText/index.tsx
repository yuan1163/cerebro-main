import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/MenuItem/styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  disableGutters?: boolean;
  header?: boolean;
  shrink?: boolean;
  subtitle?: string;
  title?: string;
  titleFontWeight?: 'medium' | 'semibold';
} & React.HTMLAttributes<HTMLElement>;

export const MenuItemText: React.FC<Props> = ({
  children,
  className,
  disableGutters = false,
  header,
  shrink = false,
  subtitle,
  title,
  titleFontWeight = 'medium',
  ...props
}) => {
  return (
    <div className={cn(styles['menu-item-text'], shrink && styles['menu-item-text-shrink'], className)} {...props}>
      {title && (
        <div className={styles['menu-item-text-content']}>
          {title && (
            <Text
              className={cn(styles['title'], styles[`title-font-weight-${titleFontWeight}`])}
              component='span'
              variant='sm'
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className={styles['subtitle']} component='span' variant='sm'>
              {subtitle}
            </Text>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
