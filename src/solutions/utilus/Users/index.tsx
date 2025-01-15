import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { observer } from 'mobx-react';
import moment from 'moment';

// storages
import { useUI } from '@core/storages/ui';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';
import { useUserGroups } from '@solutions/utilus/api/data/useUserGroups';
import { useUsers } from '@solutions/utilus/api/data/useUsers';

// components

import { AddUser } from './AddUser';
import { Avatar } from '@core/ui/components/Avatar';
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
import { GroupSelection } from './GroupSelection';
import { Header } from '@core/ui/utilus/Header';
import { Headline } from '@core/ui/components/Headline';
import { IconButton } from '@core/ui/components/IconButton';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { NavLink } from 'react-router-dom';
import { Profile } from './Profile';
import { ProfileEdit } from './ProfileEdit';
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
import Users01LineIcon from '@assets/icons/line/users-01.svg?component';
import ModuleIcon from '@assets/icons/line/users-01.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

type UserSelectionProps = {
  groupList?: UserGroupsQuery['userGroups'];
  item?: ElementOf<UsersQuery['users']>;
  list?: UsersQuery['users'];
};

export const UserSelection: React.FC<UserSelectionProps> = ({ list, item, groupList }) => {
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

  // toggle

  const toggleButtons = [
    { label: t('user.contacts.label', 'Contacts', 'User contacts.'), value: 'users' },
    { label: t('user.groups.label', 'Groups', 'User groups.'), value: 'groups' },
  ];

  const navigate = useNavigate();

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

  const [selectedVariant, setSelectedVariant] = React.useState('users');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('user.usersTitle.label', 'Users', 'Users Title.')} widget={false} />
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
        <Search inputId='user-search-input' disabled />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <DataGridToolbar>
                <Grid container spacing={4} direction='column' grow>
                  <Grid item>
                    <Grid container spacing={2} alignItems='center' justifyContent='between'>
                      <Grid item>
                        <Grid alignItems='center' container spacing={4}>
                          <Grid item>
                            <Grid alignItems='baseline'>
                              <Text variant='lg' weight='bold'>
                                {t('user.allUsers.label', 'All Users', 'All Users.')}
                              </Text>
                              <Text color='typography-secondary' className={styles['count']} weight='medium'>
                                {list?.length}
                              </Text>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={handleClick(state && <AddUser onClose={handleClose} groupList={groupList} />)}
                              startIcon={<PlusLineIcon />}
                              variant='solid'
                            >
                              {t('user.addUser.label', 'Add User', 'Add User Title.')}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Stack direction='row' spacing={4}>
                      <Button variant='link'>{t('general.clearButton.label', 'Clear', 'Clear button.')}</Button>
                      <Button
                        // endIcon={<Chip>3</Chip>}
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
                  {showFiltersRow && (
                    <Grid item>
                      <Stack direction='row' fullWidth>
                        <DataSelect
                          className={styles['data-select-grow']}
                          onChange={() => ''}
                          options={[]}
                          placeholder={`${t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}: ${t(
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
                          placeholder={`${t('user.roleInput.label', 'Role', 'User role input label.')}: ${t(
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
                          placeholder={`${t('user.groups.label', 'Groups', 'User groups.')}: ${t(
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
              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('user.groupName.label', 'Name', 'User group name.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('user.roleInput.label', 'Role', 'User role input label.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('user.groups.label', 'Groups', 'User groups.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='icon' />
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGridBody>
                    {list?.map((listItem) => (
                      <DataGridRow
                        key={listItem.id}
                        className={styles['data-grid-row']}
                        component={NavLink}
                        to={`../user/${listItem.id}`}
                      >
                        {/* AVATAR */}

                        <DataGridCell>
                          <DataGridIconCellContent
                            startIcon={
                              <Avatar
                                firstName={
                                  listItem.firstName ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                }
                                rounded
                                src={listItem.avatar ?? '–'}
                              />
                            }
                            title={`${listItem.firstName} ${listItem.lastName}`}
                            subtitle={listItem.jobTitle ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                          />
                        </DataGridCell>

                        {/* ROLE */}

                        <DataGridCell>
                          <DataGridCellContent>
                            {listItem?.role?.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                          </DataGridCellContent>
                        </DataGridCell>

                        {/* CHIP */}

                        <DataGridCell>
                          <DataGridCellContent>
                            <Stack direction='row'>
                              {listItem.groups?.slice(0, 2).map((item: any) => (
                                <Chip key={item?.id} color='primary' size='sm'>
                                  {item?.name}
                                </Chip>
                              ))}
                              {/* (groupList && groupList[item?.id - 1]?.color) */}
                              {/* {listItem.groups?.length > 3 && <Chip>...</Chip>} */}
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
                                  onClick={handleClick(
                                    state && (
                                      <ProfileEdit groupList={groupList} onClose={handleClose} user={listItem} />
                                    ),
                                  )}
                                  startIcon={<Edit02LineIcon />}
                                >
                                  <MenuItemText title={t('user.editUser.label', 'Edit User', 'Editing User.')} />
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
                                    title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
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
            {/*
            <DataNotFound
              icon={<Users01LineIcon />}
              title='No Users'
              subtitle='There are no users here yet. To start adding new users, click “Add User” button.'
            /> */}
          </Card>
        </Unit>
        <Unit variant='sidebar'>
          {/* NO DATA */}
          {/* <Card fullHeight fullWidth>
            <DataNotFound
              icon={<Users01LineIcon />}
              title='User Profile'
              subtitle='When you add first user, here will be shown user profile information, that you can edit.'
            />
          </Card> */}
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            {state.open
              ? state.component
              : item && (
                  <Profile
                    handleEditProfile={handleClick(
                      state && <ProfileEdit groupList={groupList} onClose={handleClose} user={item} />,
                    )}
                    list={list}
                    user={item}
                    groupList={groupList}
                  />
                )}
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};

type Props = {
  userId?: number;
};

export const Users: React.FC<Props> = ({ userId }) => {
  const ui = useUI();
  const users = useUsers();
  const groups = useUserGroups();
  return (
    <Routes>
      {users?.map((user) => (
        <Route
          key={`user:${user.id}`}
          path={`user/${user.id}`}
          element={<UserSelection item={user} list={users} groupList={groups} />}
        />
      ))}
      {users?.[0] && <Route path='' element={<Navigate to={`user/${users[0].id}`} />} />}
      {users?.[0] && <Route path='user' element={<Navigate to={`${users[0].id}`} />} />}
      {groups?.map((group) => (
        <Route
          key={`group:${group.id}`}
          path={`group/${group.id}`}
          element={<GroupSelection item={group} list={groups} groupList={groups} />}
        />
      ))}
      {groups?.[0] && <Route path='group' element={<Navigate to={`${groups[0].id}`} />} />}
    </Routes>
  );
};
