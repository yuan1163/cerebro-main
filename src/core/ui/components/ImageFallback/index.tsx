import React from 'react';

// components

import { Icon } from '@core/ui/components/Icon';

// icons

import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';

type Props = {
  alt?: string;
  className?: string;
  src?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageFallback({ alt, className, src, ...props }: Props) {
  const [state, setState] = React.useState('loading');

  const FallbackIcon = (
    <Icon className='opacity-60' color='icon-tertiary' variant='plain'>
      <Image05SolidIcon />
    </Icon>
  );

  React.useEffect(() => {
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      setState('success');
    };
    img.onerror = () => setState('error');
    img.src = src as string;
  }, [src]);

  return (
    <>
      {state === 'loading' && ''}
      {state === 'error' && FallbackIcon}
      {state === 'success' && <img key={Date.now()} alt={alt ?? ''} className={className} src={src} {...props} />}
    </>
  );
}
