import React from 'react';

// style

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { SmartPoleQuery } from '@solutions/utilus/api/generated';

// components

import { CardHeader } from '@core/ui/components/CardHeader';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import SmartPoleIcon from '@assets/icons/line/smart-pole.svg?component';

type Props = {
  action?: React.ReactNode;
  className?: string;
  pole?: SmartPoleQuery['smartPole'];
} & React.HTMLAttributes<HTMLElement>;

export const SmartPoleCardHeader = React.forwardRef<HTMLElement, Props>(
  ({ action, className, pole, ...props }, ref) => {
    return (
      <CardHeader
        action={action}
        avatar={
          <Icon size='xl' variant='soft'>
            <SmartPoleIcon />
          </Icon>
        }
        borderBottom
        className={cn(styles['card-header'], className)}
      >
        <Text component='h3' variant='lg' weight='bold'>
          {pole?.name || 'Loading...'}
        </Text>
        <Text color='typography-tertiary' variant='sm' lineHeight='tight'>
          {pole?.zone?.formation?.address}
        </Text>
      </CardHeader>
    );
  },
);
