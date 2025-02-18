import React from 'react';
import { observer } from 'mobx-react';

// types

import { Alert } from '@core/api/types';

// storages

import { useAlerts } from '@core/storages/controllers/alerts';
import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AttentionCard } from '../AttentionCard';
import { Box } from '@core/ui/components/Box';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Slider } from '@core/ui/components/Slider';
import { SwiperSlide } from 'swiper/react';
import { Text } from '@core/ui/components/Text';

type Props = {
  alerts?: Alert[];
  className?: string;
};

export const AttentionRequired: React.FC<Props> = observer(({ alerts, className }) => {
  // const ui = useUI();
  // const alerts = useAlerts(
  //   {
  //     locationId: ui.currentFormation,
  //   },
  //   true,
  // );

  return (
    <>
      <CardContent disablePaddingTop className={styles['card-container']}>
        {/* 判斷是否已 slider 呈現 */}
        {alerts && alerts.length > 2 ? (
          <>
            <Slider scrollbar>
              {alerts?.map((item: Alert, i: number) => (
                <SwiperSlide key={`alerts-${i}`} className={styles['swiper-slide']}>
                  {/* 需要注意設備 */}
                  <AttentionCard alert={item} />
                </SwiperSlide>
              ))}
            </Slider>
          </>
        ) : (
          <Box className={styles['alerts-container']}>
            {alerts?.map((item: Alert, i: number) => (
              // 需要注意設備
              <AttentionCard key={`alerts-${i}`} alert={item} />
            ))}
          </Box>
        )}
      </CardContent>
    </>
  );
});
