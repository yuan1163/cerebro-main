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

export type SelectOption<ValueType> = {
  label: string;
  value: ValueType;
};

type AutocompleteProps<ValueType> = {
  children: React.ReactNode;
  endDecorator?: React.ReactNode;
  className?: string;
  chips?: React.ReactNode;
  // onChange(option: SelectOption<ValueType>): void;
  placeholder?: string;
  //value: SelectOption<ValueType>;
  value?: string;
};

export const Autocomplete: React.FC<AutocompleteProps<any>> = ({
  children,
  className,
  chips,
  endDecorator,
  // onChange,
  placeholder,
  value,
}) => (
  <div className={cn(styles['container'], className)}>
    {/* <Listbox value={value} onChange={onChange}> */}
    {/* TODO */}
    <Listbox value={value} onChange={(data) => ''}>
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
            {placeholder}
            {chips}
            {endDecorator}
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
            <Listbox.Options className={stylesInputBase['options']}>{children}</Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  </div>
);
