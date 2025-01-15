import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Backdrop: React.FC<Props> = ({ className, ...props }) => {
  return <div aria-hidden='true' className={cn(styles['backdrop'], className)} {...props} />;
};
