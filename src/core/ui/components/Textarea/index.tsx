import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import stylesInput from '@core/ui/components/Input/styles.module.scss';

// components

import { InputLabel } from '@core/ui/components/InputLabel';

type Props = {
  className?: string;
  disabled?: boolean;
  inputId?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  severity?: 'error' | 'success' | 'warning' | (string & {});
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<Props> = ({
  className,
  disabled = false,
  inputId,
  label,
  placeholder,
  rows,
  severity,
  ...props
}) => {
  return (
    <div className={cn(stylesInput['form-control'], stylesInput[`form-control-severity-${severity}`])}>
      {label ? <InputLabel disabled={disabled} inputId={inputId} label={label} /> : null}

      <textarea
        id={inputId}
        className={cn(
          disabled && stylesInput['input-base-wrapper-disabled'],
          styles['textarea'],
          stylesInput['input-base-wrapper'],
          className,
        )}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    </div>
  );
};
