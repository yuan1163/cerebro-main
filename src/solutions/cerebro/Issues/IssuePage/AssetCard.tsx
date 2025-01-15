import React from 'react';
import { useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// types

import { Notification } from '@core/api/types';

// storages

import { useNotification } from '@core/storages/controllers/notifications';
import { useUI } from '@core/storages/ui';

// components

import { AssetImage } from '@core/ui/cerebro/AssetImage';
import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

type Props = {
  locationId: number;
  alert: Partial<Notification>;
};

export const AssetCard: React.FC<Props> = ({ locationId, alert }) => {
  const ui = useUI();
  const navigate = useNavigate();

  const { data } = useNotification(locationId, alert);
  const item = data?.[0];

  if (!item) return null;
  return (
    <Grid container justifyContent='between' spacing={3}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <AssetImage asset={item.asset} stillLife size='xl' />
          </Grid>
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Text variant='sm' weight='medium'>
                  {item.asset?.name ||
                    t(
                      'asset.unassignedAsset.label',
                      'Asset unassigned',
                      'An item not yet allocated to a specific purpose.',
                    )}
                </Text>
              </Grid>
              <Grid item>
                <Text color='typography-secondary' variant='sm'>
                  {item.asset?.assetUid || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {item.asset && (
        <Grid item>
          <Button
            variant='outlined'
            onClick={() => navigate(`/cerebro/assets/${ui.currentFormation}/asset/${item.asset?.assetId}`)}
          >
            {t('general.view.label', 'View', 'Button or link that allows to access additional information.')}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
