import React, { forwardRef } from 'react';

// styles

import cn from 'classnames';
import styles from '@core/ui/components/Button/styles.module.scss';

type Props = {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, type = 'button', ...props }, ref) => {
    return (
      <button className={cn(styles['button-base'], className)} ref={ref} type={type} {...props}>
        {children}
      </button>
    );
  },
);
