import React, { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useAuth } from '@core/storages/auth';
import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useUI } from '@core/storages/ui';

// filters

import { useFilterText } from '../filters';

// types

import { AssetGroup } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AddGroup } from '../AddGroup';
import { AssetGroupEditForm } from '@core/ui/cerebro/forms/AssetGroupEditForm';
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
import { GroupEdit } from '../GroupEdit';
import { GroupProfile } from '../GroupProfile';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListDivider } from '@core/ui/components/ListDivider';
import { ListItem } from '@core/ui/components/ListItem';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { PropertiesCard } from '@core/ui/cerebro/PropertiesCard';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
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
import FolderLineIcon from '@assets/icons/line/folder-outlined.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import ModuleIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

export const AssetsGroupSelection = () => {
  const ui = useUI();

  // groups list
  const groups = useAssetGroups({
    locationId: ui.currentFormation, // only as current Formation
  });

  const list = groups.getData();

  // toggle button group

  const navigate = useNavigate();

  const toggleButtons = [
    { label: t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.'), value: 'assets' },
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

  const [selectedVariant, setSelectedVariant] = React.useState('classes');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  // edit profile

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

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  // remove

  const remove = async (group: Partial<AssetGroup>) => {
    await groups.remove(group);
    navigate('../group');
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

  const applyFilters = (list: AssetGroup[]) => {
    let filteredList = list;
    if (filterText) {
      const filter = filterText;
      filteredList = filteredList.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
    }
    return filteredList;
  };

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Assets);

  return (
    <>
      <>
        <Header
          icon={<ModuleIcon />}
          title={t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.')}
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
            inputId='assets-classes-search-input'
            value={filterText}
            onChange={(text) => setFilterText(text)}
            onClear={() => setFilterText('')}
          />
        </Stack>
        <UnitContainer>
          <Unit>
            <Card className={cn(styles['card'])} fullHeight fullWidth scrollable>
              <DataGrid className={styles['data-grid']}>
                <CardHeader
                  borderBottom
                  title={t('general.all.label', 'All', 'Entirety of something.')}
                  titleCaption={list?.length}
                  // action={
                  //   <Stack direction='row' spacing={4}>
                  //     <Button disabled variant='link'>
                  //       Clear
                  //     </Button>
                  //     <Button
                  //       // endIcon={<Chip>2</Chip>}
                  //       onClick={handleFiltersRowToggle}
                  //       startIcon={<FilterLinesLineIcon />}
                  //       variant='outlined'
                  //     >
                  //       Filters
                  //     </Button>
                  //   </Stack>
                  // }
                >
                  {hasEditRights && (
                    <Grid item>
                      <Button
                        onClick={handleClick(<AddGroup onClose={handleClose} />)}
                        startIcon={<PlusLineIcon />}
                        variant='solid'
                      >
                        {t('asset.addClassButton.label', 'Add class', 'Add class button.')}
                      </Button>
                    </Grid>
                  )}
                </CardHeader>
                {/*
                {showFiltersRow && (
                  <DataGridToolbar>
                    <Stack direction='row' fullWidth>
                      <DataSelect
                        className={styles['data-select-grow']}
                        disabled
                        onChange={() => ''}
                        options={[]}
                        placeholder='Location: All'
                        present={(item) => item.title}
                        value={0}
                      />
                      <DataSelect
                        className={styles['data-select-grow']}
                        disabled
                        onChange={() => ''}
                        options={[]}
                        placeholder='Assets: All'
                        present={(item) => item.title}
                        value={0}
                      />
                    </Stack>
                  </DataGridToolbar>
                )} */}
                <DataGridHead>
                  <DataGridRow className={styles['data-grid-row']}>
                    <DataGridCell variant='button'>
                      <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                        {t('asset.name.label', 'Asset Name', 'Asset name.')}
                      </Button>
                    </DataGridCell>
                    <DataGridCell variant='button'>
                      <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                        {t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.')}
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
                          applyFilters(list).map((group: AssetGroup) => (
                            <DataGridRow
                              key={group.groupId}
                              className={styles['data-grid-row']}
                              onClick={() => {
                                navigate(`../group/${group.groupId}`);
                                handleClose();
                              }}
                            >
                              <DataGridCell>
                                <DataGridIconCellContent
                                  startIcon={
                                    <Icon color={group.style as any} size='lg' variant='tint'>
                                      <FolderSolidIcon />
                                    </Icon>
                                  }
                                  title={group.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                  subtitle={
                                    group.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                  }
                                />
                              </DataGridCell>

                              <DataGridCell>
                                <DataGridCellContent>{group.assetsCount}</DataGridCellContent>
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
                                          onClick={handleClick(<GroupEdit onClose={handleClose} group={group} />)}
                                          startIcon={<Edit03LineIcon />}
                                        >
                                          <MenuItemText
                                            title={t(
                                              'asset.editClass.label',
                                              'Edit class',
                                              'Adjusting class configuration.',
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
                                        <MenuItemButton onClick={() => remove(group)} startIcon={<Trash01LineIcon />}>
                                          <MenuItemText
                                            title={t('asset.deleteClass.label', 'Delete class', 'Delete class.')}
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
                            title={t('asset.classesNotFound.label', 'Classes not found', 'No classes data detected.')}
                            subtitle={t(
                              'asset.classesNotFoundCaption.label',
                              'Oops, there are no classes, try release filters or search by another word',
                              'The system found no information related to the classes.',
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
              icon={<FolderLineIcon />}
              title='No Groups'
              subtitle='There are no groups here yet. To start adding new group, click “Add Group” button.'
            /> */}
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
                  key={item.groupId}
                  path={`${item.groupId}`}
                  element={
                    <Unit variant='sidebar'>
                      <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                        {state.open ? (
                          state.component
                        ) : (
                          <GroupProfile
                            handleEditProfile={handleClick(<GroupEdit onClose={handleClose} group={item} />)}
                            group={item}
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
    </>
  );
};
