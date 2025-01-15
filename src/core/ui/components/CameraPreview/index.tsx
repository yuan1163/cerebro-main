import React, { useEffect, useState, useRef } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Icon } from '@core/ui/components/Icon';

// icons

import VideoRecorderOffLineIcon from '@assets/icons/solid/video-recorder-off.svg?component';

type Props = {
  className?: string;
  snapshot?: string;
} & React.HTMLAttributes<HTMLElement>;

export const CameraPreview: React.FC<Props> = ({ children, className, snapshot, ...props }) => {
  const imageRef = useRef(null);
  return (
    <div className={cn(styles['container'], className)} {...props}>
      {snapshot && (
        <img
          alt={t('location.cameraSnapshot.label', 'Camera Snapshot', 'Camera snapshot.')}
          className={styles['image']}
          ref={imageRef}
          src={snapshot}
        />
      )}
      {!snapshot && (
        <Icon color='icon-tertiary' size='lg'>
          <VideoRecorderOffLineIcon />
        </Icon>
      )}
    </div>
  );
};
