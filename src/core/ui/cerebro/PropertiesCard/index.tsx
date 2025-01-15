import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// types

import { AssetGroup } from '@core/api/types';

// storages
import { useUI } from '@core/storages/ui';
import { useModals } from '@core/storages/modals';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AssetGroupEditForm } from '@core/ui/cerebro/forms/AssetGroupEditForm';
import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardList } from '@core/ui/cerebro/CardList';
import { Chip } from '@core/ui/components/Chip';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { Stack } from '@core/ui/components/Stack';

// icons

import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import LineChartUp04Icon from '@assets/icons/line/line-chart-up-04.svg?component';

type Props = {
  className?: string;
  group: AssetGroup;
};

// const assetsList = [
//     { title: 'Body Composition Analyzer', caption: 1555 },
//     { title: 'Digital Blood Pressure Device', caption: 400 },
//     { title: 'Hearing Screener Set', caption: 145 },
// ];

export const PropertiesCard: React.FC<Props> = ({ className, group }) => {
  const modals = useModals();

  const ui = useUI();
  const navigate = useNavigate();

  return (
    <Card
      color='surface-02'
      className={cn(styles['card'], className)}
      onClick={() => navigate(`../${ui.currentFormation}/group/${group.groupId}`)}
    >
      <CardHeader
        avatar={
          <Icon
            aria-label={t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')}
            color='secondary'
            size='lg'
            variant='tint'
          >
            <LineChartUp04Icon />
          </Icon>
        }
        action={
          <IconButton
            ariaLabel={t(
              'general.settings.label',
              'Settings',
              'Section or menu where users can configure various preferences.',
            )}
            size='lg'
            onClick={() => modals.open(<AssetGroupEditForm group={group} />)}
          >
            <DotsVerticalLineIcon />
          </IconButton>
        }
        title={group.name}
        // subtitle={group.assetsCount.toString()}
      />
    </Card>
  );
};
