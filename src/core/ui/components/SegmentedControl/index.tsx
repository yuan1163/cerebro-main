import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { ButtonBase } from '@core/ui/components/ButtonBase';
import { Decorator } from '@core/ui/components/Decorator';
import { RadioGroup } from '@headlessui/react';

type RadioOption = {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  label: string;
  value?: string;
};

type Props = {
  buttons: Array<RadioOption>;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
  icon?: boolean;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  startIcon?: boolean;
  value: string;
  variant?: 'outlined' | 'soft';
};

export const SegmentedControl: React.FC<Props> = ({
  buttons,
  children,
  className,
  disabled = false,
  endIcon,
  fullWidth = false,
  icon,
  onChange,
  size = 'sm',
  startIcon,
  value,
  variant = 'outlined',
  ...props
}) => {
  return (
    <RadioGroup
      className={cn(
        styles['segmented-control'],
        styles[`segmented-control-variant-${variant}`],
        styles[`segmented-control-size-${size}`],
        className,
      )}
      disabled={disabled}
      onChange={onChange}
      value={value}
    >
      {buttons?.map((button) => (
        <RadioGroup.Option
          key={button.label}
          disabled={button.isDisabled}
          className={({ checked }) =>
            cn(
              styles['radio-option'],
              fullWidth && styles['radio-option-full-width'],
              buttons.length > 2 && styles['radio-option-divider'],
              checked && styles['radio-option-checked'],
            )
          }
          value={button.value}
        >
          {({ active, checked }) => (
            <div className={cn(styles['button'])}>
              {!icon ? (
                <>
                  {startIcon && button.icon && (
                    <Decorator className={styles[`button-start-icon`]} position='start' size='sm'>
                      {button.icon}
                    </Decorator>
                  )}
                  <div className={styles['button-label']}>
                    <div className={styles['button-label-medium']}>{button.label}</div>
                    <div className={styles['button-label-semibold']}>{button.label}</div>
                  </div>
                  {endIcon && button.icon && (
                    <Decorator className={styles[`button-end-icon`]} position='end' size='sm'>
                      {button.icon}
                    </Decorator>
                  )}
                </>
              ) : (
                <Decorator position='center' size='sm'>
                  {button.icon}
                </Decorator>
              )}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
