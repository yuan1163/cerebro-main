import React from 'react';

type Props = {
  alt?: string;
  className?: string;
  src?: string;
  stillLife?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>;

// icons

import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';
import User02SolidIcon from '@assets/icons/solid/user-02.svg?component';

export default function AvatarFallback({ alt, className, src, stillLife = false, ...props }: Props) {
  const [state, setState] = React.useState('loading');

  React.useEffect(() => {
    const img: HTMLImageElement = new Image();
    img.onload = () => setState('success');
    img.onerror = () => setState('error');
    img.src = src as string;
  }, []);

  const fallbackIcon = stillLife ? <Image05SolidIcon /> : <User02SolidIcon />;

  return (
    <>
      {state === 'loading' && ''}
      {state === 'error' && fallbackIcon}
      {state === 'success' && <img alt={alt ?? ''} className={className} src={src} {...props} />}
    </>
  );
}
