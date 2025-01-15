import React from 'react';

// types

import { BrandPalette, PaletteString, TypographyPalette, SeverityPalette } from '@core/api/typesDesignSystem';

// style

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { ControlLabel } from '@core/ui/components/ControlLabel';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';

type Props = {
  className?: string;
  color?: BrandPalette | SeverityPalette | PaletteString;
  disabled?: boolean;
  indeterminate?: boolean;
  inputId?: string;
  isChecked?: boolean;
  label?: string;
  labelColor?: TypographyPalette | PaletteString;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | (string & {});
  value?: number | string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className,
      color = 'primary',
      disabled = false,
      indeterminate = false,
      inputId,
      isChecked = false,
      label,
      labelColor,
      name,
      onChange,
      readOnly = false,
      required = false,
      rounded = false,
      size = 'md',
      value,
      ...props
    },
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
            styles[`checkbox-color-${color}`],
            styles[`checkbox-size-${size}`],
            isChecked && styles['checkbox-checked'],
            disabled && styles['checkbox-disabled'],
            rounded && styles['checkbox-rounded'],
          )}
          tabIndex={!disabled ? 0 : -1}
        >
          <span className={styles['checkbox-action']}>
            <input
              id={inputId}
              checked={isChecked}
              className={styles['checkbox-input']}
              name={name}
              onChange={onChange}
              readOnly={readOnly}
              ref={ref}
              required={required}
              tabIndex={-1}
              type='checkbox'
              value={value}
              {...props}
            />
          </span>
          {isChecked && !indeterminate && <CheckLineIcon className={styles['checkbox-checkmark']} />}
          {isChecked && indeterminate && <MinusLineIcon className={styles['checkbox-checkmark']} />}
        </span>
        {label && <ControlLabel inputId={inputId} labelColor={labelColor} label={label} size={size} />}
      </span>
    );
  },
);
