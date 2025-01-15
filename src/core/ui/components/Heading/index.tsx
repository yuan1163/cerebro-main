import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const Heading: React.FC<Props> = ({ as = 'h2', children, className, icon, ...props }) => {
  const Element = as as React.ElementType;
  return (
    <Element className={cn(styles.heading, styles[as], className)} {...props}>
      {icon}
      {children}
    </Element>
  );
};
