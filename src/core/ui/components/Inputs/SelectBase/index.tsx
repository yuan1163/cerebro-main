import React from 'react';
import { Fragment } from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import stylesInputBase from '@core/ui/components/InputBase/styles.module.scss';

// components

import { IconBase } from '@core/ui/components/IconBase';
import { InputAdornment } from '@core/ui/components/InputAdornment';
import { Listbox, Transition } from '@headlessui/react';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';

type Props = {
  className?: string;
  id?: any;
  defaultValue?: string | number;
  handleChange: (value: any) => void;
  options?: React.ReactNode;
  placeholder?: string | number;
  value?: any;
};

export const SelectBase: React.FC<Props> = ({
  className,
  id,
  defaultValue,
  handleChange,
  options,
  placeholder,
  value,
}) => (
  <div className={cn(styles['container'], className)}>
    <Listbox
      onChange={(event) => {
        handleChange(event);
      }}
      value={value}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={cn(
              styles['button'],
              stylesInputBase['input-base'],
              stylesInputBase['input-base-wrapper'],
              stylesInputBase['input-base-filled'],
            )}
          >
            <span className={styles['button-text']}>{defaultValue || placeholder}</span>
            <InputAdornment position='end'>
              <IconBase className={styles['icon-container']}>
                <ChevronDownLineIcon aria-hidden='true' className={cn(open && styles['expanded'])} />
              </IconBase>
            </InputAdornment>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-out-standard duration-shorter'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className={stylesInputBase['options']} static>
              {options}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  </div>
);
