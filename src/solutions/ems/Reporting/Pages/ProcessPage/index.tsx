import { useUI } from '@core/storages/ui';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types
import { Process } from '../../data/process';
import { ProcessEdit } from './ProcessEdit';

// storages
import { useProcess } from '../../storages/controllers/process';
import { useProcessHistory } from '../../storages/controllers/processHistory';

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
import QueryHistoryData from '../../Components/QueryHistoryData';
import { AddProcess } from './AddProcess';
import { Profile } from './Profile';

// icons
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

// data
import { managementSet } from '../../data/managementSelectOption';
import { getPageSwitch } from '../getPageSwitch';

const ProcessPage = () => {
  const ui = useUI();
  const controller = useProcess({
    locationId: ui.currentFormation,
  });

  const list: Process[] | [] | undefined = controller.get({ locationId: ui.currentFormation });

  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState('management');
  const [selectedOptions, setSelectedOptions] = useState(managementSet[2]);

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
          aria-label={t(
            'general.screenSelection.label',
            'Screen selection',
            'Process of choosing a particular section of a webpage.',
          )}
          buttons={pageSwitch.toggleButtons}
          onChange={onSegmentedControlVariantChange}
          value={selectedVariant}
        />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                title={t('ems.process.label', 'Process', 'Process.')}
                titleCaption={list?.length.toString()}
                justifyContent={'start'}
              >
                <Button
                  startIcon={<PlusLineIcon></PlusLineIcon>}
                  onClick={handleClick(<AddProcess onClose={handleClose} />)}
                >
                  {t('ems.addProcess.label', 'Add Process', 'Add Process.')}
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
                      {t('general.name.label', 'Name', 'Name.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('general.name.label', 'Consumption', 'Consumption.')}/
                      {t('general.amount.label', 'Amount', 'Amount.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('ems.emission.label', 'Emission', 'Emission.')}/
                      {t('general.amount.label', 'Amount', 'Amount.')}
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
                        list.map((item, index) => (
                          <DataGridRow
                            key={item.processId}
                            className={styles['data-grid-row']}
                            component={NavLink}
                            to={`${item.processId}`}
                          >
                            {/* Name */}
                            <DataGridCell>
                              <DataGridIconCellContent title={item.name} />
                            </DataGridCell>

                            {/* Consumption  */}
                            <DataGridCell>
                              <DataGridCellContent>
                                <QueryHistoryData
                                  key={`consumption_${item.processId}}`}
                                  locationId={ui.currentFormation}
                                  parameter={'processId'}
                                  parameterId={item.processId}
                                />
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* Parent Location */}
                            <DataGridCell>
                              <DataGridCellContent>
                                <QueryHistoryData
                                  key={`emission${item.processId}}`}
                                  locationId={ui.currentFormation}
                                  parameter={'processId'}
                                  parameterId={item.processId}
                                  showEmission
                                />
                              </DataGridCellContent>
                            </DataGridCell>
                          </DataGridRow>
                        ))
                      )}

                      {list && list?.length < 1 && (
                        <DataNotFound
                          icon={<Settings01LineIcon></Settings01LineIcon>}
                          title={t('ems.noProcess.label', 'No Process', 'Process missing.')}
                          subtitle={t(
                            'ems.noProcessCaption.label',
                            'There are no process here yet. To start adding new process, click “Add Process” button.',
                            'No Process Caption.',
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
                key={item.processId}
                path={`${item.processId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <Profile
                          handleEditProfile={handleClick(state && <ProcessEdit onClose={handleClose} process={item} />)}
                          process={item}
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

export default ProcessPage;
