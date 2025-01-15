import React, { useEffect } from 'react';
import moment from 'moment';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('en-gb', enGb);

// types

import { InputProps } from '@core/api/typesDesignSystem';

// utils

import { t } from '@core/utils/translate';

// types

import { AlertPriority, Issue, IssuePriority, Notification, IssueStatus } from '@core/api/types';

// controllers

import { useAvatar } from '@core/storages/controllers/users';
import { useIssue } from '@core/storages/controllers/issue';
import { useLocations } from '@core/storages/controllers/locations';
import { useNotification } from '@core/storages/controllers/notifications';
import { useUI } from '@core/storages/ui';
import { useUsers } from '@core/storages/controllers/users';
import { getAssetName, getText } from '@solutions/cerebro/Notifications/NotificationsPage';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Editor } from '@core/ui/components/Editor';
import { EventCard } from '../IssuePage/EventCard';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { InputLabel } from '@core/ui/components/InputLabel';
import { Modal } from '@core/ui/components/Modal';
import { SelectorToggleButton } from '@core/ui/components/SelectorToggleButton';
import { UsersSelect } from '@core/ui/cerebro/UsersSelect';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';
import ChevronUpDoubleLineIcon from '@assets/icons/line/chevron-up-double.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import EqualLineIcon from '@assets/icons/line/equal.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  open: boolean;
  onClose: () => void;
  issue: Issue;
};

// CUSTOM INPUT

const CustomInput: React.FC<InputProps> = ({ value, onClick, ...props }) => {
  const handleIconClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation();
    onClick && onClick(event);
  };
  return (
    <Input
      inputId='duedate'
      className='w-full'
      endIcon={<SelectorToggleButton component='div' onClick={handleIconClick} />}
      endIconColor='icon-secondary'
      label={t('date.dueDateInput.label', 'Due date', 'Due date field.')}
      onClick={onClick}
      placeholder={t('date.dueDateInputPlaceholder.label', 'Choose due date', 'Due date placeholder.')}
      value={value}
      {...props}
    />
  );
};

