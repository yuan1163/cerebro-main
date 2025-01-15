import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Backdrop } from '@core/ui/components/Backdrop';
import { Dialog } from '@headlessui/react';

type Props = {
  className?: string;
  onClose?: () => void;
  open?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Modal: React.FC<Props> = ({ children, className, onClose, open = false, ...props }) => {
  return (
    <Dialog as='div' className={styles['dialog']} onClose={() => onClose} open={open}>
      <Backdrop />
      <div className={cn(styles['dialog-panel-container'], className)}>
        <Dialog.Panel>{children}</Dialog.Panel>
      </div>
    </Dialog>
  );
};
