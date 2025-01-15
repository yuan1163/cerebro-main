import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { ListItem } from '@core/ui/components/ListItem';
import { Text } from '@core/ui/components/Text';

type Props = {
  caption?: number | string;
  className?: string;
  title?: string;
};

export const CardList: React.FC<Props> = ({ className, caption, title }) => {
  return (
    <ListItem dense className={cn(styles['list-item'], className)}>
      <Grid className={styles['list-item-content']}>
        <Text component='span' className={styles['title']}>
          {title || t('general.notAvailable.label', 'n/a', 'Not Available.')}
        </Text>
        <Text component='span' className={styles['subtitle']}>
          {caption || t('general.notAvailable.label', 'n/a', 'Not Available.')}
        </Text>
      </Grid>
    </ListItem>
  );
};
