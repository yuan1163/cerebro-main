import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  disabled?: boolean;
  inputId?: string;
  label?: string;
  required?: boolean;
};

export const InputLabel: React.FC<Props> = ({ className, disabled = false, inputId, label, required = false }) => {
  return (
    <div className={styles['input-label-wrapper']}>
      <label id={`${inputId}-label`} className={cn(styles['form-label'], className)} htmlFor={inputId}>
        <Text color={'typography-secondary'} component='span' disabled={disabled} variant='xs' weight='medium'>
          {label}
          {required && (
            <Text
              className={styles['required-mark']}
              color='error'
              component='span'
              disabled={disabled}
              variant='xs'
              weight='medium'
            >
              *
            </Text>
          )}
        </Text>
      </label>
    </div>
  );
};
