import React, { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';

// types

import { User, UserGroup, UserPermissions } from '@core/api/types';

// storages

import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';
import { useUserGroup, useUserGroups } from '@core/storages/controllers/userGroups';
import { useLocations } from '@core/storages/controllers/locations';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// filters

import { useFilterText } from '../filters';

// components

import { AddGroup } from '../AddGroup';
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
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { GroupEdit } from '../GroupEdit';
import { GroupProfile } from '../GroupProfile';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { ModalDelete } from '@core/ui/components/ModalDelete';
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
import Edit02LineIcon from '@assets/icons/line/edit-02.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import FolderLineIcon from '@assets/icons/line/folder-outlined.svg?component';
import FolderSolidIcon from '@assets/icons/solid/folder.svg?component';
import ModuleIcon from '@assets/icons/line/users-01.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';

type MembersProps = {
  group: UserGroup;
};

function Members({ group }: MembersProps) {
  const controller = useUserGroup(group);
  const members = controller.getMembers();
  return (
    <Text variant='sm' weight='medium'>
      {members?.length || 0}
    </Text>
  );
}

type DataRowProps = {
  group: UserGroup;
  remove: (item: Partial<UserGroup>) => Promise<void>;
  handleClick: (component: React.ReactNode) => () => void;
  handleClose: () => void;
};

function DataRowMenu({ group, remove, handleClick, handleClose }: DataRowProps) {
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
              onClick={handleClick(<GroupEdit onClose={handleClose} group={group} />)}
              startIcon={<Edit02LineIcon />}
            >
              <MenuItemText title={t('user.editGroup.label', 'Edit Group', 'Editing Group.')} />
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
          <ListDivider />
          <MenuItem>
            <MenuItemButton onClick={() => setDialogOpen(true)} startIcon={<Trash01LineIcon />}>
              <MenuItemText title={t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')} />
            </MenuItemButton>
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalDelete
        content={`${t(
          'user.deleteGroupQuestion.label',
          'Are you sure you want to remove group?',
          'Confirmation prompt: Delete group?',
        )} “${group.name}” ${t('company.fromCerebroApp.label', 'from Cerebro App?', 'Refers to the source app.')}`}
        open={openDialog}
        title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
        close={() => {
          setDialogOpen(false);
        }}
        cancel={() => {
          setDialogOpen(false);
        }}
        confirm={() => {
          remove(group);
          handleClose();
        }}
      />
    </>
  );
}

//export const GroupSelection: React.FC<GroupSelectionProps> = ({ list, item }) => {
export const GroupSelection = observer(() => {
  const navigate = useNavigate();
  //const controller = useUserGroup(item);

  // users groups list
  const locations = useLocations();
  const company = locations.getCompany();
  const groups = useUserGroups({
    locationId: company.locationId,
  });

  const list = groups.getData();

  // toggle button group

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

  // remove
  const remove = async (item: Partial<UserGroup>) => {
    await groups.remove(item);
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

  const applyFilters = (list: UserGroup[]) => {
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
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('user.usersTitle.label', 'Users', 'Users Title.')} />
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
          inputId='users-group-search-input'
          value={filterText}
          onChange={(text) => setFilterText(text)}
          onClear={() => setFilterText('')}
        />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={styles['card']} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('general.all.label', 'All', 'Entirety of something.')}
                titleCaption={applyFilters(list)?.length}
                // action={
                //   <Stack direction='row' spacing={4}>
                //     <Button
                //       endIcon={
                //         <Badge color='primary' shape='rounded' size='sm' variant='tint'>
                //           0
                //         </Badge>
                //       }
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
                  <Button
                    onClick={handleClick(<AddGroup onClose={handleClose} />)}
                    startIcon={<PlusLineIcon />}
                    variant='solid'
                  >
                    {t('user.addGroupButton.label', 'Add group', 'Add Group Button.')}
                  </Button>
                )}
              </CardHeader>

              {/* {showFiltersRow && (
                <DataGridToolbar>
                  <Stack direction='row' fullWidth>
                    <DataSelect
                      className={styles['data-select-grow']}
                      disabled
                      onChange={() => ''}
                      options={[]}
                      placeholder='All groups'
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
                      {t('user.name.label', 'Name', 'Username.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('user.members.label', 'Members', 'Group members.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='icon' />
                </DataGridRow>
              </DataGridHead>

              <CardContent disablePadding scrollable>
                <DataGrid>
                  <Scrollbar>
                    <DataGridBody className='h-full'>
                      {!list ? (
                        <Grid alignItems='center' justifyContent='center' fullHeight>
                          <CircularProgress />
                        </Grid>
                      ) : (
                        applyFilters(list).map((group) => (
                          <DataGridRow
                            key={group.groupId}
                            className={styles['data-grid-row']}
                            onClick={() => {
                              navigate(`../group/${group.groupId}`);
                              handleClose();
                            }}
                          >
                            {/* ICON */}

                            <DataGridCell>
                              <DataGridIconCellContent
                                startIcon={
                                  <Icon className={styles['avatar']} color={group.style} size='lg' variant='tint'>
                                    <FolderSolidIcon />
                                  </Icon>
                                }
                                subtitle={group.description ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                title={group.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                              />
                            </DataGridCell>

                            {/* LOCATION */}

                            <DataGridCell>
                              <DataGridCellContent>
                                <Members group={group} />
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* MENU */}

                            <DataGridCell variant='icon'>
                              {hasEditRights && (
                                <DataRowMenu
                                  handleClick={handleClick}
                                  handleClose={handleClose}
                                  remove={remove}
                                  group={group}
                                />
                              )}
                            </DataGridCell>
                          </DataGridRow>
                        ))
                      )}
                      {applyFilters(list)?.length < 1 && (
                        <DataNotFound
                          title={t('user.groupsNotFound.label', 'Groups not found', 'No groups data detected.')}
                          subtitle={t(
                            'user.groupsNotFoundCaption.label',
                            'Oops, there are no groups, try release filters or search by another word',
                            'Message indicating that within a system or application, no groups-related data has been identified or found.',
                          )}
                        />
                      )}
                    </DataGridBody>
                  </Scrollbar>
                </DataGrid>
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
                key={item.groupId}
                path={`${item.groupId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                      {state.open ? (
                        state.component
                      ) : (
                        <GroupProfile
                          group={item}
                          handleEditProfile={handleClick(<GroupEdit onClose={handleClose} group={item} />)}
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
