import React from 'react';

// types

import { BrandPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// style

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Switch as SwitchHeadless } from '@headlessui/react';

type Props = {
  className?: string;
  color?: BrandPalette | PaletteString | SeverityPalette;
  disabled?: boolean;
  isChecked?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
  size?: 'sm' | 'md' | (string & {});
};

export const Switch = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, color = 'primary', disabled = false, isChecked = false, label, onChange, size = 'sm', ...props },
    ref,
  ) => {
    return (
      <SwitchHeadless.Group>
        <div className={cn(styles['switch-group'])}>
          <SwitchHeadless
            as='div'
            checked={isChecked}
            onChange={onChange}
            className={cn(
              isChecked && styles['switch-checked'],
              disabled && styles['switch-disabled'],
              styles['switch'],
              styles[`switch-color-${color}`],
              styles[`switch-size-${size}`],
              styles['switch-track'],
            )}
          >
            <span aria-hidden='true' className={styles['switch-thumb']} />
          </SwitchHeadless>
          {label && (
            <SwitchHeadless.Label className={cn(styles['switch-label'], styles[`switch-label-size-${size}`])}>
              {label}
            </SwitchHeadless.Label>
          )}
        </div>
      </SwitchHeadless.Group>
    );
  },
);
