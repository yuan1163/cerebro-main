import React, { useState } from 'react';
import { usePopper } from 'react-popper';

// styles

import { cn } from '@core/utils/classnames';
import popoverStyles from './styles.module.scss';

// components

import { Popover } from '@headlessui/react';

interface CloseProps {
  close: () => void;
}

type Props = {
  button?: React.ReactNode;
  children?: ((close: CloseProps) => JSX.Element) | React.ReactNode;
  className?: string;
  disableGutters?: boolean;
  rounded?: boolean;
  placement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'right-start'
    | 'bottom-start'
    | 'left-start'
    | 'top-end'
    | 'right-end'
    | 'bottom-end'
    | 'left-end';
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>;

export const Menu: React.FC<Props> = ({
  button,
  children,
  className,
  disableGutters = false,
  placement = 'bottom',
  rounded = false,
  ...props
}) => {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    strategy: 'fixed',
    modifiers: [],
  });
  return (
    <Popover className={cn(popoverStyles['popover'], className)}>
      <Popover.Button
        className={cn(popoverStyles['button'], rounded && popoverStyles['button-rounded'])}
        ref={setReferenceElement}
      >
        {button}
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        className={cn(popoverStyles['popover-panel'], disableGutters && popoverStyles['popover-panel-disable-gutters'])}
        {...attributes.popper}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
};
