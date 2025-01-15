import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// types

import { Issue, IssuePriority, IssueStatus, User } from '@core/api/types';
import { getPriorityData, getStatusData } from '@core/ui/types';

// storages

import { useIssues } from '@core/storages/controllers/issue';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
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
import { EditIssueModal } from './EditIssueModal';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { IssuePrioritySelect } from '@core/ui/cerebro/IssuePrioritySelect';
import { IssueStatusSelect } from '@core/ui/cerebro/IssueStatusSelect';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Toast } from '@core/ui/components/Toast';
import { Tooltip } from '@core/ui/components/Tooltip';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { UserAvatar } from '@core/ui/cerebro/UserAvatar';
import { UsersSelect } from '@core/ui/cerebro/UsersSelect';
// import { IssueDetails } from './IssueDetails'; separate page

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpDoubleLineIcon from '@assets/icons/line/chevron-up-double.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import Copy04LineIcon from '@assets/icons/line/copy-04.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import Edit03LineIcon from '@assets/icons/line/edit-03.svg?component';
import EqualLineIcon from '@assets/icons/line/equal.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import ModuleIcon from '@assets/icons/line/check-done-01.svg?component';
import Trash01LineIcon from '@assets/icons/line/trash-01.svg?component';
// import { IssueDetails } from './IssueDetails'; separate page

type Props = {
  my?: boolean;
};

