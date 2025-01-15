import React from 'react';
import { Transition } from '@headlessui/react';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { SnackbarContent } from '@core/ui/components/SnackbarContent';

type Props = {
  action?: React.ReactNode;
  autoHideDuration?: number | null;
  message?: React.ReactNode;
  severity?: SeverityPalette | string;
} & React.HTMLAttributes<HTMLElement>;

export const Snackbar: React.FC<Props> = ({
  action,
  autoHideDuration = null,
  className,
  message,
  severity,
  ...props
}) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (autoHideDuration) {
      const timeout = setTimeout(() => setOpen(false), autoHideDuration);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [autoHideDuration]);

  return open ? (
    <Transition appear show={open}>
      <div className={cn(styles['snackbar'], className)} role='presentation' {...props}>
        <Transition.Child
          as='div'
          enter='ease-out duration-short'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-shortest'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <SnackbarContent action={action} message={message} severity={severity} />
        </Transition.Child>
      </div>
    </Transition>
  ) : null;
};
