import React, { useState } from 'react';

// storage

import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// utils

import { t } from '@core/utils/translate';

// components
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
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
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { MCHeader } from '@solutions/ems/MassConfiguration/Components/MCHeader';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Profile } from './Profile';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SolutionsMasks } from '@core/ui/types';
import { Stack } from '@core/ui/components/Stack';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { useFilterParentLocation, useFilterSolution, useFilterText, useFilterType } from './filter';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import MarkerPin01SolidIcon from '@assets/icons/solid/marker-pin-01.svg?component';

// filters

import { useFilters } from './useFilter';

export const Location = () => {
  const filter = useFilters();
  const list = filter.filteredList;
  const ui = useUI();

  const mcHomeURL = `/ems/mass_config/${ui.currentFormation}`;
  const locationColor: Record<number, string> = {
    2: 'default',
    3: 'warning',
    4: 'error',
    5: 'success',
  };

  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  const [state, setState] = React.useState<{
    open: boolean;
    component: React.ReactNode;
  }>({
    open: false,
    component: 'span',
  });

  return (
    <>
      <MCHeader
        previousPageURL={mcHomeURL}
        placeholder={t(
          'location.searchLocation.label',
          'Search location',
          'Action of looking for an area using a search function.',
        )}
        setFilterText={filter.setFilterText}
      />
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('location.location.label', 'Location', 'Location title.')}
                titleCaption={list?.length.toString()}
                action={
                  <Stack direction='row' spacing={4}>
                    {/* <Button disabled variant='link' onClick={clearFilters}> */}
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
              ></CardHeader>

              {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    {/* Type */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterTypeOptions}
                      present={(option) => option.label}
                      placeholder={`${t(
                        'location.parentLocation.label',
                        'Parent Location',
                        'Higher-level geographical area that contains a subordinate or more specific location.',
                      )}: ${t('general.all.label', 'All', 'Entirety of something.')}`}
                      value={filter.filterType}
                      onChange={(option) => filter.setFilterType(option)}
                    />
                    {/* Parent Location */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterParentLocationOptions}
                      present={(option) => option.label}
                      placeholder={`${t('location.type.label', 'Type', 'Type of location.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filter.filterParentLocation}
                      onChange={(option) => filter.setFilterParentLocation(option)}
                    />

                    {/* Solution */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filter.filterSolutionOptions}
                      present={(option) => option.label}
                      placeholder={`${t('solutions.solution.label', 'Solution', 'Solution.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filter.filterSolution}
                      onChange={(option) => filter.setFilterSolution(option)}
                    />
                  </Stack>
                </DataGridToolbar>
              )}

              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('location.name.label', 'Name', 'Name of the location.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('location.type.label', 'Type', 'Type of location.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t(
                        'location.parentLocation.label',
                        'Parent Location',
                        'Higher-level geographical area that contains a subordinate or more specific location.',
                      )}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('solutions.solution.label', 'Solution', 'Solution.')}
                    </Button>
                  </DataGridCell>
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody>
                    {!list ? (
                      <Grid alignItems='center' justifyContent='center' fullHeight>
                        <CircularProgress />
                      </Grid>
                    ) : (
                      list.map((location) => (
                        <DataGridRow
                          key={location.locationId}
                          className={styles['data-grid-row']}
                          component={NavLink}
                          to={`../location/${location.locationId}`}
                        >
                          {/* Name */}

                          <DataGridCell>
                            <DataGridIconCellContent
                              startIcon={
                                <Icon rounded variant='tint' color={locationColor[location.type]}>
                                  <MarkerPin01SolidIcon />
                                </Icon>
                              }
                              title={location.name}
                              subtitle={`ID: ${location.locationId}`}
                            />
                          </DataGridCell>

                          {/* Type */}

                          <DataGridCell>
                            <DataGridCellContent>
                              {location.type ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                            </DataGridCellContent>
                          </DataGridCell>

                          {/* Parent Location */}

                          <DataGridCell>
                            <DataGridIconCellContent
                              title={location.parentName}
                              subtitle={`ID: ${location.parentId}`}
                            />
                          </DataGridCell>

                          {/* Solution */}

                          <DataGridCell>
                            <DataGridCellContent>
                              <Stack direction='row'>
                                <Chip key={location.branchSolutions} color={'primary'}>
                                  {(location.branchSolutions & SolutionsMasks.cerebro) !== 0 &&
                                    t('solutions.pinPoint.label', 'PinPoint', 'Title of PinPoint Solution.')}
                                  {(location.branchSolutions & SolutionsMasks.utilus) !== 0 &&
                                    t('solutions.utilus.label', 'Utilus', 'Title of Utilus Solution.')}
                                  {(location.branchSolutions & SolutionsMasks.ai) !== 0 &&
                                    t('solutions.ai.label', 'AI', 'Title of AI Solution.')}
                                  {(location.branchSolutions & SolutionsMasks.connect) !== 0 &&
                                    t('solutions.connects.label', 'Connects', 'Title of Connects Solution.')}
                                  {(location.branchSolutions & SolutionsMasks.ems) !== 0 &&
                                    t('solutions.ems.label', 'EMS', 'Title of EMS Solution.')}
                                </Chip>
                              </Stack>
                            </DataGridCellContent>
                          </DataGridCell>
                        </DataGridRow>
                      ))
                    )}
                  </DataGridBody>
                </Scrollbar>
              </CardContent>
            </DataGrid>
            {/*
            <DataNotFound
              icon={<Users01LineIcon />}
              title='No Users'
              subtitle='There are no users here yet. To start adding new users, click “Add User” button.'
            /> */}
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
                key={item.locationId}
                path={`${item.locationId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <Profile location={item} locationColor={locationColor[item.type]} />
                      )}
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
