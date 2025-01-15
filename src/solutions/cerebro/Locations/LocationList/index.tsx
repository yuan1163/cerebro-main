import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataGrid } from '@core/ui/components/DataGrid';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataSelect } from '@core/ui/components/DataSelect';
import { DeviceCard } from '../DeviceCard';
import { Divider } from '@core/ui/components/Divider';
import { EventCard } from '../EventCard';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Select } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import CpuChip01LineIcon from '@assets/icons/line/cpu-chip-01.svg?component';
import HandheldLineIcon from '@assets/icons/line/handheld.svg?component';
import HardDriveLineIcon from '@assets/icons/line/hard-drive.svg?component';
import MobileDeviceLineIcon from '@assets/icons/line/mobile-device.svg?component';
import ModuleIcon from '@assets/icons/line/map-02.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

// filters

import { useFilters } from '../useFilters';
import { useUI } from '@core/storages/ui';

export const LocationList = observer(() => {
  const navigate = useNavigate();
  const filters = useFilters();
  const ui = useUI();

  // toggle

  const toggleButtons = [
    {
      label: t('general.scheme.label', 'Scheme', 'A structured representation of a particular concept.'),
      value: 'scheme',
    },
    { label: t('general.list.label', 'List', 'Collection of items.'), value: 'list' },
  ];

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'scheme':
        navigate(`../locationScheme`);
        break;
      case 'list':
        navigate(`../locationList`);
        break;
    }
  };

  const [selectedVariant, setSelectedVariant] = React.useState('list');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('location.locations.label', 'Locations', 'Locations.')} />
      <Stack direction='row' className={styles['stack']}>
        <SegmentedControl
          aria-label={t(
            'general.screenSelection.label',
            'Screen selection',
            'Process of choosing a particular section of a webpage.',
          )}
          buttons={toggleButtons}
          onChange={onSegmentedControlVariantChange}
          value={selectedVariant}
        />
        <DataSelect
          id='buildings-select'
          onChange={(option) => filters.setFilterBuilding(option)}
          options={filters.buildings}
          placeholder={t('location.buildings.label', 'Buildings', 'Buildings')}
          present={(item) => item?.label}
          value={filters.filterBuilding}
        />
        <DataSelect
          id='spaces-select'
          onChange={(option) => filters.setFilterSpace(option)}
          options={filters.spaces}
          placeholder={t('location.spaces.label', 'Spaces', 'Interiors within a building.')}
          present={(item) => item?.label}
          value={filters.filterSpace}
        />
        <DataSelect
          id='device-category-select'
          onChange={(option) => filters.setFilterDeviceType(option)}
          options={filters.deviceTypes}
          placeholder={`${t('asset.devices.label', 'Devices', 'Devices')}.`}
          present={(item) => item?.label}
          value={filters.filterDeviceType}
        />
      </Stack>
      <UnitContainer>
        <Unit variant='sidebar'>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <CardHeader borderBottom>
              <Search
                disabled
                placeholder={t(
                  'location.searchLocation.label',
                  'Search location',
                  'Action of looking for an area using a search function.',
                )}
              />
            </CardHeader>
            <DataGrid>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody>
                    <DataGridRow className={styles['data-grid-row']}>
                      <DataGridCell>
                        <DataGridCellContent>
                          <Grid alignItems='center'>
                            <Grid item>
                              <Icon className={styles['avatar']} color='secondary' size='lg' variant='tint'>
                                <ZoneLineIcon />
                              </Icon>
                            </Grid>
                            <Grid item>
                              <Headline
                                title={`${t(
                                  'location.zone.label',
                                  'Zone',
                                  'Specific area that is defined for a particular purpose.',
                                )}A`}
                                subtitle='Main therapy rooms'
                                size='dataGrid'
                              />
                            </Grid>
                          </Grid>
                        </DataGridCellContent>
                      </DataGridCell>
                    </DataGridRow>
                  </DataGridBody>
                </Scrollbar>
              </CardContent>
            </DataGrid>
          </Card>
        </Unit>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <CardHeader borderBottom>
              <Grid container spacing={2} justifyContent='between'>
                <Grid item>
                  <Grid alignItems='center'>
                    <Grid item>
                      <Icon className={styles['avatar']} color='secondary' size='lg' variant='tint'>
                        <ZoneLineIcon />
                      </Icon>
                    </Grid>
                    <Grid item>
                      <Headline
                        title={`${t(
                          'location.zone.label',
                          'Zone',
                          'Specific area that is defined for a particular purpose.',
                        )}A`}
                        subtitle='1st Floor, Therapy Block B1, 8A Wellington Pl, London NW8 9LE'
                        size='dataGrid'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button disabled variant='outlined'>
                    {t('general.seeMore.label', 'See More', 'See more button or link.')}
                  </Button>
                </Grid>
              </Grid>
            </CardHeader>
            <Grid container spacing={0} grow>
              <Grid item lg={6}>
                <Card fullHeight fullWidth scrollable>
                  <CardContent className={styles['card-content']} scrollable>
                    <Scrollbar>
                      <Grid container direction='column' spacing={2}>
                        <Grid item>
                          <Box className={styles['map']} />
                        </Grid>
                        <Grid item>
                          <Grid direction='column' fullWidth>
                            <Text variant='sm' weight='bold'>
                              Emergency Сontacts
                            </Text>
                            <Divider className={styles['divider']} />
                            <Grid container wrap='nowrap' justifyContent='between'>
                              <Grid item>
                                <Text color='typography-secondary' className={styles['string-header']}>
                                  Hot line
                                </Text>{' '}
                                <Text>+ 1 (231) 234 3343</Text>
                              </Grid>
                              <Divider orientation='vertical' className={styles['divider-vertical']} />
                              <Grid item>
                                <Text color='typography-secondary' className={styles['string-header']}>
                                  {t('user.admin.label', 'Admin', 'The main controller & manager.')}
                                </Text>{' '}
                                <Text>+ 1 (231) 234 3343</Text>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container direction='column' fullWidth spacing={2}>
                            <Grid item>
                              <Text variant='sm' weight='bold'>
                                {t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.')}
                              </Text>
                            </Grid>
                            <Grid item fullWidth>
                              <Scrollbar className={styles['table']}>
                                <Grid container spacing={2} wrap='wrap'>
                                  {deviceCardContent.map((item) => (
                                    <Grid item lg={6}>
                                      <DeviceCard icon={item.icon} title={item.title} subtitle={item.subtitle} />
                                    </Grid>
                                  ))}
                                </Grid>
                              </Scrollbar>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Scrollbar>
                  </CardContent>
                </Card>
              </Grid>
              <Divider orientation='vertical' flexItem />
              <Grid item lg={6}>
                <Card fullWidth scrollable>
                  <CardHeader borderBottom>
                    <Text variant='sm' weight='bold'>
                      {t('events.eventsHistory.label', 'Events History', 'Events history.')}
                    </Text>
                  </CardHeader>
                  <CardContent fullWidth scrollable>
                    <Scrollbar>
                      <List className={styles['list']}>
                        {eventCardContent.map((item) => (
                          <ListItem key={item.id} className={styles['list-item']} disablePadding>
                            <EventCard
                              severity={item.severity}
                              subtitle={item.subtitle}
                              eventTime={item.eventTime}
                              title={item.title}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Scrollbar>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
});

const deviceCardContent = [
  {
    icon: <HandheldLineIcon />,
    title: t('asset.handheld.label', 'Handheld', 'Handheld device.'),
    subtitle: `2100 ${`${t('asset.devices.label', 'Devices', 'Devices')}.`}`,
  },
  {
    icon: <MobileDeviceLineIcon />,
    title: t('asset.mobile.label', 'Mobile', 'Mobile device.'),
    subtitle: `3506 ${`${t('asset.devices.label', 'Devices', 'Devices')}.`}`,
  },
  {
    icon: <HardDriveLineIcon />,
    title: t('asset.stationary.label', 'Stationary', 'Stationary Device.'),
    subtitle: `340 ${`${t('asset.devices.label', 'Devices', 'Devices')}.`}`,
  },
  {
    icon: <CpuChip01LineIcon />,
    title: t('asset.electronics.label', 'Electronics', ''),
    subtitle: `180 ${t('asset.devices.label', 'Devices', 'Electronics device.')}`,
  },
];

const eventCardContent = [
  {
    id: 1,
    eventTime: '12:50 AM',
    title: 'Bedside Monitor',
    subtitle: t(
      'asset.returnedToDesignatedZone.label',
      'Returned to designated zone',
      'The equipment has been placed back to its specified area.',
    ),
    severity: 'success',
  },
  {
    id: 2,
    eventTime: '12:50 AM',
    title: 'Bedside Monitor',
    subtitle: t('asset.leavingDesignatedZone.label', 'Leaving designated zone', 'Moving out of a specified area.'),
    severity: 'error',
  },
  {
    id: 3,
    eventTime: '12:50 AM',
    title: 'TMS Neuronavigator',
    subtitle: t(
      'asset.trackerLowBattery.label',
      'Tracker low battery',
      'Monitoring tool signaling that its energy source is depleting.',
    ),
    severity: 'warning',
  },
];
