import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';

// types

import { User, UserPermissions } from '@core/api/types';

// storages

import { useAuth } from '@core/storages/auth';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AddGroup } from '../AddGroup';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Chip } from '@core/ui/components/Chip';
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
import { Header } from '@core/ui/utilus/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import Edit02LineIcon from '@assets/icons/line/edit-02.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import FolderLineIcon from '@assets/icons/line/folder-outlined.svg?component';
import ModuleIcon from '@assets/icons/line/users-01.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

type GroupSelectionProps = {
  groupList?: UserGroupsQuery['userGroups'];
  item?: ElementOf<UserGroupsQuery['userGroups']>;
  list?: UserGroupsQuery['userGroups'];
};

export const GroupSelection: React.FC<GroupSelectionProps> = ({ list, item, groupList }) => {
  // toggle button group

  const navigate = useNavigate();

  const toggleButtons = [
    { label: t('user.contacts.label', 'Contacts', 'User contacts.'), value: 'users' },
    { label: t('user.groups.label', 'Groups', 'User groups.'), value: 'groups' },
  ];

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'users':
        navigate(`../user`);
        break;
      case 'groups':
        navigate(`../group`);
        break;
    }
  };

  const [selectedVariant, setSelectedVariant] = React.useState('groups');
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

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  return (
    <>
      <Header icon={<ModuleIcon />} widget={false} title={t('user.usersTitle.label', 'Users', 'Users Title.')} />
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
        <Search />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <DataGridToolbar>
                <Grid container direction='column' grow spacing={4}>
                  <Grid item>
                    <Grid alignItems='center' container justifyContent='between' spacing={2}>
                      <Grid item>
                        <Grid alignItems='center' container spacing={4}>
                          <Grid item>
                            <Grid alignItems='baseline'>
                              <Text variant='lg' weight='bold'>
                                {t('user.allGroups.label', 'All Groups', 'All User Groups.')}
                              </Text>
                              <Text color='typography-secondary' className={styles['count']} weight='medium'>
                                {list?.length ?? 0}
                              </Text>
                            </Grid>
                          </Grid>
                          <Grid item>
                            {hasEditRights && (
                              <Button
                                onClick={handleClick(state && <AddGroup onClose={handleClose} />)}
                                startIcon={<PlusLineIcon />}
                                variant='solid'
                              >
                                {t('user.addGroupButton.label', 'Add group', 'Add Group Button.')}
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Stack direction='row' spacing={4}>
                        <Button disabled variant='link'>
                          {t('general.clearButton.label', 'Clear', 'Clear button.')}
                        </Button>
                        <Button
                          // endIcon={<Chip>2</Chip>}
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
                    </Grid>
                  </Grid>
                  {showFiltersRow && (
                    <Grid item>
                      <Stack direction='row' fullWidth>
                        <DataSelect
                          className={styles['data-select-grow']}
                          onChange={() => ''}
                          options={[]}
                          placeholder={`${t('location.location.label', 'Location', 'Location title.')}: ${t(
                            'general.all.label',
                            'All',
                            'Entirety of something.',
                          )}`}
                          present={(item) => item.title}
                          value={0}
                        />
                        <DataSelect
                          className={styles['data-select-grow']}
                          onChange={() => ''}
                          options={[]}
                          placeholder={`${t('user.members.label', 'Members', 'Group members.')}: ${t(
                            'general.all.label',
                            'All',
                            'Entirety of something.',
                          )}`}
                          present={(item) => item.title}
                          value={0}
                        />
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </DataGridToolbar>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody>
                    {list?.map((group) => (
                      <DataGridRow
                        key={group.id}
                        className={styles['data-grid-row']}
                        component={NavLink}
                        to={`../group/${group.id}`}
                      >
                        {/* ICON */}

                        <DataGridCell>
                          <DataGridIconCellContent
                            startIcon={
                              <Icon color='primary' variant='tint'>
                                <FolderSolidIcon />
                              </Icon>
                            }
                            subtitle={group.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                            title={group.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                          />
                        </DataGridCell>
                        {/* color={group.color as any} */}

                        {/* GROUP */}

                        <DataGridCell>
                          <DataGridCellContent>{group.users.length ?? 0}</DataGridCellContent>
                        </DataGridCell>

                        {/* CHIP */}

                        <DataGridCell>
                          <DataGridCellContent>
                            <Stack direction='row'>
                              <Chip>{t('general.notAvailable.label', 'n/a', 'Not Available.')}</Chip>
                            </Stack>
                          </DataGridCellContent>
                        </DataGridCell>

                        {/* MENU */}

                        <DataGridCell variant='icon'>
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
                                  onClick={handleClick(state && <GroupEdit onClose={handleClose} group={item} />)}
                                  startIcon={<Edit02LineIcon />}
                                >
                                  <MenuItemText title={t('user.editGroup.label', 'Edit Group', 'Edit user group.')} />
                                </MenuItemButton>
                              </MenuItem>
                              <MenuItem>
                                <MenuItemButton
                                  onClick={() => navigator.clipboard.writeText(window.location.href)}
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
                                <MenuItemButton onClick={() => ''} startIcon={<Trash01LineIcon />}>
                                  <MenuItemText
                                    title={t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
                                  />
                                </MenuItemButton>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </DataGridCell>
                      </DataGridRow>
                    ))}
                  </DataGridBody>
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
        <Unit variant='sidebar'>
          {/* NO DATA */}
          {/* <Card fullHeight fullWidth>
            <DataNotFound
              icon={<FolderLineIcon />}
              title='Group Profile'
              subtitle='When you add first group, here will be shown group profile information, that you can edit.'
            />
          </Card> */}
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            {state.open
              ? state.component
              : item && (
                  <GroupProfile
                    handleEditProfile={handleClick(state && <GroupEdit onClose={handleClose} group={item} />)}
                    group={item}
                  />
                )}
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};
