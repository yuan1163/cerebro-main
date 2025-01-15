import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { RadioGroup } from '@headlessui/react';

type Props = {
  buttons: Array<{
    name?: string;
  }>;
  className?: string;
  onToggle?: (value?: string) => void;
  value?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ToggleButtonGroup: React.FC<Props> = ({ buttons, children, className, onToggle, value, ...props }) => {
  const [selected, setSelected] = React.useState(value || buttons[0].name);
  return (
    <RadioGroup
      className={cn(styles['toggle-button-group'], className)}
      onChange={(value: string) => {
        setSelected(value);
        onToggle?.(value);
      }}
      value={selected}
      // defaultValue={buttons[0].name}
    >
      {buttons?.map((button) => (
        <RadioGroup.Option key={button.name} value={button.name}>
          {({ active, checked }) => <Button variant={checked ? 'outlined' : 'ghost'}>{button.name}</Button>}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
