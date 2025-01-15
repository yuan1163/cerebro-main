import React from 'react';

// types

import { PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { Text } from '@core/ui/components/Text';
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Components

type Props = {
  className?: string;
  reverse?: boolean;
  severity?: SeverityPalette | PaletteString;
  size?: 'xs' | 'sm' | 'md' | 'dataGrid' | 'lg' | 'xl' | 'xxl';
  subtitle?: string | React.ReactNode;
  title?: string;
  chip?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Headline: React.FC<Props> = ({
  children,
  className,
  reverse = false,
  size,
  severity,
  subtitle,
  title,
  chip,
  ...props
}) => {
  return (
    <>
      <div
        className={cn(
          reverse && styles[`headline-reverse`],
          styles['headline'],
          styles[`headline-${size}`],
          styles[`headline-severity-${severity}`],
          className,
        )}
        {...props}
      >
        {title && (
          <Text variant='md' weight='medium'>
            {title}
          </Text>
        )}

        {chip && <span>{chip}</span>}

        {subtitle && (
          <Text color='typography-secondary' variant='sm'>
            {subtitle}
          </Text>
        )}
      </div>
    </>
  );
};
