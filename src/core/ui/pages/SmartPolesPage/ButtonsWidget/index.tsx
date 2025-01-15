import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Stack } from '@core/ui/components/Stack';
import { IconButton } from '@core/ui/components/IconButton';

// icons

import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import SunLineIcon from '@assets/icons/line/sun.svg?component';

type Props = {
  className?: string;
  onPlus?: () => void;
  onMinus?: () => void;
  onSun?: () => void;
};

export const ButtonsWidget: React.FC<Props> = ({ className, onPlus, onMinus, onSun }) => {
  return (
    <Box className={cn(styles['buttons-container'], className)}>
      <Stack spacing={2}>
        <IconButton ariaLabel='Expand' onClick={onPlus} size='lg' variant='control'>
          <PlusLineIcon />
        </IconButton>
        <IconButton ariaLabel='Minimize' onClick={onMinus} size='lg' variant='control'>
          <MinusLineIcon />
        </IconButton>
        <IconButton ariaLabel='Sun' className='mt-10' onClick={onSun} size='lg' variant='control'>
          <SunLineIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
