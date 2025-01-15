import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DataNotFound: React.FC<Props> = ({ className, icon, title, subtitle, ...props }) => {
  return (
    <Grid alignItems='center' justifyContent='center' className={styles['grid']}>
      <Grid container alignItems='center' justifyContent='center' direction='column' spacing={2}>
        <Icon color='secondary' className={styles['icon']} size='xl' variant='tint'>
          {icon}
        </Icon>
        <Text align='center' color='typography-primary' className={styles['title']} variant='lg' weight='bold'>
          {title}
        </Text>
        <Text align='center' color='typography-secondary' className={styles['subtitle']} variant='sm'>
          {subtitle}
        </Text>
      </Grid>
    </Grid>
  );
};
