import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  alt?: string;
  className?: string;
  src?: string;
} & React.HTMLAttributes<HTMLElement>;

export const CardMedia: React.FC<Props> = ({ alt = '', className, src, ...props }) => {
  return <img alt={alt} className={cn(styles['card-media'], className)} src={src} {...props} />;
};
