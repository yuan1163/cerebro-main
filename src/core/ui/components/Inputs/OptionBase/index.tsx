import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Listbox } from '@headlessui/react';

type SelectProps<ValueType> = {
  id: string | number;
  option?: string | number;
  value?: any;
};

export const OptionBase: React.FC<SelectProps<any>> = ({ id, option, value }) => (
  <Listbox.Option
    className={({ active }) => cn(styles['option'], active && styles['option-active'])}
    key={id}
    value={value}
  >
    {({ selected }) => <span className={cn(styles['label'], selected && styles['selected'])}>{option}</span>}
  </Listbox.Option>
);
