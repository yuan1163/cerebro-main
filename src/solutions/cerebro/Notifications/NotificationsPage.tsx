import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';

// utils

import { t } from '@core/utils/translate';

// types

import { Location, AssetGroup, AlertPriority, AlertStatus, Issue, IssueStatus, AlertType } from '@core/api/types';
import { Notification } from '@core/api/types';
import { Solutions } from '@core/ui/types';

// storages

import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useIssue, useIssues } from '@core/storages/controllers/issue';
import { useLocations } from '@core/storages/controllers/locations';
import { useNotifications } from '@core/storages/controllers/notifications';
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
import { EventSidebar } from './EventSidebar';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Menu } from '@core/ui/components/Menu';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { SelectOption } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Tooltip } from '@core/ui/components/Tooltip';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import ModuleIcon from '@assets/icons/line/notification-text.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

// priorities

const priorities = [
  { value: undefined, label: 'Priority' },
  { value: AlertPriority.Trivial, label: 'Trivial' },
  { value: AlertPriority.Normal, label: 'Normal' },
  { value: AlertPriority.Warning, label: 'Warning' },
  { value: AlertPriority.Critical, label: 'Critical' },
];

export const getColorByAlertPriority = (priority?: AlertPriority): 'error' | 'success' | 'trivial' | 'warning' => {
  switch (priority) {
    case AlertPriority.Critical:
      return 'error';
    case AlertPriority.Normal:
      return 'success';
    case AlertPriority.Warning:
      return 'warning';
    case AlertPriority.Trivial:
      return 'trivial';
    default:
      return 'trivial';
  }
};

export const getColor = (alert: Partial<Notification>): 'error' | 'success' | 'trivial' | 'warning' => {
  if (alert.status === AlertStatus.Resolved) {
    return getColorByAlertPriority(AlertPriority.Trivial);
  } else {
    return getColorByAlertPriority(alert.alertPriority);
  }
};

export const getText = (alert: Partial<Notification>) => {
  switch (alert.status) {
    // 1
    case AlertStatus.Active:
      switch (alert.alertType) {
        case AlertType.ZoneRule:
          return alert.actionText;
        case AlertType.Connection:
          return t('asset.deviceIsOffline.label', 'Device is offline', 'Device is offline caption.');
        case AlertType.Both:
          return (
            alert.actionText + ` ${t('asset.deviceIsOffline.label', 'Device is offline', 'Device is offline caption.')}`
          );
        case AlertType.CurrentRule:
          return `${t('alerts.raised', 'Alert', 'Alert raised prefix text')}: ${alert.actionText}`;
      }
    // 2
    case AlertStatus.Resolved:
      switch (alert.alertType) {
        case AlertType.ZoneRule:
          return t(
            'asset.returnedToDesignatedZone.label',
            'Returned to designated zone',
            'The equipment has been placed back to its specified area.',
          );
        case AlertType.Connection:
          return t('asset.deviceIsOnline.label', 'Device is online', 'Device is online.');
        case AlertType.Both:
          return (
            t(
              'asset.returnedToDesignatedZone.label',
              'Returned to designated zone',
              'The equipment has been placed back to its specified area.',
            ) + ` ${t('asset.deviceIsOffline.label', 'Device is offline', 'Device is offline caption.')}`
          );
        case AlertType.CurrentRule:
          return `${t('alerts.resolved', 'Resolved', 'Alert resolved prefix text')}: ${alert.actionText}`;
      }
  }
};

export const getAssetName = (alert: Partial<Notification>) => {
  if (alert.device?.deviceType === 101)
    return t('asset.station.label', 'Station', 'Centralized location or setup for managing and accessing devices.');
  else return alert.device?.name ?? t('asset.unassignedDevice.label', 'Unassigned device', 'Unassigned device.');
};