export const IssuesPage: React.FC<Props> = observer(({ my }) => {
  const locations = useLocations();
  const ui = useUI();

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  const navigate = useNavigate();

  // FILTERS

  const [searchBy, setSearchBy] = React.useState<string | undefined>(undefined);
  const [assigneeFilter, setAssigneeFilter] = React.useState<User | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = React.useState<IssuePriority | undefined>(undefined);
  const [statusFilter, setStatusFilter] = React.useState<IssueStatus | undefined>(undefined);

  const filters = !!assigneeFilter || !!priorityFilter || !!statusFilter;

  const clearFilters = () => {
    setAssigneeFilter(undefined);
    setPriorityFilter(undefined);
    setStatusFilter(undefined);
  };

  const filtersCount =
    Number(Boolean(assigneeFilter)) + Number(Boolean(priorityFilter)) + Number(Boolean(statusFilter));

  // DATA

  const issues = useIssues({
    locationId: ui.currentFormation,
    assigneeId: assigneeFilter?.userId,
    priority: priorityFilter,
    status: statusFilter,
    searchBy: searchBy ? `*${searchBy}*` : undefined,
  });

  // TOOLTIP

  type TooltipIconProps = {
    priority: {
      color?: string;
      icon?: React.ReactNode;
      label?: string;
    };
    issue: Issue;
  };

  const PriorityIcon: React.FC<TooltipIconProps> = ({ priority, issue }) => {
    const buttonRef = React.useRef(null);
    const [visible, setVisibility] = React.useState(false);
    return (
      <>
        <Icon
          aria-label={priority.label}
          color={priority.color}
          onMouseEnter={() => setVisibility(true)}
          onMouseLeave={() => setVisibility(false)}
          ref={buttonRef}
          variant='plain'
        >
          {priority.icon}
        </Icon>
        {createPortal(
          <Tooltip isVisible={visible} placement='top' targetRef={buttonRef} title={priority.label} />,
          document.body,
        )}
      </>
    );
  };

  // snackbar

  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const handleShowSnackbar = () => {
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2500);
  };

  // edit

  const [openDialog, setDialogOpen] = React.useState(false);
  const [modalIssueId, setModalIssueId] = React.useState(issues.data ? issues.data[0] : undefined);

  // issues.data ? issues.data[0] : undefined;

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('issue.issuesTitle.label', 'Issues', 'Issues title.')} />
      <Stack direction='row' className={styles['stack']}>
        <Search inputId='events-search-input' onChange={(text) => setSearchBy(text ? text : undefined)} />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={cn(styles['card'])} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('general.all.label', 'All', 'Entirety of something.')}
                titleCaption={issues.data?.length || ''}
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
              />
              {showFiltersRow && (
                <DataGridToolbar>
                  <Grid container spacing={4} direction='column' grow>
                    <Grid item>
                      <Stack direction='row' fullWidth>
                        <UsersSelect
                          className={styles['data-select-grow']}
                          locationId={ui.currentFormation}
                          onSelect={(option) => setAssigneeFilter(option)}
                          placeholder={t('issue.allAssignee.label', 'All assignee', 'All assignees for the issue.')}
                          value={assigneeFilter}
                        />
                        <IssuePrioritySelect
                          className={styles['data-select-grow']}
                          onSelect={(option) => setPriorityFilter(option)}
                          placeholder={t('issue.allPriority.label', 'All priority', 'Priority of issue.')}
                          value={priorityFilter}
                        />
                        <IssueStatusSelect
                          className={styles['data-select-grow']}
                          onSelect={(option) => setStatusFilter(option)}
                          placeholder={t('issue.allStatus.label', 'All status', 'Statuses for issue.')}
                          value={statusFilter}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </DataGridToolbar>
              )}
              <DataGridHead>
                <DataGridRow className={styles['data-grid-row']}>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('issue.issueID.label', 'Issue ID', 'Issue ID')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('issue.summary.label', 'Summary', 'Overview of the issue.')}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('issue.assignee.label', 'Assignee', "Issue's assignee.")}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      P
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('issue.status.label', 'Status', "Issue's status.")}
                    </Button>
                  </DataGridCell>
                  <DataGridCell variant='icon' />
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGrid>
                    <DataGridBody className='h-full'>
                      {issues.data &&
                        issues.data.map((issue) => (
                          <DataGridRow
                            key={issue.issueId}
                            className={styles['data-grid-row']}
                            onClick={() => {
                              navigate(`../issue/${issue.issueId}`);
                            }}
                          >
                            {/* ISSUE ID */}

                            <DataGridCell>
                              <DataGridCellContent>
                                <Text color='typography-secondary' variant='sm' weight='medium'>
                                  {`IVD-${issue.issueId}` /* TODO prefixes */}
                                </Text>
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* SUMMARY */}

                            <DataGridCell>
                              <DataGridCellContent>{issue.title}</DataGridCellContent>
                            </DataGridCell>

                            {/* DATA */}

                            <DataGridCell>
                              <DataGridCellContent>
                                <Grid>
                                  {issue.assignee && (
                                    <>
                                      <UserAvatar user={issue.assignee} className='mr-3' rounded size='xs' />
                                      {`${issue.assignee.firstName} ${issue.assignee.lastName}`}
                                    </>
                                  )}
                                </Grid>
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* P */}

                            <DataGridCell>
                              <Grid>
                                {((priority) => (
                                  <PriorityIcon issue={issue} priority={priority} />
                                ))(getPriorityData(issue.priority))}
                              </Grid>
                            </DataGridCell>

                            {/* STATUS */}

                            <DataGridCell>
                              <DataGridCellContent>
                                {((status) => (
                                  <Chip color={status.color} uppercase>
                                    {status.label}
                                  </Chip>
                                ))(getStatusData(issue.status))}
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* MENU */}

                            <DataGridCell variant='icon'>
                              <DataGridCellContent>
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
                                        // onClick={() => navigate(`../issue/${issue.issueId}`)}
                                        onClick={() => (setDialogOpen(true), setModalIssueId(issue))}
                                        startIcon={<Edit03LineIcon />}
                                      >
                                        <MenuItemText
                                          title={t('issue.editIssueTitle.label', 'Edit Issue', 'Edit issue title.')}
                                        />
                                      </MenuItemButton>
                                    </MenuItem>
                                    <MenuItem>
                                      <MenuItemButton
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            `${
                                              window.location.origin
                                            }${`/cerebro/issues/${issue.locationId}/issue/${issue.issueId}`}`,
                                          ),
                                            handleShowSnackbar();
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
                                    {/* <ListDivider />
                                          <MenuItem>
                                            <MenuItemButton
                                              onClick={() => navigate(`../issue/${issue.issueId}`)}
                                              startIcon={<Trash01LineIcon />}
                                            >
                                              <MenuItemText title='Delete issue' />
                                            </MenuItemButton>
                                          </MenuItem> */}
                                  </MenuList>
                                </Menu>
                              </DataGridCellContent>
                            </DataGridCell>
                          </DataGridRow>
                        ))}
                      {issues.data && issues.data?.length < 1 && (
                        <DataNotFound
                          title={t('issue.noIssues.label', 'There are no issues here yet', 'No issues caption.')}
                          subtitle={t(
                            'issue.noIssuesCaption.label',
                            'There are no issues here yet',
                            'No issues caption.',
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
        {/* <Routes> separate page
          {issues.data &&
            issues.data.map((issue) => (
              <Route
                path={`${issue.issueId}`}
                element={
                  <Unit variant='sidebar'>
                    <Card className={styles['card']} fullHeight fullWidth scrollable>
                      <IssueDetails issue={issue} />
                    </Card>
                  </Unit>
                }
              />
            ))}
        </Routes> */}
      </UnitContainer>
      {modalIssueId && <EditIssueModal issue={modalIssueId} onClose={() => setDialogOpen(false)} open={openDialog} />}
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
