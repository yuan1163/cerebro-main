import React, { useState, Fragment } from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// component

import { Dialog, Transition } from '@headlessui/react';

type Props = {
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  className?: string;
  open?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Drawer: React.FC<Props> = ({ anchor = 'left', children, className, open, ...props }) => {
  return (
    <Transition
      as={Fragment}
      show={open}
      enter='transition ease-in-out duration-300 transform'
      enterFrom='-translate-x-full'
      enterTo='translate-x-0'
      leave='transition ease-in-out duration-300 transform'
      leaveFrom='translate-x-0'
      leaveTo='-translate-x-full'
    >
      <Dialog static as='div' className={cn(styles['drawer'], styles[`drawer-anchor-${anchor}`])} onClose={() => {}}>
        <Dialog.Panel className={styles['dialog-panel']}>{children}</Dialog.Panel>
      </Dialog>
    </Transition>
  );
};
