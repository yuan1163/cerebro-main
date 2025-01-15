import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Text } from '@core/ui/components/Text';

// icons

import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const DrawerMenu: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <Button
      className={cn(styles['button'], className)}
      onClick={onClick}
      startIcon={<DotsVerticalLineIcon />}
      variant='text'
    >
      <Text variant='lg' weight='bold'>
        {children}
      </Text>
    </Button>
  );
};
