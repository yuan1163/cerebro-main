import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// TODO delete any

type Props = {
  alert?: string;
  className?: string;
  title?: any;
} & React.HTMLAttributes<HTMLElement>;

export const Battery: React.FC<Props> = ({ alert = 'success', className, title, ...props }) => {
  return (
    <Grid alignItems='center'>
      <Icon className={styles['icon']} color='secondary' size='lg' variant='tint'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M3.112,9.037H17.925v5.926H3.112Z' className={styles[`icon-${alert}`]} />
          <path d='M3.112,6.075A2.964,2.964,0,0,0,.15,9.037v5.926a2.964,2.964,0,0,0,2.962,2.962H17.925a2.964,2.964,0,0,0,2.963-2.962V9.037a2.964,2.964,0,0,0-2.963-2.962ZM17.925,7.556a1.482,1.482,0,0,1,1.481,1.481v5.926a1.482,1.482,0,0,1-1.481,1.481H3.112a1.482,1.482,0,0,1-1.481-1.481V9.037A1.482,1.482,0,0,1,3.112,7.556ZM23.85,12a2.223,2.223,0,0,1-2.222,2.222V9.778A2.223,2.223,0,0,1,23.85,12Z' />
        </svg>
      </Icon>
      <Text color='typography-secondary' variant='sm'>
        {`${title}%`}
      </Text>
    </Grid>
  );
};
