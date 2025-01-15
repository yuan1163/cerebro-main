import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import BarChart01LineIcon from '@assets/icons/line/bar-chart-01.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ChartNoData: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Grid alignItems='center' justifyContent='center' fullWidth direction='column'>
      <Grid className='mb-2'>
        <Icon color='secondary' rounded size='sm' variant='tint'>
          <BarChart01LineIcon />
        </Icon>
      </Grid>
      <Grid>
        <Text variant='xs' weight='medium'>
          No date available
        </Text>
      </Grid>
      <Grid>
        <Text color='typography-secondary' variant='xs'>
          There are no any records to show you this report
        </Text>
      </Grid>
    </Grid>
  );
};
