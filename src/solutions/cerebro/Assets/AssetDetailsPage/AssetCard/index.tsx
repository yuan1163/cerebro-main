import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { Asset, AssetPriority } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardMedia } from '@core/ui/components/CardMedia';
import { Chip } from '@core/ui/components/Chip';
import { Grid } from '@core/ui/components/Grid';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// images

import MockupImage from '@assets/images/device-mockup.png';

type Props = {
  asset: Asset | undefined;
  className?: string;
};

const getBadgeByPriority = (priority: AssetPriority): { text: string; color: string } => {
  switch (priority) {
    case AssetPriority.Low:
      return {
        text: t('events.lowEvent.label', 'Low', 'Low priority notification.'),
        color: 'success',
      };
    case AssetPriority.Medium:
      return {
        text: t('events.mediumEvent.label', 'Medium', 'Medium priority notification.'),
        color: 'warning',
      };
    case AssetPriority.High:
      return {
        text: t('events.highEvent.label', 'High', 'High priority notification.'),
        color: 'error',
      };
  }
};

export const AssetCard: React.FC<Props> = ({ asset, className }) => {
  const badge = getBadgeByPriority(asset?.assetPriority as AssetPriority);
  return (
    <Card className={cn(styles['card'], className)}>
      <CardContent className={styles['card-content']}>
        <Grid className={styles['content-container']} direction='column'>
          <Grid className={styles['header']} direction='column'>
            {asset?.name && (
              <Text component='h3' whiteSpace='nowrap' variant='lg' weight='bold'>
                {asset?.name || t('asset.name.label', 'Asset Name', 'Asset name.')}
              </Text>
            )}
            {asset?.location?.name && (
              <Text color='typography-secondary' whiteSpace='nowrap' variant='sm'>
                {asset?.location?.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
              </Text>
            )}
          </Grid>
          <Grid className={styles['body']} direction='column'>
            <Stack className={styles['stack']} direction='row' spacing={3}>
              {badge && <Chip color={badge.color}>{badge.text}</Chip>}
              {asset?.assetUid && (
                <Text color='typography-secondary' component='span' variant='sm'>
                  UID:{' '}
                  <strong>
                    {asset?.assetUid || t('asset.assetUIDInput.label', 'Asset UID', 'Unique asset identifier.')}
                  </strong>
                </Text>
              )}
            </Stack>
          </Grid>
          <Stack className={styles['footer']} direction='row'>
            {asset?.groups && asset?.groups.map((group) => <Chip>{group.name}</Chip>)}
          </Stack>
        </Grid>
        <Box className={styles['card-media-container']}>
          <CardMedia alt='device image' className={styles['card-media']} src={MockupImage} />
        </Box>
      </CardContent>
    </Card>
  );
};
