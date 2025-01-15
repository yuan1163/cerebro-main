import React from 'react';
import { useNavigate } from 'react-router';

// storages

import { modals } from '@core/storages/modals';
import { useUI } from '@core/storages/ui';

// types

import { Asset, AssetPriority } from '@core/api/types';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AssetEditForm } from '@core/ui/cerebro/forms/AssetEditForm';
import { Button } from '@core/ui/components/Button';
import { Chip } from '@core/ui/components/Chip';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { Text } from '@core/ui/components/Text';

// icons

import LineChartUp04Icon from '@assets/icons/line/line-chart-up-04.svg?component';
import StationLineIcon from '@assets/icons/line/station.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';

type Props = {
  asset: Asset;
};

const getBadgeByPriority = (priority: AssetPriority): { text: string; color: string } => {
  switch (priority) {
    case AssetPriority.Low:
      return {
        text: t('label.priority.low', 'Low', 'Text for Low priority'),
        color: 'success',
      };
    case AssetPriority.Medium:
      return {
        text: t('label.priority.medium', 'Medium', 'Text for Low priority'),
        color: 'warning',
      };
    case AssetPriority.High:
      return {
        text: t('label.priority.high', 'High', 'Text for High priority'),
        color: 'error',
      };
  }
};

export const AssetsDataGrid: React.FC<Props> = ({ asset }) => {
  const badge = getBadgeByPriority(asset.assetPriority);
  const ui = useUI();

  const navigate = useNavigate();

  return (
    <DataGridRow className={styles['row']} onClick={() => navigate(`../${ui.currentFormation}/asset/${asset.assetId}`)}>
      <DataGridCell>
        <Grid className={styles['heading-content']}>
          <Icon className={styles['avatar']} color='secondary' size='lg' variant='soft'>
            <LineChartUp04Icon />
          </Icon>
          <Grid className={styles['heading']} direction='column'>
            <Text color='typography-primary' component='h6' whiteSpace='nowrap' variant='sm' weight='bold'>
              {asset.name}
            </Text>
            <Text color='typography-secondary' whiteSpace='nowrap' variant='xs'>
              {asset.groups && asset.groups.map((group) => group.name).join(', ')}
            </Text>
          </Grid>
        </Grid>
      </DataGridCell>
      <DataGridCell>{asset.location.name}</DataGridCell>
      <DataGridCell>
        <Chip className={cn(styles['alert-message'])} color={badge.color}>
          {badge.text}
        </Chip>
      </DataGridCell>
      <DataGridCell>{asset.serialNumber}</DataGridCell>
      <DataGridCell>
        <Chip startIcon={<StationLineIcon />}>{asset.assetUid}</Chip>
      </DataGridCell>
      <DataGridCell>
        <Menu button={<Button variant='text' component='div' size='lg' startIcon={<DotsVerticalLineIcon />} />}>
          <MenuList>
            <MenuItem>
              <MenuItemButton onClick={() => modals.open(<AssetEditForm asset={asset} />)}>
                <MenuItemText
                  title={t('general.edit.label', 'Edit', 'Function that allows to make changes to content or data.')}
                />
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton onClick={() => ui.gotoAsset(asset)}>
                <MenuItemText
                  title={t(
                    'general.details.label',
                    'Details',
                    'Details provide in-depth information about a particular subject or topic.',
                  )}
                />
              </MenuItemButton>
            </MenuItem>
          </MenuList>
        </Menu>
      </DataGridCell>
    </DataGridRow>
  );
};
