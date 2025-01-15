import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const UnitContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={cn(styles['unit-container'], className)}>{children}</div>;
};
