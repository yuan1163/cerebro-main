import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '../Box';

type Props = {
  total: number;
  value: number;
};

export const Progress: React.FC<Props> = ({ total, value }) => {
  const percent = (value / total) * 100;
  return (
    <Box className={styles.progress}>
      <Box className={cn(styles.bar, styles.total)} style={{ width: '100%' }} />
      <Box className={cn(styles.bar, styles.value)} style={{ width: percent + '%' }} />
    </Box>
  );
};
