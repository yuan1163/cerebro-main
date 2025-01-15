import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type CustomLabelProps<T extends React.ElementType> = {
  className?: string;
  component?: T;
} & React.HTMLAttributes<HTMLElement>;

// TODO change component

export const FormLabel = <T extends React.ElementType = 'legend'>({
  children,
  className,
  component,
  ...props
}: CustomLabelProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomLabelProps<T>>) => {
  const Component = component || 'legend';
  return (
    <Component className={styles['form-label']} {...props}>
      {children}
    </Component>
  );
};
