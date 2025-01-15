import React from 'react';

// types

import { ColorPalette, PaletteString } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  color?: 'default' | ColorPalette | PaletteString;
  label?: boolean;
  size?: 'sm' | 'md' | 'lg';
  totalValue?: number;
  totalValueCaption?: string;
  value?: number;
  valueCaption?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ProgressBar: React.FC<Props> = ({
  className,
  color = 'violet',
  label = false,
  size = 'md',
  totalValue = 1,
  totalValueCaption,
  value = 0,
  valueCaption,
  ...props
}) => {
  const progressBarWidth = Math.floor((value * 100) / totalValue);
  return (
    <div className={styles['progress-bar-wrapper']}>
      <div
        className={cn(
          styles['progress-bar'],
          styles[`progress-bar-track-color-${color}`],
          styles[`progress-bar-track-size-${size}`],
          className,
        )}
        {...props}
        role='progressbar'
      >
        <span
          className={cn(
            styles['progress-bar-progress'],
            styles[`progress-bar-progress-color-${color}`],
            styles[`progress-bar-progress-size-${size}`],
          )}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
      {label && (
        <div className={styles['label-wrapper']}>
          <div className={styles['label-text-wrapper']}>
            <Text variant='xs' weight='bold'>
              {value}
            </Text>
            <Text color='secondary' variant='xs' weight='medium'>
              {valueCaption}
            </Text>
          </div>
          <div className={styles['label-text-wrapper']}>
            <Text variant='xs' weight='bold'>
              {totalValue - value}
            </Text>
            <Text color='secondary' variant='xs' weight='medium'>
              {totalValueCaption}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
