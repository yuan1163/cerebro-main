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
import { useProduct, useProducts } from '../../storages/controllers/product';

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
import { Icon } from '@core/ui/components/Icon';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectOption } from '@core/ui/components/Select';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { DataNotFound } from '@solutions/cerebro/Assets/DataNotFound';
import { AddProduct } from './AddProduct';
import { ProductEdit } from './ProductEdit';
import Profile from './Profile';

// icons
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';

// data
import { Avatar } from '@core/ui/components/Avatar';
import QueryHistoryData from '../../Components/QueryHistoryData';
import { managementSet } from '../../data/managementSelectOption';
import { getPageSwitch } from '../getPageSwitch';

const ProductPage = () => {
  const ui = useUI();
  const products = useProducts({
    locationId: ui.currentFormation,
  });

  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState('management');
  const list = products.getData();

  const [selectedOptions, setSelectedOptions] = useState(managementSet[0]);

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

  // console.log(controller.getImage());

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
              <CardHeader title='Product' titleCaption={list?.length.toString()} justifyContent={'start'}>
                <Button
                  startIcon={<PlusLineIcon></PlusLineIcon>}
                  onClick={handleClick(<AddProduct onClose={handleClose} />)}
                >
                  {/* Add Product */}
                  {t('ems.addProductButton.label', 'Add Product', 'AddProduct')}
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
                      {/* Name */}
                      {t('ems.productName.label', 'Product Name', 'Product Name')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {/* Consumption/amount */}
                      {t('ems.consumptionAmount.label', 'consumption/amount', 'consumption/amount')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {/* Emission/amount */}
                      {t('ems.emissionAmount.label', 'Emission/amount', 'Emission/amount')}
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
                          key={item.productId}
                          className={styles['data-grid-row']}
                          component={NavLink}
                          to={`${item.productId}`}
                        >
                          {/* Name */}

                          <DataGridCell>
                            <DataGridIconCellContent
                              startIcon={
                                <Avatar className={styles['avatar']} size='2xl' stillLife src={item.files?.[0].url} />
                              }
                              title={item.name}
                            />
                          </DataGridCell>

                          {/* Consumption  */}
                          <DataGridCell>
                            <DataGridCellContent>
                              <QueryHistoryData
                                key={`consumption_${item.productId}}`}
                                locationId={ui.currentFormation}
                                parameter={'productId'}
                                parameterId={item.productId}
                              />
                            </DataGridCellContent>
                          </DataGridCell>

                          {/* Emission */}
                          <DataGridCell>
                            <DataGridCellContent>
                              <QueryHistoryData
                                key={`consumption_${item.productId}}`}
                                locationId={ui.currentFormation}
                                parameter={'productId'}
                                parameterId={item.productId}
                                showEmission
                              />
                            </DataGridCellContent>
                          </DataGridCell>
                        </DataGridRow>
                      ))
                    )}

                    {list && list?.length < 1 && (
                      <DataNotFound
                        icon={<DashboardLineIcon></DashboardLineIcon>}
                        title='No Product'
                        subtitle='There are no product here yet. To start adding new product, click “Add Product” button.'
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
                key={item.productId}
                path={`${item.productId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <Profile
                          handleEditProfile={handleClick(state && <ProductEdit onClose={handleClose} product={item} />)}
                          product={item}
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
export default ProductPage;
