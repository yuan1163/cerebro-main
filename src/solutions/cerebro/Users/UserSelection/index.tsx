import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Route, Routes, useNavigate } from 'react-router';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';
import useCalculateUserLimits from '@core/hooks/users/calculateUserAdditionLimits';

// storages

import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useUserRoles } from '@core/storages/controllers/userRoles';
import { useUsers } from '@core/storages/controllers/users';
import { useModals } from '@core/storages/modals';
import { useUI } from '@core/storages/ui';

// filters

import { useFilterGroups, useFilterJobTitle, useFilterRoles, useFilterText } from '../filters';

// types

import { User, UserCategory, UserPermissions } from '@core/api/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../styles.module.scss';

// components

import { AddUser } from '../AddUser';
import { Avatar } from '@core/ui/components/Avatar';
import { Badge } from '@core/ui/components/Badge';
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
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { IconButton } from '@core/ui/components/IconButton';
import { ListDivider } from '@core/ui/components/ListDivider';
import { MaxUsersAlert } from '../MaxUsersAlert';
import { MaxUsersModal } from '../MaxUsersModal';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Profile } from '../Profile';
import { ProfileEdit } from '../ProfileEdit';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Toast } from '@core/ui/components/Toast';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import Edit03LineIcon from '@assets/icons/line/edit-03.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import ModuleIcon from '@assets/icons/line/users-01.svg?component';
import PasscodeResetLineIcon from '@assets/icons/line/passcode-reset.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

const sortingSettings = [
  {
    value: 'asc',
    label: t(
      'general.sortingAZ.label',
      'Sorting A-Z',
      'Method of arranging items in ascending alphabetical order, from the beginning of the alphabet (A) to the end (Z).',
    ),
  },
  {
    value: 'desc',
    label: t(
      'general.sortingZA.label',
      'Sorting Z-A',
      'Method of arranging items in descending alphabetical order, from the end of the alphabet (Z) to the beginning (A).',
    ),
  },
];

type DataRowProps = {
  user: {
    firstName?: string;
    lastName?: string;
  };
  remove: (item: Partial<User>) => Promise<void>;
  handleClick: (component: React.ReactNode) => () => void;
  handleClose: () => void;
};

function DataRowMenu({ user, remove, handleClick, handleClose }: DataRowProps) {
  const [openDialog, setDialogOpen] = React.useState(false);

  // snackbar

  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const handleShowSnackbar = () => {
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2500);
  };
  return (
    <>
      {createPortal(
        <Toast
          isShowing={snackOpen}
          message={t(
            'general.copyLinkSuccess.label',
            'Copied to clipboard!',
            'Desired content has been successfully copied.',
          )}
        />,
        document.body,
      )}
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
              onClick={handleClick(<ProfileEdit onClose={handleClose} user={user} />)}
              startIcon={<Edit03LineIcon />}
            >
              <MenuItemText title={t('user.editUser.label', 'Edit User', 'Edit user.')} />
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
                title={t('general.copyLink.label', 'Copy link', 'Action that allows to duplicate a web link or URL.')}
              />
            </MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton onClick={() => ''} startIcon={<PasscodeResetLineIcon />} disabled>
              <MenuItemText
                title={t(
                  'general.sendResetPasswordEmail.label',
                  'Send reset password email',
                  'A prompt that triggers an email to users for password recovery or change.',
                )}
              />
            </MenuItemButton>
          </MenuItem>
          <ListDivider />
          <MenuItem>
            <MenuItemButton onClick={() => setDialogOpen(true)} startIcon={<Trash01LineIcon />}>
              <MenuItemText title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')} />
            </MenuItemButton>
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalDelete
        content={`${t(
          'user.deleteAccountQuestion.label',
          'Are you sure you want to remove user?',
          'Confirmation prompt: Delete user profile?',
        )} ${user?.firstName} ${user?.lastName} ${t(
          'company.fromCerebroApp.label',
          'from Cerebro App?',
          'Refers to the source app.',
        )}`}
        open={openDialog}
        title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
        close={() => {
          setDialogOpen(false);
        }}
        cancel={() => {
          setDialogOpen(false);
        }}
        confirm={() => {
          remove(user);
          handleClose();
        }}
      />
    </>
  );
}

