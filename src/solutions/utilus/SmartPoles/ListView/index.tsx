import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// data

import { useUI } from '@core/storages/ui';
import { useSmartPolesFormation } from '@solutions/utilus/api/data/useSmartPolesFormation';
import { SmartPolesQuery } from '@solutions/utilus/api/generated';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DetailsPreview } from './DetailsPreview';
import { Icon } from '@core/ui/components/Icon';
import { List } from '@core/ui/components/List';
import { ListItemButton } from '@core/ui/components/ListItemButton';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import SmartPolesIcon from '@assets/icons/line/smart-pole.svg?component';

type ListViewSelectionProps = {
  list?: SmartPolesQuery['smartPoles'];
  item?: ElementOf<SmartPolesQuery['smartPoles']>;
};

export const ListViewSelection: React.FC<ListViewSelectionProps> = ({ list, item }) => {
  const navigate = useNavigate();
  return (
    <UnitContainer>
      <Unit variant='sidebar'>
        <Card className={cn(styles['card'])} fullHeight fullWidth scrollable>
          <CardHeader borderBottom>
            <Search
              placeholder={t(
                'general.searchByName.label',
                'Search by name',
                'Feature allowing users to locate specific items using their names as the query.',
              )}
            />
          </CardHeader>
          <CardContent disablePadding scrollable>
            <Scrollbar>
              <List className={styles['list']}>
                {list?.map((pole) => {
                  const selected = pole.id === item?.id;
                  const alert = pole.devices.filter((device) => device.alerts.length > 0).length > 0;
                  return (
                    <ListItemButton
                      className={styles['list-item-button']}
                      component={NavLink}
                      key={pole.id}
                      to={`../${pole.id}`}
                    >
                      <div className={styles['list-item-button-pseudo-element']} />
                      <ListItemIcon className={styles['list-item-icon']}>
                        <Icon
                          className={styles['list-item-icon']}
                          color={(alert as any) && 'error'}
                          size='xl'
                          variant='solid'
                        >
                          <SmartPolesIcon />
                        </Icon>
                      </ListItemIcon>
                      <ListItemText>
                        <Text component='h4' variant='lg' weight='bold' color='typography-primary'>
                          {pole.name}
                        </Text>
                        <Text variant='sm' color='typography-secondary'>
                          {pole.zone?.name}
                        </Text>
                      </ListItemText>
                    </ListItemButton>
                  );
                })}
              </List>
            </Scrollbar>
          </CardContent>
        </Card>
      </Unit>
      <Unit>
        <Card fullHeight className={cn(styles['card'])} scrollable>
          {item && <DetailsPreview poleId={item.id} />}
        </Card>
      </Unit>
    </UnitContainer>
  );
};

type Props = {
  zoneId?: number;
};

export const ListView: React.FC<Props> = ({ zoneId }) => {
  const ui = useUI();
  const smartPoles = useSmartPolesFormation(ui.currentFormation, zoneId);
  return (
    <Routes>
      {smartPoles?.map((pole) => (
        <Route key={pole.id} path={pole.id.toString()} element={<ListViewSelection list={smartPoles} item={pole} />} />
      ))}
      {smartPoles?.[0] && <Route path='' element={<Navigate to={smartPoles[0].id.toString()} />} />}
    </Routes>
  );
};
