import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { LegendStandard } from '../LegendStandard';
import { Text } from '@core/ui/components/Text';
import { Link } from '@core/ui/components/Link';

type Legend = {
  totalValue?: number | string;
  description?: string;
  alertStatus?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | string;
};

type Props = {
  className?: string;
  content: {
    header?: string;
    mainLegend?: Legend;
    legend?: Array<Legend>;
    checkData?: {
      title?: string;
      path?: string;
    };
  };
};

export const PolesCard: React.FC<Props> = ({ content, className, ...props }) => {
  return (
    <Card fullWidth>
      <CardContent className={styles['card-content']}>
        <Grid direction='column' justifyContent='between' className={styles['content-container']}>
          <Text variant='base' weight='bold'>
            {content.header}
          </Text>
          <LegendStandard variant='large' content={content.mainLegend} className={styles['main-legend']} />
          <Grid container spacing={2} className={styles['legend-standard']}>
            {content?.legend?.map((item) => (
              <Grid item>
                <LegendStandard content={item} />
              </Grid>
            ))}
          </Grid>
          <Link to={content.checkData?.path || '#'} className={styles['link']}>
            <Text variant='xs' color='typography-secondary' decoration='underline'>
              {content.checkData?.title}
            </Text>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  );
};
