import React, { useEffect, useState } from 'react';

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

import { useUI } from '@core/storages/ui';
import { Accordion } from '@core/ui/components/Accordion';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataGrid } from '@core/ui/components/DataGrid';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Modal } from '@core/ui/components/Modal';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { ConsumptionChart } from '../../Components/CircuitSummary/ConsumptionChart';
import { HistoricalTrendChart } from '../../Components/CircuitSummary/HistoricalTrendChart';
import { MaximumPowerChart } from '../../Components/CircuitSummary/MaximumPowerChart';
import { getPageSwitch } from '../getPageSwitch';

// icon
import CheckCircleLineIcon from '@assets/icons/line/check-circle.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import RouteLineIcon from '@assets/icons/line/route.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';
import { Checkbox } from '@core/ui/components/Checkbox';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';
import { DataGridHead } from '@core/ui/components/DataGridHead';
import { DataGridIconCellContent } from '@core/ui/components/DataGridIconCellContent';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataGridToolbar } from '@core/ui/components/DataGridToolbar';
import { DataSelect } from '@core/ui/components/DataSelect';
import { DataNotFound } from '@solutions/cerebro/Assets/DataNotFound';

import { useLocations } from '@core/storages/controllers/locations';
import { Toast } from '@core/ui/components/Toast';
import { DevicePartProps, getDeviceCircuit } from '@solutions/ems/MassConfiguration/data/devices';
import { analysisLocationCircuit, CircuitProperty } from '@solutions/ems/storages/analysisCircuit';
import { NavLink } from 'react-router-dom';
import { useFilters } from './useFilter';

function circuitProperty2LocationList(
  circuits: CircuitProperty[] | undefined,
  locations: any,
  deviceParts: DevicePartProps[],
): { locationName: string; circuitList: DeviceParts[] }[] {
  let locationList: { [key: string]: any } = {};
  circuits?.forEach((circuit) => {
    if (locationList.hasOwnProperty(circuit[0])) {
      locationList[circuit[0]]['circuitList'].push(
        deviceParts.find((item) => {
          if (item.deviceId === circuit[1] && item.index === circuit[2]) {
            return item.description;
          } else {
            return undefined;
          }
        }),
      );
    } else {
      locationList[circuit[0]] = {
        'locationName': locations.getElementById(circuit[0]).name,
        'circuitList': [
          deviceParts.find((item) => {
            if (item.deviceId === circuit[1] && item.index === circuit[2]) {
              return item.description;
            } else {
              return undefined;
            }
          }),
        ],
      };
    }
  });

  return Object.values(locationList);
}

