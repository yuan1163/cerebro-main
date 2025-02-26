import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

// components

import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Unit } from '@core/ui/components/Unit';
import { Card } from '@core/ui/components/Card';
import { DataGrid } from '@core/ui/components/DataGrid';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Stack } from '@core/ui/components/Stack';
import { Button } from '@core/ui/components/Button';
import { DataGridToolbar } from '@core/ui/components/DataGridToolbar';
import { DataSelect } from '@core/ui/components/DataSelect';
import { DataGridHead } from '@core/ui/components/DataGridHead';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { CardContent } from '@core/ui/components/CardContent';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridIconCellContent } from '@core/ui/components/DataGridIconCellContent';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';
import { Profile } from './Profile';
import { DataNotFound } from '@core/ui/components/Feedback/DataNotFound';
import { getmcHomeURL, SegmentedControlButton } from '@solutions/ems/MassConfiguration/data/devices';
import { MCHeader, SegmentedControlObjectProps } from '@solutions/ems/MassConfiguration/Components/MCHeader';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';

// filters

import { useFilters } from './useFilter';

export const DeviceSPSPage = () => {
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

  const [selectedVariant, setSelectedVariant] = useState<string>('sps');
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
        placeholder={t('asset.searchName.label', 'Search name', 'Search device name.')}
        setFilterText={filter.setFilterText}
      />
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('asset.SPS.label', 'SPS', 'SPS.')}
                titleCaption={list?.length?.toString()}
                action={
                  <Stack direction='row' spacing={4}>
                    <Button disabled variant='link'>
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
                  <Stack direction='row' fullWidth />
                </DataGridToolbar>
              )}

              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t(
                        'asset.circuitName.label',
                        'Circuit Name',
                        'The identifier for a specific electrical or network pathway.',
                      )}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.deviceID.label', 'Device ID', 'Device ID.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.SPBType.label', 'SPB type', 'SPB type.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('location.ownerLocation.label', 'Owner Location', 'Location associated with the legal owner.')}
                    </Button>
                  </DataGridCell>
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody>
                    {list.length > 0 ? (
                      list.map((device) => (
                        <DataGridRow
                          key={device.deviceId}
                          className={styles['data-grid-row']}
                          component={NavLink}
                          to={`../sps/${device.deviceId}-${device.index}`}
                        >
                          {/* Name */}

                          <DataGridCell>
                            <DataGridIconCellContent title={device.name} />
                          </DataGridCell>

                          {/* Device ID */}
                          <DataGridCell>
                            <DataGridCellContent>
                              {device.deviceId ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                            </DataGridCellContent>
                          </DataGridCell>

                          {/* SPB type */}
                          <DataGridCell>
                            <DataGridCellContent>
                              {device.SPBType ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                            </DataGridCellContent>
                          </DataGridCell>

                          {/* Owner Location */}
                          <DataGridCell>
                            <DataGridIconCellContent
                              title={device.ownerLocationName}
                              subtitle={`ID: ${device.ownerLocationId}`}
                            />
                          </DataGridCell>
                        </DataGridRow>
                      ))
                    ) : (
                      <DataNotFound
                        icon={<Server01LineIcon />}
                        title={t('asset.noSPB.label', 'No SPB', 'No SPB.')}
                        subtitle={t(
                          'asset.noSPBCaption.label',
                          'There are no SPB here yet. Add SPB to this campus first by uploading a Mass Configuration file.',
                          'No SPB caption.',
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
                  <Card className={styles['card']} fullHeight fullWidth scrollable>
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
                    <Card className={styles['card']} fullHeight fullWidth scrollable>
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
