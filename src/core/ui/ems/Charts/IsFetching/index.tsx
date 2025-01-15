import React from 'react';

// utils

import { t } from '@core/utils/translate';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Componenct
import { Box } from '@core/ui/components/Box';
import { Text } from '@core/ui/components/Text';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { CircularProgress } from '@core/ui/components/CircularProgress';

// Icon
import LineChartUp01LineIcon from '@assets/icons/solid/line-chart-up-01.svg?component';

type Props = {
  height: number;
};

// // export const AreaLineChart: React.FC<Props> = observer(({ xAxisData, yAxisData, height = 350, optionSetting }) => {
export const IsFetching: React.FC<Props> = ({ height }) => {
  return (
    <Box className={styles['container']} style={{ height: `${height}px` }}>
      <CircularProgress />
      <Box className={styles['text']}>
        <Text variant={'lg'} color={'secondary'} weight={'bold'}>
          {t('general.isLoading.label', 'Loading...', 'Absence of information.')}
        </Text>
      </Box>
    </Box>
  );
};
