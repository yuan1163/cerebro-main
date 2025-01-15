import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { IconBase } from '@core/ui/components/IconBase';

type Point = {
  alertStatus?: 'error' | 'success' | 'warning' | string;
  badgeContent?: React.ReactNode;
  coordinates?: { top: string; left: string };
  icon?: React.ReactNode;
  title?: string;
};

type Props = {
  className?: string;
  content: Point;
} & React.HTMLAttributes<HTMLElement>;

export const Point: React.FC<Props> = ({ content, children, className, ...props }) => {
  return (
    <div
      className={styles['point-container']}
      style={{ top: content.coordinates?.top, left: content.coordinates?.left }}
    >
      {/* <Badge badgeContent={content.badgeContent} invisible={Boolean(content?.badgeContent)}> */}
      <div className={cn(styles['point'], styles[`point-alert-${content.alertStatus}`])}>
        <IconBase color='white' size='large'>
          {content.icon}
        </IconBase>
      </div>
      {/* </Badge> */}
      <div className={styles['point-title']}>{content.title}</div>
    </div>
  );
};
