import { useUI } from '@core/storages/ui';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// storages
import { useUnit } from '../../storages/controllers/unit';

//components
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
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectOption } from '@core/ui/components/Select';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { DataNotFound } from '@solutions/cerebro/Assets/DataNotFound';
import QueryHistoryData from '../../Components/QueryHistoryData';
import AddUnit from './AddUnit';
import Profile from './Profile';
import UnitEdit from './UnitEdit';

// icons
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';

// data
import { managementSet } from '../../data/managementSelectOption';
import { getPageSwitch } from '../getPageSwitch';

const UnitPage = () => {
  const ui = useUI();

  const controller = useUnit({
    locationId: ui.currentFormation,
  });

  const list = controller.get({ locationId: ui.currentFormation });

  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState('management');

  const [selectedOptions, setSelectedOptions] = useState(managementSet[1]);

  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const managementChange = (option: SelectOption<number>) => {
    const currentFormationPath = `${ui.activeSolution}/reporting/${ui.currentFormation}`;

    switch (option.label) {
      case 'Product':
        ui.goto(`${currentFormationPath}/management/product`);
        break;
      case 'Unit':
        ui.goto(`${currentFormationPath}/management/unit`);
        break;
      case 'Process':
        ui.goto(`${currentFormationPath}/management/process`);
        break;
      case 'ProcessHistory':
        ui.goto(`${currentFormationPath}/management/processHistory`);
        break;
    }

    setSelectedOptions(option);
  };

  const [state, setState] = React.useState<{
    open: boolean;
    component: React.ReactNode;
  }>({
    open: false,
    component: 'span',
  });

  const handleClick = (component: React.ReactNode) => () => {
    setState({
      open: true,
      component,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <Stack direction='row' className={styles['stack']}>
        <SegmentedControl
          aria-label='screen selection'
          buttons={pageSwitch.toggleButtons}
          onChange={onSegmentedControlVariantChange}
          value={selectedVariant}
        />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader title='Unit' titleCaption={list?.length.toString()} justifyContent={'start'}>
                <Button
                  startIcon={<PlusLineIcon></PlusLineIcon>}
                  onClick={handleClick(<AddUnit onClose={handleClose} />)}
                >
                  Add Unit
                </Button>
                <Grid className={'w-60'}>
                  <DataSelect
                    id={'management-select'}
                    onChange={managementChange}
                    options={managementSet}
                    present={(item) => item?.label}
                    value={selectedOptions}
                  />
                </Grid>
              </CardHeader>

              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      Name
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      Consumption
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      Emission
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
                      list.map((item, index) => (
                        <DataGridRow
                          key={`unit-${item.unitId}`}
                          className={styles['data-grid-row']}
                          component={NavLink}
                          to={`${item.unitId}`}
                        >
                          {/* Name */}

                          <DataGridCell>
                            <DataGridIconCellContent title={item.name} />
                          </DataGridCell>

                          {/* Consumption  */}
                          {/* TODO: */}
                          <DataGridCell>
                            <QueryHistoryData
                              locationId={ui.currentFormation}
                              parameter={'unitId'}
                              parameterId={item.unitId}
                            />
                          </DataGridCell>

                          {/* Parent Location */}
                          {/* TODO: */}
                          <DataGridCell>
                            <QueryHistoryData
                              locationId={ui.currentFormation}
                              parameter={'unitId'}
                              parameterId={item.unitId}
                              showEmission
                            />
                          </DataGridCell>
                        </DataGridRow>
                      ))
                    )}

                    {list && list?.length < 1 && (
                      <DataNotFound
                        icon={<DashboardLineIcon />}
                        title='No Unit'
                        subtitle='There are no unit here yet. To start adding new unit, click “Add Unit” button.'
                      />
                    )}
                  </DataGridBody>
                </Scrollbar>
              </CardContent>
            </DataGrid>
            {/* NO DATA */}
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
                key={item.unitId}
                path={`${item.unitId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <Profile
                          handleEditProfile={handleClick(state && <UnitEdit onClose={handleClose} unit={item} />)}
                          unit={item}
                        />
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

export default UnitPage;
