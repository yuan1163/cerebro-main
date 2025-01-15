import React from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AlertCard } from '../AlertCard';
import { Box } from '@core/ui/components/Box';
import { CardContent } from '@core/ui/components/CardContent';
import { Slider } from '@core/ui/components/Slider';
import { SwiperSlide } from 'swiper/react';
import { Text } from '@core/ui/components/Text';

// data
import { useAlertsFormation } from '@solutions/utilus/api/data/useAlertsFormation';

type Props = {
  className?: string;
};

export const AlertsList: React.FC<Props> = observer(({ className }) => {
  const ui = useUI();
  const alerts = useAlertsFormation(ui.currentFormation);

  return (
    <CardContent className={styles['card-container']}>
      <Text component='h4' weight='bold' className={styles['header']}>
        {t(
          'issue.attentionRequired.label',
          'Attention Required',
          'A title indicating that there are unresolved problems.',
        )}
      </Text>
      {alerts && alerts.length ? (
        <Slider scrollbar>
          {alerts.map((alert) => (
            <SwiperSlide className={styles['swiper-slide']} key={alert.id}>
              <AlertCard alert={alert} />
            </SwiperSlide>
          ))}
        </Slider>
      ) : (
        <Box className={styles['alerts-container']}>
          {alerts && alerts.map((alert) => <AlertCard alert={alert} key={alert.id} />)}
        </Box>
      )}
    </CardContent>
  );
});
