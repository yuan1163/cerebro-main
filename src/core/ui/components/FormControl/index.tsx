// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | (string & {});
  variant?: 'checkbox' | 'radio' | 'switch';
};

export const FormControl: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  fullWidth = false,
  size = 'md',
  variant,
}) => {
  return (
    <div
      className={cn(
        styles['form-control'],
        styles[`form-control-variant-${variant}`],
        styles[`form-control-size-${size}`],
        disabled && styles['form-control-disabled'],
        fullWidth && styles['form-control-full-width'],
        className,
      )}
    >
      {children}
    </div>
  );
};