const CircuitSummary = () => {
  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState<string>('circuit_summary');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const [settingModalOpen, setSettingModalOpen] = React.useState<boolean>(false);
  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const handleShowSnackbar = () => {
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2500);
  };

  const ui = useUI();
  const locations = useLocations();
  const deviceParts = getDeviceCircuit();

  const controller = analysisLocationCircuit(ui.currentFormation);
  const locationCircuit = controller.analysisCircuit.getLocationCircuit(ui.currentFormation);
  // console.log(locationCircuit);

  const locationList = circuitProperty2LocationList(locationCircuit, locations, deviceParts);
  // console.log(locationList);

  const selectedLocationList: DeviceParts[] = controller.analysisCircuit.searchLocationsCircuit;

  // Modal
  const filter = useFilters();

  let list = filter.filteredList;

  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  const handleSaveSettings = () => {
    controller.updateCircuit(filter.selectedItems);
    setSettingModalOpen(false);
    handleShowSnackbar();
  };

  const [isGetCircuit, setIsGetCircuit] = useState(false);

  useEffect(() => {
    // console.log(selectedLocationList);
    // console.log(filter.selectedItems);
    // console.log(isGetCircuit);

    const isAllUndefined = selectedLocationList.every((e) => e === undefined);

    if (selectedLocationList.length && !isAllUndefined && !filter.selectedItems.length && !isGetCircuit) {
      filter.setSelectedItems(selectedLocationList);
      setIsGetCircuit(!isGetCircuit);
    }
  }, [selectedLocationList]);

  useEffect(() => {
    filter.setSelectedItems(selectedLocationList);
    filter.clearFilters();
  }, [ui.currentFormation]);

  return (
    <>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Stack direction='row' className={styles['stack']}>
            <SegmentedControl
              aria-label='screen selection'
              buttons={pageSwitch.toggleButtons}
              onChange={onSegmentedControlVariantChange}
              value={selectedVariant}
            />
          </Stack>
        </Grid>
        <Grid item>
          <UnitContainer>
            <Unit variant='sidebar' className={cn(styles['summary-unit'], styles['summary-sidebar'])}>
              <Scrollbar>
                <AccordionGroup gap>
                  {locationList.map((loc, index) => (
                    <Accordion
                      key={`circuitSummary.sidebar.${index}`}
                      customTitle={
                        <Text component='h2' variant='lg' weight='semibold'>
                          {loc.locationName}
                        </Text>
                      }
                      disableGutters
                      defaultOpen
                      shadow
                      rounded
                      divider
                      variant='solid'
                    >
                      {loc.circuitList.map((c) => (
                        <Grid alignItems={'center'} className={'p-4'} gap={3}>
                          <Icon variant='tint'>
                            <RouteLineIcon />
                          </Icon>
                          <Text>{c?.description}</Text>
                        </Grid>
                      ))}
                    </Accordion>
                  ))}
                  <Button fullWidth startIcon={<Settings01LineIcon />} onClick={() => setSettingModalOpen(true)}>
                    {t(
                      'general.settings.label',
                      'Settings',
                      'Section or menu where users can configure various preferences.',
                    )}
                  </Button>
                </AccordionGroup>
              </Scrollbar>
            </Unit>
            <Unit height='full' className={styles['summary-unit']}>
              <Scrollbar>
                <Grid className={styles['container']} display='grid' fullHeight>
                  <ConsumptionChart locationList={selectedLocationList} />
                  <MaximumPowerChart locationList={selectedLocationList} />
                  <HistoricalTrendChart locationList={selectedLocationList} />
                </Grid>
              </Scrollbar>
            </Unit>
          </UnitContainer>
          <Modal open={settingModalOpen} onClose={() => setSettingModalOpen(false)}>
            <Card className={styles['card']} fullHeight fullWidth scrollable>
              <CardHeader
                action={
                  <IconButton
                    ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
                    color='icon-secondary'
                    onClick={() => setSettingModalOpen(false)}
                    size='lg'
                    variant='text'
                  >
                    <XCloseLineIcon />
                  </IconButton>
                }
                borderBottom
                headerContentSize='sm'
                size='sm'
                title={t('ems.settingCircuitSummary.label', 'Setting circuit summary', 'Setting circuit summary title')}
              />
              <CardContent disablePadding scrollable>
                <DataGrid className={styles['data-grid']}>
                  <CardHeader
                    borderBottom={!showFiltersRow}
                    title={t(
                      'asset.deviceCircuit.label',
                      'Device Circuit',
                      'A specific electrical pathway within a device, essential for its operation.',
                    )}
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
                  />

                  {showFiltersRow && (
                    <DataGridToolbar>
                      <Stack direction='row' fullWidth>
                        {/* Status */}
                        {/* TODO: */}
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

                        {/*  Location */}
                        <DataSelect
                          className={styles['data-select-grow']}
                          options={filter.filterPartLocationOptions}
                          present={(option) => option.label}
                          placeholder={`${t('location.location.label', 'Location', 'All Location')}: ${t(
                            'general.all.label',
                            'All',
                            'Entirety of something.',
                          )}`}
                          value={filter.filterPartLocation}
                          onChange={(option) => filter.setFilterPartLocation(option)}
                        />
                      </Stack>
                    </DataGridToolbar>
                  )}

                  <DataGridHead>
                    <DataGridRow className={styles['data-grid-row']}>
                      <DataGridCell variant='button'></DataGridCell>
                      <DataGridCell variant='button'>
                        <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                          {t('asset.deviceName.label', 'Name', 'Device name.')}
                        </Button>
                      </DataGridCell>
                      <DataGridCell variant='button'>
                        <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                          {t('location.location.label', 'Location', 'All location')}
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
                          list.map((circuit) => {
                            const selected = filter.isSelected(circuit);
                            return (
                              <DataGridRow
                                key={`${circuit?.deviceId}_${circuit?.index}`}
                                className={styles['data-grid-row']}
                                // component={NavLink}
                                // to={`../list/${device.deviceId}`}
                                onClick={() => filter.handleSelect(circuit)}
                              >
                                <DataGridCell>
                                  <DataGridCellContent>
                                    <Checkbox isChecked={selected} />
                                  </DataGridCellContent>
                                </DataGridCell>

                                {/* Name */}

                                <DataGridCell>
                                  <DataGridIconCellContent
                                    title={
                                      circuit?.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                    }
                                  />
                                </DataGridCell>

                                {/* Location */}

                                <DataGridCell>
                                  <DataGridIconCellContent title={circuit?.partLocationName} />
                                </DataGridCell>
                              </DataGridRow>
                            );
                          })
                        )}
                      </DataGridBody>
                    </Scrollbar>
                  </CardContent>
                </DataGrid>
              </CardContent>
              <CardActions borderTop>
                <div className='flex justify-end gap-2'>
                  <Button onClick={() => setSettingModalOpen(false)} variant='outlined'>
                    {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                  </Button>
                  <Button onClick={handleSaveSettings} variant='solid'>
                    {t('general.saveButton.label', 'Save', 'Save button')}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Modal>

          <Toast
            isShowing={snackOpen}
            message={t('general.updateSuccessfully.label', 'Updated successfully', 'Updated successfully')}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CircuitSummary;
