import React from 'react';

// types

import { BrandPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// style

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Checkbox/styles.module.scss';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';

type Props = {
  className?: string;
  color?: BrandPalette | SeverityPalette | PaletteString;
  disabled?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | (string & {});
} & Omit<React.HTMLAttributes<HTMLElement>, 'size'>;

export const CheckboxMarker = React.forwardRef<HTMLElement, Props>(
  (
    { children, className, color = 'primary', disabled, isChecked, isIndeterminate, rounded, size = 'md', ...props },
    ref,
  ) => {
    return (
      <span
        className={cn(
          styles['checkbox-wrapper'],
          styles[`checkbox-wrapper-color-${color}`],
          styles[`checkbox-wrapper-size-${size}`],
          disabled && styles['checkbox-wrapper-disabled'],
        )}
      >
        <span
          className={cn(
            styles['checkbox'],
            styles['checkbox-marker'],
            styles[`checkbox-color-${color}`],
            styles[`checkbox-size-${size}`],
            (isChecked || isIndeterminate) && styles['checkbox-checked'],
            disabled && styles['checkbox-disabled'],
            rounded && styles['checkbox-rounded'],
          )}
        >
          {isChecked && <CheckLineIcon className={styles['checkbox-checkmark']} />}
          {isIndeterminate && <MinusLineIcon className={styles['checkbox-checkmark']} />}
        </span>
      </span>
    );
  },
);