export const EditIssueModal: React.FC<Props> = ({ open, onClose, issue }) => {
  const ui = useUI();
  const [formData, setFormData] = React.useState<Partial<Issue>>({ ...issue });

  useEffect(() => {
    setFormData({ ...issue });
  }, [issue]);

  const controller = useIssue({
    locationId: issue.locationId,
    issueId: issue.issueId,
  });

  const close = () => {
    onClose();
  };

  const edit = () => {
    controller.update({
      ...formData,
    });
    close();
  };

  const priorities = [IssuePriority.Critical, IssuePriority.High, IssuePriority.Medium, IssuePriority.Low];

  const presentPriority = (priority: IssuePriority) => {
    switch (priority) {
      case IssuePriority.Critical:
        return 'Critical';
      case IssuePriority.High:
        return 'High';
      case IssuePriority.Medium:
        return 'Medium';
      case IssuePriority.Low:
        return 'Low';
    }
  };

  function getPriority(priority: IssuePriority) {
    switch (priority) {
      case IssuePriority.Critical:
        return {
          label: t('events.criticalEvent.label', 'Critical', 'Critical event.'),
          color: 'red',
          icon: <ChevronUpDoubleLineIcon />,
        };
      case IssuePriority.High:
        return {
          label: t('events.highEvent.label', 'High', 'High priority notification.'),
          color: 'orange',
          icon: <ChevronUpLineIcon />,
        };
      case IssuePriority.Medium:
        return {
          label: t('events.mediumEvent.label', 'Medium', 'Medium priority notification.'),
          color: 'amber',
          icon: <EqualLineIcon />,
        };
      case IssuePriority.Low:
        return {
          label: t('events.lowEvent.label', 'Low', 'Low priority notification.'),
          color: 'blue',
          icon: <ChevronDownLineIcon />,
        };
    }
  }

  const statuses = [IssueStatus.Open, IssueStatus.InProgress, IssueStatus.Resolved, IssueStatus.Closed];

  const presentStatus = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.Open:
        return t('status.openStatus.label', 'Open', 'Open status.');
      case IssueStatus.InProgress:
        return t('status.inProgressStatus.label', 'In Progress', 'In Progress status.');
      case IssueStatus.Resolved:
        return t('status.resolvedStatus.label', 'Resolved', 'Resolved status.');
      case IssueStatus.Closed:
        return t('status.closedStatus.label', 'Closed', 'Closed status.');
    }
  };

  function getAlertPriority(priority: AlertPriority) {
    switch (priority) {
      case AlertPriority.Critical:
        return { label: t('events.criticalEvent.label', 'Critical', 'Critical event.'), color: 'error' };
      case AlertPriority.Warning:
        return { label: t('events.warning.label', 'Warning', 'Warning notification.'), color: 'success' };
      case AlertPriority.Normal:
        return { label: t('events.normal.label', 'Normal', 'Normal notification.'), color: 'warning' };
      case AlertPriority.Trivial:
        return { label: t('events.trivial.label', 'Trivial', 'Trivial notification.'), color: 'trivial' };
    }
  }

  const locations = useLocations();
  const company = locations.getCompany();
  const users = useUsers({
    locationId: company.locationId,
    fileName: 'avatar',
  });

  const { data } = useNotification(issue.locationId, issue.alerts[0]);
  const item = data?.[0];
  if (!item) return null;

  return (
    <Modal open={open} onClose={close}>
      <Card width={42}>
        <CardHeader
          action={
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              color='icon-secondary'
              onClick={close}
              size='lg'
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          }
          disablePaddingBottom
          size='sm'
          title={t('issue.editIssueTitle.label', 'Edit Issue', 'Edit issue title.')}
        />
        <CardContent size='sm'>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Card color='surface-02' fullWidth>
                <CardContent>
                  {issue.alerts.map((item) => (
                    <EventCard key={item.alertId} locationId={issue.locationId} alert={item} />
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item>
                  <Input
                    inputId='Priority'
                    label='Priority'
                    startIcon={<ChevronUpLineIcon />}
                    startIconColor='warning'
                    placeholder='Priority'
                    value={formData.priority}
                    onChange={(evt) => setFormData({ ...formData, priority: parseInt(evt.target.value) })}
                    type='number'
                  />
                </Grid>
                <Grid item>
                  <Input
                    inputId='DueDate'
                    label='Due date'
                    placeholder='Date'
                    value={formData.dueDate?.toISOString()}
                    onChange={(evt) => setFormData({ ...formData, dueDate: new Date(evt.target.value) })}
                    type='datetime'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Input
                inputId='Summary'
                label='Summary'
                placeholder='Event title'
                value={formData.title}
                onChange={(evt) => setFormData({ ...formData, title: evt.target.value })}
                type='text'
              />
            </Grid>
            <Grid item>
              <textarea
                value={formData.text}
                onChange={(evt) => setFormData({ ...formData, text: evt.target.value })}
              />
            </Grid>
          </Grid> */}
            <Grid item>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <DataSelect
                    id='priority'
                    label={t('events.priority.label', 'Priority', "Event's importance.")}
                    onChange={(value) => setFormData({ ...formData, priority: value })}
                    options={priorities}
                    placeholder={`${t('events.priority.label', 'Priority', "Event's importance.")}:`}
                    present={presentPriority}
                    startIcon={(item) => getPriority(item)?.icon}
                    startIconColor={(item) => getPriority(item)?.color}
                    value={formData.priority}
                  />
                </Grid>
                <Grid item lg={6}>
                  {/* <Input
                    onChange={(evt) => setFormData({ ...formData, dueDate: moment(evt.target.value).toDate() })}
                    placeholder={moment(formData.dueDate).toISOString()}
                    value={moment(formData.dueDate).toISOString()}
                  /> */}
                  <DatePicker
                    customInput={<CustomInput />}
                    dateFormat='dd/MM/yyyy'
                    locale='en-gb'
                    onChange={(date: Date) => setFormData({ ...formData, dueDate: date })}
                    popperPlacement='bottom'
                    selected={moment(formData.dueDate).toDate()}
                    showPopperArrow={false}
                    startDate={moment(formData.dueDate).toDate()}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <DataSelect
                id='status'
                label={t('issue.status.label', 'Status', "Issue's status.")}
                onChange={(value) => setFormData({ ...formData, status: value })}
                options={statuses}
                placeholder={`${t('issue.status.label', 'Status', "Issue's status.")}:`}
                present={presentStatus}
                value={formData.status}
              />
            </Grid>
            <Grid item>
              <Input
                id='summary'
                label={t('issue.summary.label', 'Summary', 'Overview of the issue.')}
                onChange={(evt) => setFormData({ ...formData, title: evt.target.value })}
                value={formData.title}
              />
            </Grid>
            <Grid item>
              <Grid direction='column' fullWidth>
                <InputLabel label={t('issue.description.label', 'Description', 'Issue description.')} />
                <Editor
                  onChange={(evt) => setFormData({ ...formData, text: evt.target.value })}
                  value={formData.text}
                />
              </Grid>
              {/* <Textarea
                inputId='textarea'
                label='Description'
                onChange={(evt) => setFormData({ ...formData, text: evt.target.value })}
                placeholder='Type something…'
                rows={3}
                value={ReactHtmlParser(formData.text)}
              /> */}
            </Grid>
            <Grid item>
              <UsersSelect
                inputId='assignee'
                label={t('issue.assignee.label', 'Assignee', "Issue's assignee.")}
                locationId={ui.currentFormation}
                onSelect={(value) => setFormData({ ...formData, assignee: value, assigneeId: value?.userId })}
                placeholder={`${t('issue.assignee.label', 'Assignee', "Issue's assignee.")}:`}
                required={true}
                value={formData.assignee}
              />
            </Grid>
            {/* <DataSelect
            placeholder={'Reporter:'}
            options={users.getData()}
            value={formData.reporter}
            onChange={(value) => setFormData({ ...formData, reporter: value, reporterId: value.userId })}
            present={(user) => user.firstName + ' ' + user.lastName}
          /> */}
          </Grid>
        </CardContent>
        <CardActions borderTop>
          <Grid container justifyContent='end' spacing={2}>
            <Grid item>
              <Button onClick={close} variant='outlined'>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={edit} variant='solid'>
                {t('general.saveButton.label', 'Save', 'Save button.')}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  );
};
