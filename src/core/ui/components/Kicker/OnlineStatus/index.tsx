import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

type Props = {
  online?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const OnlineStatus: React.FC<Props> = ({ online = false, className, ...props }) => {
  return (
    <Grid alignItems='center'>
      <LegendMarker color={online ? 'success' : 'disabled'} />
      <Text color='typography-secondary' variant='sm'>
        {online ? 'Online' : 'Offline'}
      </Text>
    </Grid>
  );
};
