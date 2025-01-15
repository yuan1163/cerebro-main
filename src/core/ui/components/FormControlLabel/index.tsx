import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/FormControl/styles.module.scss';

type Props = {
  className?: string;
  inputId?: string;
  label?: string;
} & React.HTMLAttributes<HTMLElement>;

export const FormControlLabel: React.FC<Props> = ({ children, className, inputId, label, ...props }) => {
  return (
    <label className={cn(styles['label'])} htmlFor={inputId}>
      {label}
    </label>
  );
};
