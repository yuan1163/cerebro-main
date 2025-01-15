import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Decorator } from '@core/ui/components/Decorator';

// icons

import BullSolidIcon from '@assets/icons/solid/bull.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Bull: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Decorator className={cn(styles['bull'], className)} size='xs'>
      <BullSolidIcon />
      
    </Decorator>
  );
};
