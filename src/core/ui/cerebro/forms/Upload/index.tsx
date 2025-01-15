import React, { useEffect, useRef } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Input } from '@core/ui/components/Input';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Upload = React.forwardRef<HTMLElement, Props>(({ className, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    // event.target.value = null;
  };

  return (
    <>
      <Input accept='image/*' className='hidden' onChange={handleFileChange} ref={inputRef} tabIndex={-1} type='file' />
      <Button onClick={handleClick} size='lg' variant='outlined'>
        {t('general.uploadPhoto.label', 'Upload photo', 'Action to transfer an image to an application.')}
      </Button>
    </>
  );
});
