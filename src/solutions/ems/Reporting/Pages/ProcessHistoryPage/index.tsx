import { useUI } from '@core/storages/ui';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import moment from 'moment';
import React, { useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

// storages
import { useProcess } from '../../storages/controllers/process';
import { useProcessHistory } from '../../storages/controllers/processHistory';
import { useUnit } from '../../storages/controllers/unit';

// types
import { ProcessHistory } from '../../data/processHistory';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

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
import { DataNotFound } from '@core/ui/components/Feedback/DataNotFound';
import { Grid } from '@core/ui/components/Grid';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectOption } from '@core/ui/components/Select';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { AddProcessHistory } from './AddProcessHistory';
import { ProcessHistoryEdit } from './ProcessHistoryEdit';
import { Profile } from './Profile';

// icons
import CalendarLineIcon from '@assets/icons/line/calendar.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';

// data
import { managementSet } from '../../data/managementSelectOption';
import { getPageSwitch } from '../getPageSwitch';

const ProcessHistoryPage = () => {
  const ui = useUI();
  const controller = useProcessHistory({
    locationId: ui.currentFormation,
  });

  const unitController = useUnit({
    locationId: ui.currentFormation,
  });

  const processController = useProcess({
    locationId: ui.currentFormation,
  });

  const unit = unitController.get({
    locationId: ui.currentFormation,
  });

  const process = processController.get({
    locationId: ui.currentFormation,
  });

  const list: ProcessHistory[] | [] | undefined = controller.get({ locationId: ui.currentFormation });

  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState('management');
  const [selectedOptions, setSelectedOptions] = useState(managementSet[3]);

  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const managementChange = (option: SelectOption<number>) => {
    // 將狀態更新延遲到下一個事件循環中執行，而不是在渲染過程中
    setTimeout(() => {
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
    }, 0);
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
              <CardHeader title='History' titleCaption={list?.length.toString()} justifyContent={'start'}>
                <Button
                  startIcon={<PlusLineIcon></PlusLineIcon>}
                  onClick={handleClick(<AddProcessHistory onClose={handleClose} unit={unit} />)}
                >
                  Add History
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
                      Unit Process
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      Date
                    </Button>
                  </DataGridCell>
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGrid>
                    <DataGridBody className='h-full'>
                      {!list || !unit || !process ? (
                        <Grid alignItems='center' justifyContent='center' fullHeight>
                          <CircularProgress />
                        </Grid>
                      ) : (
                        list.map((item, index) => {
                          const filter_unit = unit?.filter((u) => u.unitId === item.unitId)[0];
                          const filter_process = process?.filter((p) => p.processId === item.processId)[0];

                          return (
                            <DataGridRow
                              key={item.historyId}
                              className={styles['data-grid-row']}
                              component={NavLink}
                              to={`${item.historyId}`}
                            >
                              {/* Unit Process */}
                              <DataGridCell>
                                <DataGridIconCellContent
                                  title={filter_unit ? filter_unit.name : 'n/a'}
                                  subtitle={filter_process ? filter_process.name : 'n/a'}
                                />
                              </DataGridCell>

                              {/* Date  */}
                              <DataGridCell>
                                <DataGridCellContent>
                                  {moment(item.startDateMs).format('YYYY-MM-DD HH:mm:ss')} ~{' '}
                                  {moment(item.endDateMs).format('YYYY-MM-DD HH:mm:ss')}
                                </DataGridCellContent>
                              </DataGridCell>
                            </DataGridRow>
                          );
                        })
                      )}

                      {list && list?.length < 1 && (
                        <DataNotFound
                          icon={<CalendarLineIcon></CalendarLineIcon>}
                          title='No History'
                          subtitle='There are no process history here yet. To start adding new history, click “Add History” button.'
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
            list.map((item) => {
              const filter_unit = unit?.filter((u) => u.unitId === item.unitId)[0];
              const filter_process = process?.filter((p) => p.processId === item.processId)[0];

              return (
                <Route
                  key={item.historyId}
                  path={`${item.historyId}`}
                  element={
                    <Unit variant='sidebar'>
                      <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                        {state.open ? (
                          state.component
                        ) : (
                          <Profile
                            handleEditProfile={handleClick(
                              state && <ProcessHistoryEdit onClose={handleClose} processHistory={item} unit={unit} />,
                            )}
                            unit={filter_unit}
                            process={filter_process}
                            processHistory={item}
                          />
                        )}
                      </Card>
                    </Unit>
                  }
                />
              );
            })}
        </Routes>
      </UnitContainer>
    </>
  );
};

export default ProcessHistoryPage;
