// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  height?: number | string;
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text' | string;
  width?: number | string;
} & React.HTMLAttributes<HTMLElement>;

export const Skeleton: React.FC<Props> = ({ className, height, variant = 'text', width, ...props }) => {
  return (
    <span
      className={cn(styles['skeleton'], styles[`skeleton-${variant}`])}
      style={{ width: `${width}`, height: `${height}` }}
    />
  );
};
