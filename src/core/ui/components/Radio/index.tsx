import React from 'react';

// types

import { BrandPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// style

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { FormControlLabel } from '@core/ui/components/FormControlLabel';

// icons

import RadioDotSolidIcon from '@assets/icons/solid/radio-dot.svg?component';

type Props = {
  className?: string;
  color?: BrandPalette | SeverityPalette | PaletteString;
  disabled?: boolean;
  inputId?: string;
  isChecked?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | (string & {});
  value?: number | string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className,
      color = 'primary',
      disabled = false,
      inputId,
      isChecked = false,
      label,
      name,
      onChange,
      readOnly = false,
      required = false,
      size = 'md',
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        className={cn(
          styles['radio-wrapper'],
          styles[`radio-wrapper-color-${color}`],
          styles[`radio-wrapper-size-${size}`],
          disabled && styles['radio-wrapper-disabled'],
        )}
      >
        <span
          className={cn(
            styles['radio'],
            styles[`radio-color-${color}`],
            styles[`radio-size-${size}`],
            isChecked && styles['radio-checked'],
            disabled && styles['radio-disabled'],
          )}
          tabIndex={!disabled ? 0 : -1}
        >
          <span className={styles['radio-action']}>
            <input
              id={inputId}
              checked={isChecked}
              className={styles['radio-input']}
              name={name}
              onChange={onChange}
              readOnly={readOnly}
              ref={ref}
              required={required}
              tabIndex={-1}
              type='radio'
              value={value}
              {...props}
            />
          </span>
          {isChecked && <RadioDotSolidIcon className={styles['radio-checkmark']} />}
        </span>
        {label && <FormControlLabel inputId={inputId} label={label} />}
      </span>
    );
  },
);
