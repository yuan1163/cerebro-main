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
import { Icon } from '../Icon';

export type SelectOption<ValueType> = {
  label: string;
  value: ValueType;
};

type SelectProps<ValueType> = {
  className?: string;
  id: string;
  onChange(option: SelectOption<ValueType>): void;
  options?: SelectOption<ValueType>[];
  placeholder?: string;
  value?: SelectOption<ValueType>;
};

export const Select: React.FC<SelectProps<any>> = ({ id, className, placeholder, options = [], value, onChange }) => (
  <div className={cn(styles['container'], className)}>
    <Listbox value={value} onChange={onChange}>
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
            <span className={styles['button-text']}>{value?.label || options[0]?.label || placeholder}</span>
            <InputAdornment position='end'>
              <Icon className={styles['icon']} size='sm' variant='plain'>
                <ChevronDownLineIcon aria-hidden='true' className={cn(open && styles['expanded'])} />
              </Icon>
            </InputAdornment>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-out-standard duration-shorter'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className={styles['options']}>
              {options?.map((option, i) => (
                <Listbox.Option
                  key={`${id}-${i}`}
                  className={({ active }) => cn(styles['option'], active && styles['option-active'])}
                  value={option}
                >
                  {({ selected }) => (
                    <span className={cn(styles['label'], selected && styles['selected'])}>{option.label}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  </div>
);
