import React from 'react';

// styles

import styles from './styles.module.scss';

// component

import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Grid } from '@core/ui/components/Grid';

export const WaitingPage = () => (
  <Grid className={styles['circular-progress-container']}>
    <CircularProgress />
  </Grid>
);
