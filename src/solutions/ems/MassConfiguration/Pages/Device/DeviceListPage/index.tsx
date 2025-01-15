import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { DataGrid } from '@core/ui/components/DataGrid';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';
import { DataGridHead } from '@core/ui/components/DataGridHead';
import { DataGridIconCellContent } from '@core/ui/components/DataGridIconCellContent';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataGridToolbar } from '@core/ui/components/DataGridToolbar';
import { DataSelect } from '@core/ui/components/DataSelect';
import { DataNotFound } from '@core/ui/components/Feedback/DataNotFound';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { MCHeader, SegmentedControlObjectProps } from '@solutions/ems/MassConfiguration/Components/MCHeader';
import { getmcHomeURL, SegmentedControlButton } from '@solutions/ems/MassConfiguration/data/devices';
import { Profile } from './Profile';

// icons
import CheckCircleLineIcon from '@assets/icons/line/check-circle.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import InfoCircleLineIcon from '@assets/icons/line/info-circle.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';
import XCircleLineIcon from '@assets/icons/line/x-circle.svg?component';

// filters

import { useFilters } from './useFilter';

type Props = {};

export const DeviceListPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const toggleLists = (button?: string) => {
    switch (button) {
      case 'list':
        navigate(`../list`);
        break;
      case 'circuit':
        navigate(`../circuit`);
        break;
      case 'sps':
        navigate(`../sps`);
        break;
    }
  };

  // Text
  const filter = useFilters();
  const list = filter.filteredList;

  const connectionStatusInfo: Record<number, { icon: React.ReactNode; label: string }> = {
    0: {
      icon: (
        <Icon variant='plain' color={'warning'}>
          <InfoCircleLineIcon />
        </Icon>
      ),
      label: t('events.unknown.label', 'Unknown', 'Unknown notification.'),
    },
    1: {
      icon: (
        <Icon variant='plain' color={'success'}>
          <CheckCircleLineIcon />
        </Icon>
      ),
      label: t('events.normal.label', 'Normal', 'Normal notification.'),
    },
    2: {
      icon: (
        <Icon variant='plain' color={'error'}>
          <XCircleLineIcon />
        </Icon>
      ),
      label: t('events.events.label', 'Disconnect', 'Disconnect notification.'),
    },
  };

  const [selectedVariant, setSelectedVariant] = useState<string>('list');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  const SegmentedControlObject: SegmentedControlObjectProps = {
    buttons: SegmentedControlButton,
    onChange: onSegmentedControlVariantChange,
    value: selectedVariant,
  };

  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  const [state, setState] = useState<{
    open: boolean;
    component: React.ReactNode;
  }>({
    open: false,
    component: 'span',
  });

  return (
    <>
      <MCHeader
        previousPageURL={getmcHomeURL()}
        SegmentedControlObject={SegmentedControlObject}
        placeholder={t('asset.searchDevice.label', 'Search device', 'Search device.')}
        setFilterText={filter.setFilterText}
      />
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('asset.deviceList.label', 'Device List', 'Device List')}
                titleCaption={list.length.toString()}
                action={
                  <Stack direction='row' spacing={4}>
                    <Button disabled={!filter.clearFilter} variant='link' onClick={filter.clearFilters}>
                      {t('general.clearButton.label', 'Clear', 'Clear button.')}
                    </Button>
                    <Button onClick={handleFiltersRowToggle} startIcon={<FilterLinesLineIcon />} variant='outlined'>
                      {t(
                        'general.filters.label',
                        'Filters',
                        'Various options hat users can apply to refine the displayed content.',
                      )}
                    </Button>
                  </Stack>
                }
                children={
                  <DataSelect
                    placeholder={t(
                      'location.selectCampusSelectPlaceholder.label',
                      'Select campus',
                      'Select campus select label.',
                    )}
                    options={filter.campusOptions}
                    present={(option) => option.label}
                    value={filter.selectedCampusOptions}
                    onChange={(option) => filter.setSelectedCampusOptions(option)}
                  />
                }
              ></CardHeader>

              {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    {/* Device Type */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterDeviceTypeOptions}
                      present={(option) => option.label}
                      placeholder={`${t('asset.deviceType.label', 'Device Type', 'Device type.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filter.filterDeviceType}
                      onChange={(option) => filter.setFilterDeviceType(option)}
                    />

                    {/* Owner Location */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterOwnerLocationOptions}
                      present={(option) => option.label}
                      placeholder={`${t(
                        'location.ownerLocation.label',
                        'Owner Location',
                        'Location associated with the legal owner.',
                      )}: ${t('general.all.label', 'All', 'Entirety of something.')}`}
                      value={filter.filterOwnerLocation}
                      onChange={(option) => filter.setFilterOwnerLocation(option)}
                    />

                    {/* Status */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterStatusOptions}
                      present={(option) => option.label}
                      placeholder={`${t('issue.status.label', 'Status', "Issue's status.")}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filter.filterStatus}
                      onChange={(option) => filter.setFilterStatus(option)}
                    />
                  </Stack>
                </DataGridToolbar>
              )}

              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.deviceName.label', 'Name', 'Device name.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.deviceType.label', 'Device Type', 'Device type.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('location.ownerLocation.label', 'Owner Location', 'Location associated with the legal owner.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('issue.status.label', 'Status', "Issue's status.")}
                    </Button>
                  </DataGridCell>
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody className='h-full'>
                    {!list ? (
                      <Grid alignItems='center' justifyContent='center' fullHeight>
                        <CircularProgress />
                      </Grid>
                    ) : (
                      list.map((device) => (
                        <DataGridRow
                          key={device.deviceId}
                          className={styles['data-grid-row']}
                          component={NavLink}
                          to={`../list/${device.deviceId}`}
                        >
                          {/* Name */}

                          <DataGridCell>
                            <DataGridIconCellContent title={device.name} subtitle={`ID: ${device.deviceId}`} />
                          </DataGridCell>

                          {/* Type */}

                          <DataGridCell>
                            <DataGridCellContent>
                              {device.deviceType ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                            </DataGridCellContent>
                          </DataGridCell>

                          {/* Owner Location */}

                          <DataGridCell>
                            <DataGridIconCellContent
                              title={device.ownerLocationName}
                              subtitle={`ID: ${device.ownerLocationId}`}
                            />
                          </DataGridCell>

                          {/* Connection status */}

                          <DataGridCell>
                            <DataGridIconCellContent
                              startIcon={connectionStatusInfo[device.connectionStatus].icon}
                              title={connectionStatusInfo[device.connectionStatus].label}
                            />
                          </DataGridCell>
                        </DataGridRow>
                      ))
                    )}

                    {list && list?.length < 1 && (
                      <DataNotFound
                        icon={<Server01LineIcon />}
                        title={t('asset.noDevices.label', 'No Devices', 'No devices.')}
                        subtitle={t(
                          'asset.noDevicePartMappingCaption.label',
                          'There are no devices part mapping here yet. Add device part mapping to this campus first by uploading a Mass Configuration file.',
                          'No device part mapping caption.',
                        )}
                      />
                    )}
                  </DataGridBody>
                </Scrollbar>
              </CardContent>
            </DataGrid>
          </Card>
        </Unit>
        <Routes>
          <Route
            path='/'
            element={
              state.open && (
                <Unit variant='sidebar'>
                  <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                    {state.component}
                  </Card>
                </Unit>
              )
            }
          />
          {list &&
            list.map((item) => (
              <Route
                key={item.deviceId}
                path={`${item.deviceId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? state.component : <Profile device={item} />}
                    </Card>
                  </Unit>
                }
              />
            ))}
        </Routes>
      </UnitContainer>
    </>
  );
};
