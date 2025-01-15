import React, { useState, useContext } from 'react';

// utils

import { t } from '@core/utils/translate';

// storage

import { useUI } from '@core/storages/ui';

// context

import { DrawerContext } from '@core/context/DrawerContext';

// styles

import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { FormControl } from '@core/ui/components/FormControl';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  backLabel?: string;
  children?: React.ReactNode;
  className?: string;
  onBackNavigate?: () => void;
  onClose?: () => void;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DrawerMobile: React.FC<Props> = ({ className, onClose, children, title, onBackNavigate, backLabel }) => {
  const ui = useUI();
  return (
    <div className={styles['drawer-expanded']}>
      <CardHeader
        title={title}
        action={
          <IconButton
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            size='lg'
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
      />
      <CardContent className={styles['card-content']}>{children}</CardContent>
      <div className={styles['go-back-button-container']}>
        <Button variant='text' startIcon={<ArrowLeftLineIcon />} onClick={onBackNavigate}>
          {backLabel}
        </Button>
      </div>
    </div>
  );
};
