import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | false | string;
} & React.HTMLAttributes<HTMLElement>;

export const Container: React.FC<Props> = ({ children, className, fixed = false, maxWidth = 'lg', ...props }) => {
  return (
    <div
      className={cn(
        styles['container'],
        fixed && styles['container-fixed'],
        styles[`container-maxWidth-${maxWidth}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
