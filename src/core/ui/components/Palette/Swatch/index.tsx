import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { ColorPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User } from '@core/api/types';

// components

import { Colorswatch } from '@core/ui/components/Palette/Colorswatch';
import { IconButton } from '@core/ui/components/IconButton';

// icons

import PlusLineIcon from '@assets/icons/line/plus.svg?component';

type Props = {
  value?: ColorPalette | string;
  onChange?: (color: string) => void;
};

export const Swatch: React.FC<Props> = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState(value || 'secondary');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange && onChange(event.target.value);
  };
  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    'aria-label': item,
  });
  return (
    <>
      <Colorswatch color='red' {...controlProps('red')} />
      <Colorswatch color='orange' {...controlProps('orange')} />
      <Colorswatch color='amber' {...controlProps('amber')} />
      <Colorswatch color='yellow' {...controlProps('yellow')} />
      <Colorswatch color='brown' {...controlProps('brown')} />
      <Colorswatch color='lime' {...controlProps('lime')} />
      <Colorswatch color='green' {...controlProps('green')} />
      <Colorswatch color='grass' {...controlProps('grass')} />
      <Colorswatch color='teal' {...controlProps('teal')} />
      <Colorswatch color='cyan' {...controlProps('cyan')} />
      <Colorswatch color='sky' {...controlProps('sky')} />
      <Colorswatch color='blue' {...controlProps('blue')} />
      <Colorswatch color='indigo' {...controlProps('indigo')} />
      <Colorswatch color='violet' {...controlProps('violet')} />
      <Colorswatch color='purple' {...controlProps('purple')} />
      <Colorswatch color='fuchsia' {...controlProps('fuchsia')} />
      <Colorswatch color='pink' {...controlProps('pink')} />
      <Colorswatch color='rose' {...controlProps('rose')} />
      <Colorswatch color='secondary' {...controlProps('secondary')} />
      {/* <IconButton
        className={styles['swatch-icon']}
        color='secondary'
        opacity
        shape='circle'
        size='x-small'
        variant='contained'
      >
        <PlusLineIcon />
      </IconButton> */}
    </>
  );
};
