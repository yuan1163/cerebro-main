import React, { useState } from 'react';
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
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';

// filters
import { useFilters } from './useFilter';

type Props = {};

export const DeviceCircuitPage: React.FC<Props> = () => {
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

  const filter = useFilters();
  const list = filter.filteredList;
  // console.log(list);

  const [selectedVariant, setSelectedVariant] = useState<string>('circuit');
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
        placeholder={t('asset.searchDeviceID.label', 'Search device ID', 'Locate a specific device using its ID.')}
        setFilterText={filter.setFilterText}
      />
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t(
                  'asset.deviceCircuit.label',
                  'Device Circuit',
                  'A specific electrical pathway within a device, essential for its operation.',
                )}
                titleCaption={list?.length?.toString()}
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
              />

              {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    {/* Index */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterIndexOptions}
                      present={(option) => option.label}
                      placeholder={`${t(
                        'location.selectCampusSelectPlaceholder.label',
                        'Select campus',
                        'Select campus select label.',
                      )}: ${t('general.all.label', '', '')}`}
                      value={filter.filterIndex}
                      onChange={(option) => filter.setFilterIndex(option)}
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
                      options={filter.filterPartLocationOptions}
                      present={(option) => option.label}
                      placeholder={`${t(
                        'location.partLocation.label',
                        'Part Location',
                        'Specific place within a larger structure where a component is situated.',
                      )}: ${t('general.all.label', 'All', 'Entirety of something.')}`}
                      value={filter.filterPartLocation}
                      onChange={(option) => filter.setFilterPartLocation(option)}
                    />
                  </Stack>
                </DataGridToolbar>
              )}

              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.deviceID.label', 'Device ID', 'Device ID.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('location.ownerLocation.label', 'Owner Location', 'Location associated with the legal owner.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t(
                        'location.partLocation.label',
                        'Part Location',
                        'Specific place within a larger structure where a component is situated.',
                      )}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('general.description.label', 'Description', 'Outline of a particular item or subject.')}
                    </Button>
                  </DataGridCell>
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGrid>
                    <DataGridBody className='h-full'>
                      {!list ? (
                        <Grid alignItems='center' justifyContent='center' fullHeight>
                          <CircularProgress />
                        </Grid>
                      ) : (
                        list.map((device) => (
                          <DataGridRow
                            key={`${device.deviceId}-${device.index}`}
                            className={styles['data-grid-row']}
                            component={NavLink}
                            to={`../circuit/${device.deviceId}-${device.index}`}
                          >
                            {/* Device ID and Index */}
                            <DataGridCell>
                              <DataGridIconCellContent
                                title={device.deviceId ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                subtitle={`Index: ${
                                  device.index ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                }`}
                              />
                            </DataGridCell>

                            {/* Owner Location */}
                            <DataGridCell>
                              <DataGridIconCellContent
                                title={device.ownerLocationName}
                                subtitle={`ID: ${device.ownerLocationId}`}
                              />
                            </DataGridCell>

                            {/* Part Location */}
                            <DataGridCell>
                              <DataGridIconCellContent
                                title={device.partLocationName}
                                subtitle={`ID: ${device.partLocationId}`}
                              />
                            </DataGridCell>

                            {/* Description */}
                            <DataGridCell>
                              <DataGridCellContent>
                                {device.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                              </DataGridCellContent>
                            </DataGridCell>
                          </DataGridRow>
                        ))
                      )}

                      {list && list?.length < 1 && (
                        <DataNotFound
                          icon={<Server01LineIcon />}
                          title={t(
                            'asset.noDevicePartMapping.label',
                            'No Device Part Mapping',
                            'No device part mapping',
                          )}
                          subtitle={t(
                            'asset.noDevicePartMappingCaption.label',
                            'There are no devices part mapping here yet. Add device part mapping to this campus first by uploading a Mass Configuration file.',
                            'No device part mapping caption.',
                          )}
                        />
                      )}
                    </DataGridBody>
                  </DataGrid>
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
                key={`${item.deviceId}-${item.index}`}
                path={`${item.deviceId}-${item.index}`}
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
