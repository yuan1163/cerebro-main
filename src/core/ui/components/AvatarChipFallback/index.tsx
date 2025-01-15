import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Decorator } from '@core/ui/components/Decorator';

// icons

import Users01LineIcon from '@assets/icons/line/users-01.svg?component';

type Props = {
  alt?: string;
  className?: string;
  size?: 'sm' | 'md';
  src?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function AvatarChipFallback({ alt, className, size, src, ...props }: Props) {
  const [state, setState] = React.useState('loading');

  React.useEffect(() => {
    const img: HTMLImageElement = new Image();
    img.onload = () => setState('success');
    img.onerror = () => setState('error');
    img.src = src as string;
  }, []);

  return (
    <>
      {state === 'loading' && ''}
      {state === 'error' && (
        <Decorator size={size === 'sm' ? 'xs' : 'sm'}>
          <Users01LineIcon />
        </Decorator>
      )}
      {state === 'success' && (
        <Decorator size={size === 'sm' ? 'xs' : 'sm'}>
          <img
            className={cn(styles[`avatar-rounded`], styles[`avatar-chip-size-${size}`], className)}
            src={src}
            {...props}
          />
        </Decorator>
      )}
    </>
  );
}
