import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import SimpleBar from 'simplebar-react';

type Props = {
  autohide?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Scrollbar: React.FC<Props> = ({ autohide = true, className, children, ...props }) => {
  return (
    <div className={cn(styles['scrollable-section'], className)}>
      <SimpleBar autoHide={autohide} className={styles['simplebar']} clickOnTrack={false} timeout={200}>
        {children}
      </SimpleBar>
    </div>
  );
};