export const NotificationsPage = observer(() => {
  const locations = useLocations();
  const ui = useUI();
  const timezone = locations.getElementById(ui.currentFormation)?.timezone;
  const navigate = useNavigate();

  // filter by period 
  const periods = [0, 1, 2, 3, 4, 5].map((_, i) => {
    const month = moment().subtract(i, 'month');
    return {
      label: month.format('MMMM YYYY'),
      startDate: month.startOf('month').valueOf(),
      endDate: month.endOf('month').valueOf(),
    };
  });

  // 新增一個當前月份+上個月的選項作為預設值
  const currentAndLastMonth = {
    label: `${moment().subtract(1, 'month').format('MMM')} - ${moment().format('MMM YYYY')}`,
    startDate: moment().subtract(1, 'month').startOf('month').valueOf(),
    endDate: moment().endOf('month').valueOf(),
  };
  
  // 將新選項加入到陣列最前面
  const periodOptions = [currentAndLastMonth, ...periods];

  const [filterPeriod, setFilterPeriod] = useState(periodOptions[0]);

  // filter by asset category

  const groups = useAssetGroups({
    locationId: ui.currentFormation, // only as current Formation
  });
  const categories: SelectOption<AssetGroup | undefined>[] = [
    {
      label: `${t('general.notAvailable.label', 'n/a', 'Not Available.')}:`,
      value: undefined,
    },
  ];
  if (groups.hasData()) {
    categories.push(
      ...groups.getData().map((group) => ({
        label: group.name,
        value: group,
      })),
    );
  }

  const [filterCategory, setFilterCategory] = useState(categories[0]);

  // filter by location (buildings)

  const buildings: SelectOption<Location | undefined>[] = [
    {
      label: `${t('location.location.label', 'Location', 'Location title.')}:`,
      value: undefined,
    },
  ];
  if (locations.hasData()) {
    const activeFormation = locations.getElementById(ui.currentFormation);
    buildings.push(
      ...locations.getBuildings(activeFormation).map((location) => ({
        label: location.name,
        value: location,
      })),
    );
  }

  const [filterBuilding, setFilterBuilding] = useState(buildings[0]);

  // filter by priority

  const [filterPriority, setFilterPriority] = useState(priorities[0]);

  const notifications = useNotifications({
    startDate: filterPeriod.startDate,
    endDate: filterPeriod.endDate,
    assetGroupId: filterCategory.value?.groupId,
    locationId: filterBuilding.value?.locationId || ui.currentFormation,
    priority: filterPriority.value,
  });

  // filters toggle

  const [showFiltersRow, setShowFiltersRow] = useState(false);

  const handleFiltersRowToggle = () => {
    setShowFiltersRow(!showFiltersRow);
  };

  const filters =
    filterPeriod.label !== periods[0].label ||
    !!filterCategory.value ||
    !!filterBuilding.value ||
    !!filterPriority.value;

  const clearFilters = () => {
    setFilterPeriod(periods[0]);
    setFilterCategory(categories[0]);
    setFilterBuilding(buildings[0]);
    setFilterPriority(priorities[0]);
  };

  const filtersCount =
    Number(Boolean(filterPeriod.label !== periods[0].label)) +
    Number(Boolean(filterCategory.value)) +
    Number(Boolean(filterBuilding.value)) +
    Number(Boolean(filterPriority.value));

  // ISSUE ICON

  type TooltipIconProps = {
    tooltip: string;
  };

  const IssueIcon: React.FC<TooltipIconProps> = ({ tooltip }) => {
    const buttonRef = React.useRef(null);
    const [visible, setVisibility] = React.useState(false);
    return (
      <>
        <Icon
          aria-label={tooltip}
          color='icon-tertiary'
          onMouseEnter={() => setVisibility(true)}
          onMouseLeave={() => setVisibility(false)}
          ref={buttonRef}
          variant='plain'
        >
          <CheckDone01LineIcon />
        </Icon>
        {createPortal(
          <Tooltip
            isVisible={visible}
            placement='top'
            title={t('issue.issueCreated.label', 'Issue for this event created.', 'Issue for this event created.')}
            targetRef={buttonRef}
          />,
          document.body,
        )}
      </>
    );
  };

  // issue

  const issues = useIssues({
    locationId: ui.currentFormation,
  });

  // columns

  // const hideIssues = ui.activeSolution === Solutions.ems;
  const hideIssues = false;

  const gridTemplateColumns = hideIssues ? `1fr 1fr 1fr` : `1fr 1fr 1fr 12ch`;

  const useCircutsLabel = ui.activeSolution === Solutions.ems;

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('events.events.label', 'Events', 'Events title.')} />
      <Stack direction='row' className={styles['stack']}>
        <Search inputId='events-search-input' disabled />
      </Stack>
      <UnitContainer>
        <Unit>
          <Card className={cn(styles['card'])} fullHeight fullWidth scrollable>
            <DataGrid className={styles['data-grid']}>
              <CardHeader
                borderBottom={!showFiltersRow}
                title={t('events.events.label', 'Events', 'Events title.')}
                titleCaption={notifications.getData()?.length}
                action={
                  <Stack direction='row' spacing={4}>
                    {filters && (
                      <Button variant='link' onClick={clearFilters}>
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
                        <DataSelect
                          className={styles['data-select-grow']}
                          options={periods}
                          present={(period) => period.label}
                          value={filterPeriod}
                          onChange={(period) => setFilterPeriod(period)}
                          placeholder={t('date.month.label', 'Month', 'Month.')}
                        />
                        {/* TODO Translate */}
                        <DataSelect
                          className={styles['data-select-grow']}
                          options={categories}
                          present={(option) => option.label}
                          value={filterCategory}
                          onChange={(option) => setFilterCategory(option)}
                          placeholder=''
                        />
                        <DataSelect
                          className={styles['data-select-grow']}
                          options={buildings}
                          present={(option) => option.label}
                          value={filterBuilding}
                          onChange={(option) => setFilterBuilding(option)}
                          placeholder={`${t('location.building.label', 'Building', 'Building.')}:`}
                        />
                        <DataSelect
                          className={styles['data-select-grow']}
                          options={priorities}
                          present={(option) => option.label}
                          value={filterPriority}
                          onChange={(option) => setFilterPriority(option)}
                          placeholder={`${t('events.priority.label', 'Priority', "Event's importance.")}:`}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </DataGridToolbar>
              )}

              <DataGridHead>
                <DataGridRow
                  className={styles['data-grid-row']}
                  style={{
                    gridTemplateColumns: gridTemplateColumns,
                  }}
                >
                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t('events.eventInfo.label', 'Event Info', 'Event info.')}
                    </Button>
                  </DataGridCell>

                  {/* CIRCUIT LABEL */}

                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {useCircutsLabel
                        ? t(
                            'asset.circuit.label',
                            'Circuit',
                            'Closed path through which electric current flows or can flow.',
                          )
                        : t('asset.deviceID.label', 'Device ID', 'Device ID.')}
                    </Button>
                  </DataGridCell>

                  {/* TIME */}

                  <DataGridCell variant='button'>
                    <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                      {t(
                        'date.time.label',
                        'Time',
                        'Time is the dimension in which events occur in a linear fashion, typically measured in units such as seconds, minutes, hours, days, and years.',
                      )}
                    </Button>
                  </DataGridCell>

                  {/* ISSUE ICON */}

                  {hideIssues ? null : (
                    <DataGridCell variant='button'>
                      <Button endIcon={<ChevronDownLineIcon />} size='sm' variant='text'>
                        {t('issue.issue.label', 'Issue', 'Issue title')}
                      </Button>
                    </DataGridCell>
                  )}
                  {/* <DataGridCell variant='icon' /> */}
                </DataGridRow>
              </DataGridHead>
              <CardContent disablePadding scrollable>
                <Scrollbar>
                  <DataGrid>
                    <DataGridBody className='h-full'>
                      {notifications.hasData() &&
                        notifications.getData().map((notification, i) => (
                          <DataGridRow
                            className={styles['data-grid-row']}
                            style={{
                              gridTemplateColumns: gridTemplateColumns,
                            }}
                            key={`notifications-${i}`}
                            onClick={() => navigate(`event/${notification.alertId}`)}
                            rowId={notification.alertId}
                            // onClick={() => ui.gotoNotification(notification)}
                          >
                            {/* NOTIFICATION */}

                            <DataGridCell>
                              <DataGridIconCellContent
                                severity={getColor(notification)}
                                subtitle={getAssetName(notification)}
                                title={
                                  getText(notification) ?? t('general.notAvailable.label', 'n/a', 'Not Available.')
                                }
                              />
                            </DataGridCell>

                            {/* DEVICE */}

                            <DataGridCell>
                              <DataGridCellContent>{notification.device.deviceId ?? '–'}</DataGridCellContent>
                            </DataGridCell>

                            {/* DATA */}

                            <DataGridCell color='typography-secondary'>
                              <DataGridCellContent>
                                <time dateTime={moment(notification.creationDate).format()}>
                                  {moment(notification.creationDate)
                                    .tz(timezone as string)
                                    .format('MM/DD/YYYY HH:mm A')}
                                </time>
                              </DataGridCellContent>
                            </DataGridCell>

                            {/* ISSUE */}

                            {hideIssues ? null : (
                              <DataGridCell>
                                <DataGridCellContent>
                                  {notification.issueIds.length > 0 ? (
                                    <IssueIcon
                                      tooltip={t(
                                        'general.title.label',
                                        'Title',
                                        'Title is a name or designation that describes or identifies a specific content, position, or topic.',
                                      )}
                                    />
                                  ) : null}
                                </DataGridCellContent>
                              </DataGridCell>
                            )}

                            {/* MENU */}
                            {/* <DataGridCell variant='icon'>
                                    <Menu
                                      button={
                                        <IconButton ariaLabel='Menu' component='div' disabled variant='text'>
                                          <DotsVerticalLineIcon />
                                        </IconButton>
                                      }
                                      placement='bottom-end'
                                    >
                                      <MenuList>
                                        <MenuItem>
                                          <MenuItemButton onClick={() => ui.gotoNotification(notification)}><MenuItemText title='Details' />
                                          </MenuItemButton>
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </DataGridCell> */}
                          </DataGridRow>
                        ))}
                      {notifications.hasData() && notifications.getData()?.length < 1 && (
                        <DataNotFound
                          title={t('events.noEvents.label', 'No Events', 'No events.')}
                          subtitle={t(
                            'events.noEventsCapture.label',
                            'There are no events here yet',
                            'No events capture.',
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
          {notifications.hasData() &&
            notifications.getData().map((notification) => {
              return (
                <Route
                  key={notification.alertId}
                  path={`event/${notification.alertId}`}
                  element={
                    <Unit variant='sidebar'>
                      <Card className={cn(styles['card'], styles['card-aside'])} fullHeight fullWidth scrollable>
                        <EventSidebar event={notification} />
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
});