export const UserSelection = observer(() => {
  // users list
  const locations = useLocations();
  const company = locations.getCompany();
  const usersMaxLimit = company?.maxUsers;
  const users = useUsers({
    //locationId: ui.activeLocation?.locationId,
    locationId: company?.locationId,
    // searchBy: filterText ? `*${filterText}*` : undefined,
    // sortOrder: sortingOption.value,
    fileName: 'avatar',
    category: UserCategory.Contact,
  });

  const list = users.getData();

  // USER LIMIT

  const { totalUsers, isAlertDisabled, isAddUserDisabled, userAdditionStatus } = useCalculateUserLimits(
    company?.locationId,
    usersMaxLimit,
  );

  // toggle button group

  const navigate = useNavigate();
  const ui = useUI();

  const toggleButtons = [
    { label: t('user.admins.label', 'Admins', 'Key overseers with elevated privileges.'), value: 'admins' },
    { label: t('user.contacts.label', 'Contacts', 'User contacts.'), value: 'users' },
    { label: t('user.groups.label', 'Groups', 'User groups.'), value: 'groups' },
  ];

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'admins':
        navigate(`../admin`);
        break;
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

  // category select

  const [sortingOption, setSortingOption] = useState(sortingSettings[0]);

  // // Search

  // const [filterText, setFilterText] = React.useState<string | undefined>('');

  // const handleChange = (text: any) => {
  //   setFilterText(text);
  // };

  // const handleClear = () => {
  //   setFilterText('');
  // };

  // roles (groups) list

  const roles = useUserRoles();

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

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

  // remove account
  const remove = async (item: Partial<User>) => {
    await users.remove(item);
    navigate('../user');
  };

  // search by

  const { filterText, setFilterText } = useFilterText();

  // FILTERS

  // job title

  const { jobTitleFilterOptions, jobTitleFilter, setJobTitleFilter } = useFilterJobTitle(list);

  // roles

  // const { roleFilterOptions, roleFilter, setRoleFilter } = useFilterRoles();

  // groups

  const { groupFilterOptions, groupFilter, setGroupFilter } = useFilterGroups();

  const filters = !!jobTitleFilter.value || !!groupFilter.value;

  const clearFilters = () => {
    setJobTitleFilter({
      value: undefined,
      label: `${t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    });
    // setRoleFilter({ value: undefined, label: 'Roles: All' });
    setGroupFilter({
      value: undefined,
      label: `${t('user.groups.label', 'Groups', 'User groups.')}: ${t(
        'general.all.label',
        'All',
        'Entirety of something.',
      )}`,
    });
  };

  const applyFilters = (list: User[]) => {
    let filteredList = list;
    if (filterText) {
      const filter = filterText;
      filteredList = filteredList.filter(
        (user) =>
          user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
          user.lastName.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    if (jobTitleFilter.value) {
      const filter = jobTitleFilter.value;
      filteredList = filteredList.filter((user) => user.jobTitle == filter);
    }
    if (groupFilter.value) {
      const filter = groupFilter.value.groupId;
      filteredList = filteredList.filter(
        (user) => user.groups && user.groups.some((group) => group.groupId === filter),
      );
    }
    return filteredList;
  };

  const filtersCount = Number(Boolean(jobTitleFilter?.value)) + Number(Boolean(groupFilter?.value));

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  // MAX USERS MODAL

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('user.usersTitle.label', 'Users', 'Users Title.')} />
      <Grid direction='column' gap={3} className={styles['subheader-widgets']}>
        {/* MAX USERS */}
        {isAlertDisabled && usersMaxLimit && (
          <>
            <MaxUsersAlert
              color={userAdditionStatus}
              maxUsers={usersMaxLimit}
              onAction={() => setOpen(true)}
              severity={userAdditionStatus}
              users={totalUsers}
            />
            <MaxUsersModal
              maxUsers={usersMaxLimit}
              onClose={() => setOpen(false)}
              open={open}
              severity={userAdditionStatus}
              users={totalUsers}
            />
          </>
        )}

        <Grid gap={2}>
          <SegmentedControl
            aria-label={t(
              'general.screenSelection.label',
              'Screen selection',
              'Process of choosing a particular section of a webpage.',
            )}
            buttons={toggleButtons}
            onChange={onSegmentedControlVariantChange}
            value={selectedVariant}
            size='sm'
          />
          <Search
            inputId='user-search-input'
            onChange={(text) => setFilterText(text)}
            onClear={() => setFilterText('')}
            value={filterText}
          />
        </Grid>
      </Grid>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('general.all.label', 'All', 'Entirety of something.')}
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
                  <Button
                    disabled={isAddUserDisabled}
                    onClick={handleClick(<AddUser category={UserCategory.Contact} onClose={handleClose} />)}
                    startIcon={<PlusLineIcon />}
                    variant='solid'
                  >
                    {t('user.addUser.label', 'Add User', 'Add User Title.')}
                  </Button>
                )}
              </CardHeader>

              {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={jobTitleFilterOptions}
                      placeholder={`${t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      present={(option) => option.label}
                      value={jobTitleFilter}
                      onChange={(option) => setJobTitleFilter(option)}
                    />
                    {/* <DataSelect
                      className={styles['data-select-grow']}
                      options={roleFilterOptions}
                      placeholder='Role: All'
                      present={(option) => option.label}
                      value={roleFilter}
                      onChange={(option) => setRoleFilter(option)}
                    /> */}
                    <DataSelect
                      className={styles['data-select-grow']}
                      options={groupFilterOptions}
                      placeholder={`${t('user.groups.label', 'Groups', 'User groups.')}: ${t(
                        'general.all.label',
                        'All',
                        'Entirety of something.',
                      )}`}
                      present={(option) => option.label}
                      value={groupFilter}
                      onChange={(option) => setGroupFilter(option)}
                    />
                  </Stack>
                </DataGridToolbar>
              )}
              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('user.groupName.label', 'Name', 'User group name.')}
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
                  <DataGrid>
                    <DataGridBody className='h-full'>
                      {!list ? (
                        <Grid alignItems='center' justifyContent='center' fullHeight>
                          <CircularProgress />
                        </Grid>
                      ) : (
                        applyFilters(list).map((user) => (
                          <React.Fragment key={user.userId}>
                            <DataGridRow
                              className={styles['data-grid-row']}
                              onClick={() => {
                                navigate(`../user/${user.userId}`);
                                handleClose();
                              }}
                            >
                              <DataGridCell>
                                {/* 大頭貼 照片 */}
                                <DataGridIconCellContent
                                  startIcon={
                                    <Avatar
                                      firstName={user.firstName}
                                      lastName={user.lastName}
                                      rounded
                                      size='xl'
                                      src={user.files?.[0]?.url && `${user.files?.[0].url}/${auth.accessToken}`}
                                      />
                                  }
                                  title={`${user.firstName} ${user.lastName}`}
                                  subtitle={user.jobTitle ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                />
                              </DataGridCell>
                              <DataGridCell>
                                <DataGridCellContent>
                                  <Stack direction='row'>
                                    {user?.groups?.slice(0, 2).map((item: any, index) => (
                                      <Chip key={index} color={item.style} uppercase>
                                        {item?.name}
                                      </Chip>
                                    ))}
                                    {user?.groups?.length > 2 && (
                                      <Menu
                                        button={
                                          <Chip color='secondary' component='button'>
                                            +{user?.groups?.length - 2}
                                          </Chip>
                                        }
                                        placement='bottom-end'
                                      >
                                        <MenuList>
                                          {user?.groups?.slice(2).map((item: any, index) => (
                                            <MenuItem key={item?.id}>
                                              <Chip color={item.style} uppercase>
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
                                  <DataRowMenu
                                    handleClick={handleClick}
                                    handleClose={handleClose}
                                    remove={remove}
                                    user={user}
                                  />
                                )}
                              </DataGridCell>
                            </DataGridRow>
                          </React.Fragment>
                        ))
                      )}
                      {applyFilters(list)?.length < 1 && (
                        <DataNotFound
                          title={t('user.usersNotFound.label', 'Users not found', 'No users data detected.')}
                          subtitle={t(
                            'user.usersNotFoundCaption.label',
                            'Oops, there are no users, try release filters or search by another word',
                            'Message indicating that within a system or application, no user-related data has been identified or found.',
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
                key={item.userId}
                path={`${item.userId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>


                    {/* 右邊區塊-使用者詳細資訊 */}

                      {state.open ? (
                        state.component
                      ) : (
                        <Profile
                          user={item}
                          handleEditProfile={handleClick(<ProfileEdit onClose={handleClose} user={item} />)}
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
});
