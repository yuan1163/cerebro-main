import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useAsset, useAssets } from '@core/storages/controllers/assets';
import { useAuth } from '@core/storages/auth';
import { useFilterClass, useFilterCostRange, useFilterManufacturer, useFilterText } from './filters';

// types

import { Asset, AssetGroup } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AddAsset } from './AddAsset';
import { AssetEdit } from './AssetEdit';
import { AssetEditForm } from '@core/ui/cerebro/forms/AssetEditForm';
import { AssetsDataGrid } from './AssetsDataGrid';
import { Avatar } from '@core/ui/components/Avatar';
import { Badge } from '@core/ui/components/Badge';
import { Box } from '@core/ui/components/Box';
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
import { DataNotFound } from '@core/ui/components/Feedback/DataNotFound';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { NavLink } from 'react-router-dom';
import { Profile } from './Profile';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Select, SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Toast } from '@core/ui/components/Toast';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import Edit03LineIcon from '@assets/icons/line/edit-03.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import LineChartUp04Icon from '@assets/icons/line/line-chart-up-04.svg?component';
import ModuleIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

export const AssetsPage = observer(() => {
  const ui = useUI();

  // const [filterText, setFilterText] = React.useState<string | undefined>(undefined);
  // const [filterGroup, setFilterGroup] = React.useState<AssetGroup | undefined>(undefined);

  // assets list
  const assets = useAssets({
    locationId: ui.currentFormation, // only as current Formation
    fileName: 'image',
    // searchBy: filterText ? `*${filterText}*` : undefined,
    // groupId: filterGroup?.groupId,
  });

  const list = assets.getData();

  // edit assets

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

  // delete asset

  const remove = async (asset: Partial<Asset>) => {
    await assets.remove(asset);
    navigate('../asset');
  };

  // toggle

  const navigate = useNavigate();

  const toggleButtons = [
    { label: t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.'), value: 'assets' },
    { label: t('asset.classes.label', 'Classes', 'Categories of assets.'), value: 'classes' },
  ];

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'assets':
        navigate(`../asset`);
        break;
      case 'classes':
        navigate(`../group`);
        break;
    }
  };

  const [selectedVariant, setSelectedVariant] = React.useState('assets');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  // snackbar

  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const handleShowSnackbar = () => {
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2500);
  };

  // frontend filters
  // search by

  const { filterText, setFilterText } = useFilterText();

  // groups list

  const { filterClassOptions, filterClass, setFilterClass } = useFilterClass();

  // cost range

  const { filterCostRangeOptions, filterCostRange, setFilterCostRange } = useFilterCostRange(list);
  // manufacturer

  const { filterManufaturerOptions, filterManufacturer, setFilterManufacturer } = useFilterManufacturer(list);

  const filters = !!filterClass.value || !!filterCostRange.value || !!filterManufacturer.value;

  const clearFilters = () => {
    setFilterClass({
      value: undefined,
      label: `${t('asset.classes.label', 'Classes', 'Categories of assets.')}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    });
    setFilterCostRange({
      value: undefined,
      label: `${t('asset.costRange.label', 'Cost Range', 'Cost range of device.')}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    });
    setFilterManufacturer({
      value: undefined,
      label: `${t('asset.manufacturer.label', 'Manufacturer', "Device's manufacturer.")}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    });
  };

  const applyFilters = (list: Asset[]) => {
    let filteredList = list;
    if (filterText) {
      const filter = filterText;
      filteredList = filteredList.filter((asset) => asset.name.toLowerCase().includes(filter.toLowerCase()));
    }
    if (filterCostRange.value) {
      const filter = filterCostRange.value;
      filteredList = filteredList.filter((asset) => asset.costRange == filter);
    }
    if (filterManufacturer.value) {
      const filter = filterManufacturer.value;
      filteredList = filteredList.filter((asset) => asset.manufacturer == filter);
    }
    if (filterClass.value) {
      const filter = filterClass.value.groupId;
      filteredList = filteredList.filter(
        (asset) => asset.groups && asset.groups.some((group) => group.groupId === filter),
      );
    }
    return filteredList;
  };

  const filtersCount =
    Number(Boolean(filterClass?.value)) +
    Number(Boolean(filterCostRange?.value)) +
    Number(Boolean(filterManufacturer?.value));

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Assets);

  return (
    <>
      <Header
        icon={<ModuleIcon />}
        title={t('general.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.')}
      />
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
        <Search
          inputId='assets-search-input'
          value={filterText}
          onChange={(text) => setFilterText(text)}
          onClear={() => setFilterText('')}
        />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              {/* title='All' */}
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('general.all.label', 'All', 'ALL')}
                titleCaption={applyFilters(list)?.length}
                action={
                  <Stack direction='row' spacing={4}>
                    {filters && (
                      <Button onClick={clearFilters} variant='link'>
                        {t('general.clearButton.label', 'Clear', 'Clear button.')}
                      </Button>
                    )}
                    <Button
                      endIcon={
                        filtersCount === 0 ? null : (
                          <Badge color='primary' shape='rounded' size='sm' variant='tint'>
                            {filtersCount}
                          </Badge>
                        )
                      }
                      onClick={handleFiltersRowToggle}
                      startIcon={<FilterLinesLineIcon />}
                      variant='outlined'
                    >
                      {t(
                        'general.filters.label',
                        'Filters',
                        'Various options hat users can apply to refine the displayed content.',
                      )}
                    </Button>
                  </Stack>
                }
              >
                {hasEditRights && (
                  <Grid item>
                    <Button
                      onClick={handleClick(<AddAsset onClose={handleClose} />)}
                      startIcon={<PlusLineIcon />}
                      variant='solid'
                    >
                      {t('asset.addAssetButton.label', 'Add asset', 'Add asset button.')}
                    </Button>
                  </Grid>
                )}
              </CardHeader>
              {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filterCostRangeOptions}
                      present={(option) => option.label}
                      placeholder={`${t('asset.costRange.label', 'Cost Range', 'Cost range of device.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filterCostRange}
                      onChange={(option) => setFilterCostRange(option)}
                    />
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filterManufaturerOptions}
                      present={(option) => option.label}
                      placeholder={`${t('asset.manufacturer.label', 'Manufacturer', "Device's manufacturer.")}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filterManufacturer}
                      onChange={(option) => setFilterManufacturer(option)}
                    />
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={filterClassOptions}
                      present={(option) => option.label}
                      placeholder={`${t('asset.class.label', 'Class', 'Category of assets.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      value={filterClass}
                      onChange={(option) => setFilterClass(option)}
                    />
                  </Stack>
                </DataGridToolbar>
              )}
              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.name.label', 'ASSET NAME', 'asset name')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('asset.classes.label', 'ASSET CLASSES', 'asset classes')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='icon' />
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
                        applyFilters(list).map((asset) => (
                          <DataGridRow
                            key={asset.assetId}
                            className={styles['data-grid-row']}
                            onClick={() => {
                              navigate(`../asset/${asset.assetId}`);
                              handleClose();
                            }}
                          >
                            <DataGridCell>
                              <DataGridIconCellContent
                                startIcon={<Avatar src={asset.files?.[0].url} stillLife size='xl' />}
                                title={asset.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                subtitle={
                                  asset.serialNumber ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                }
                              />
                            </DataGridCell>

                            <DataGridCell>
                              <DataGridCellContent>
                                <Stack direction='row'>
                                  {asset.groups?.slice(0, 2).map((item: any) => (
                                    <Chip key={item.groupId} color={item.style} uppercase>
                                      {item?.name}
                                    </Chip>
                                  ))}
                                  {asset.groups?.length > 2 && (
                                    <Menu
                                      button={
                                        <Chip color='secondary' component='button'>
                                          +{asset?.groups?.length - 2}
                                        </Chip>
                                      }
                                      placement='bottom-end'
                                    >
                                      <MenuList>
                                        {asset?.groups?.slice(2).map((item: any, index) => (
                                          <MenuItem>
                                            <Chip key={index} color={item.style} uppercase>
                                              {item?.name}
                                            </Chip>
                                          </MenuItem>
                                        ))}
                                      </MenuList>
                                    </Menu>
                                  )}
                                </Stack>
                              </DataGridCellContent>
                            </DataGridCell>

                            <DataGridCell variant='icon'>
                              {hasEditRights && (
                                <Menu
                                  button={
                                    <IconButton
                                      ariaLabel={t('general.menu.label', 'Menu', 'User Interface Navigation Menu.')}
                                      component='div'
                                      variant='text'
                                    >
                                      <DotsVerticalLineIcon />
                                    </IconButton>
                                  }
                                  placement='bottom-end'
                                >
                                  <MenuList>
                                    <MenuItem>
                                      <MenuItemButton
                                        onClick={handleClick(<AssetEdit onClose={handleClose} asset={asset} />)}
                                        startIcon={<Edit03LineIcon />}
                                      >
                                        <MenuItemText
                                          title={t(
                                            'asset.editAsset.label',
                                            'Edit asset',
                                            'Adjusting asset configuration.',
                                          )}
                                        />
                                      </MenuItemButton>
                                    </MenuItem>
                                    <MenuItem>
                                      <MenuItemButton
                                        onClick={() => {
                                          navigator.clipboard.writeText(window.location.href), handleShowSnackbar();
                                        }}
                                        startIcon={<Copy04LineIcon />}
                                      >
                                        <MenuItemText
                                          title={t(
                                            'general.copyLink.label',
                                            'Copy link',
                                            'Action that allows to duplicate a web link or URL.',
                                          )}
                                        />
                                      </MenuItemButton>
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem>
                                      <MenuItemButton onClick={() => remove(asset)} startIcon={<Trash01LineIcon />}>
                                        <MenuItemText
                                          title={t('asset.deleteAsset.label', 'Delete asset', 'Delete asset.')}
                                        />
                                      </MenuItemButton>
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              )}
                            </DataGridCell>
                          </DataGridRow>
                        ))
                      )}
                      {applyFilters(list)?.length < 1 && (
                        <DataNotFound
                          title={t('asset.assetsNotFound.label', 'Assets not found', 'No asset data detected.')}
                          subtitle={t(
                            'asset.assetsNotFoundCaption.label',
                            'Oops, there are no assets, try release filters or search by another word',
                            "The system couldn't find any information related to assets.",
                          )}
                        />
                      )}
                    </DataGridBody>
                  </DataGrid>
                </Scrollbar>
              </CardContent>
            </DataGrid>
            {/* NO DATA */}
            {/* <DataNotFound
              icon={<LineChartUp04Icon />}
              title='Assets not found'
              subtitle='Oops, there are no assets, try release filters or search by another word.'
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
                key={item.assetId}
                path={`${item.assetId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <Profile
                          handleEditAsset={handleClick(<AssetEdit onClose={handleClose} asset={item} />)}
                          asset={item}
                        />
                      )}
                    </Card>
                  </Unit>
                }
              />
            ))}
        </Routes>
      </UnitContainer>
      <Toast
        isShowing={snackOpen}
        message={t(
          'general.copyLinkSuccess.label',
          'Copied to clipboard!',
          'Desired content has been successfully copied.',
        )}
      />
    </>
  );
});
