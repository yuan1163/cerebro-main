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
  isShowing?: boolean;
  message?: React.ReactNode;
  severity?: SeverityPalette | string;
} & React.HTMLAttributes<HTMLElement>;

export const Toast: React.FC<Props> = ({ action, className, isShowing, message, severity, ...props }) => {
  return (
    <>
      {isShowing ? (
        <Transition appear show={isShowing}>
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
              <SnackbarContent action={action} message={message} severity={severity} variant='toast' />
            </Transition.Child>
          </div>
        </Transition>
      ) : null}
    </>
  );
};
