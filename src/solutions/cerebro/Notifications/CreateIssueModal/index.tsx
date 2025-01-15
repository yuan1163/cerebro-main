import React from 'react';
import moment from 'moment';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('en-gb', enGb);

// types

import { InputProps } from '@core/api/typesDesignSystem';

// utils

import { t } from '@core/utils/translate';

// data binding

import { useAvatar } from '@core/storages/controllers/users';
import { AlertPriority, Issue, IssuePriority, Notification } from '@core/api/types';
import { useIssue } from '@core/storages/controllers/issue';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { useUsers } from '@core/storages/controllers/users';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Editor } from '@core/ui/components/Editor';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Indicator } from '@core/ui/components/Indicator';
import { Input } from '@core/ui/components/Input';
import { IssuePrioritySelect } from '@core/ui/cerebro/IssuePrioritySelect';
import { Modal } from '@core/ui/components/Modal';
import { SelectorToggleButton } from '@core/ui/components/SelectorToggleButton';
import { Text } from '@core/ui/components/Text';
import { Textarea } from '@core/ui/components/Textarea';
import { UsersSelect } from '@core/ui/cerebro/UsersSelect';

// icons

import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  open: boolean;
  onClose: () => void;
  event: Partial<Notification>;
};

// const UserAvatar = ({ user }) => {
//   const avatar = useAvatar(user.avatarId);

//   return <Avatar className={styles['avatar']} disabled={disabled} rounded size='xs' />;
// };

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

export const CreateIssueModal: React.FC<Props> = ({ open, onClose, event }) => {
  const ui = useUI();
  const [formData, setFormData] = React.useState<Partial<Issue>>({});

  const issue = useIssue({});

  const close = () => {
    setFormData({});
    onClose();
  };

  const create = () => {
    issue.add({
      ...formData,
      locationId: ui.currentFormation,
      alerts: [{ alertId: event.alertId, creationDate: event.creationDate }],
    });
    close();
  };

  const priorities = [IssuePriority.Critical, IssuePriority.High, IssuePriority.Medium, IssuePriority.Low];

  const getIndicatorColorByAlertPriority = (priority: AlertPriority): string => {
    switch (priority) {
      case AlertPriority.Critical:
        return t('events.error.label', 'Error', 'Error notification.');
      case AlertPriority.Normal:
        return t('events.success.label', 'Success', 'Success notification.');
      case AlertPriority.Warning:
        return t('events.warning.label', 'Warning', 'Warning notification.');
      case AlertPriority.Trivial:
        return t('events.trivial.label', 'Trivial', 'Trivial notification.');
    }
  };

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
          title={t('issue.createIssue.label', 'Create Issue', 'Create issue title.')}
        />
        <CardContent size='sm'>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Card color='surface-02' fullWidth>
                <CardContent>
                  <Grid alignItems='center'>
                    <Indicator severity={getIndicatorColorByAlertPriority(event.alertPriority || 0)} />
                    <Grid container direction='column'>
                      <Text variant='sm' weight='medium'>
                        {event.actionText ?? '–'}
                      </Text>
                      <Text color='typography-secondary' variant='sm'>
                        {event.device?.name ?? '–'}
                      </Text>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <IssuePrioritySelect
                    inputId='priority'
                    label={t('events.priority.label', 'Priority', "Event's importance.")}
                    onSelect={(option) => setFormData({ ...formData, priority: option })}
                    placeholder={`${t('issue.allPriority.label', 'All priority', 'Priority of issue.')}:`}
                    value={formData.priority}
                  />
                </Grid>
                <Grid item lg={6}>
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
              <Input
                inputId='summary'
                label={t('issue.summary.label', 'Summary', 'Overview of the issue.')}
                onChange={(evt) => setFormData({ ...formData, title: evt.target.value })}
                value={formData.title}
              />
            </Grid>
            <Grid item>
              <Editor onChange={(evt) => setFormData({ ...formData, text: evt.target.value })} value={formData.text} />
              {/* <Textarea
                inputId='textarea'
                label='Description'
                onChange={(evt) => setFormData({ ...formData, text: evt.target.value })}
                placeholder='Type something…'
                rows={3}
                value={formData.text}
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
          </Grid>
        </CardContent>
        <CardActions borderTop>
          <Grid container justifyContent='end' spacing={2}>
            <Grid item>
              <Button onClick={close} variant='outlined'>
                {t('general.closeButton.label', 'Close', 'Close button.')}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={create} variant='solid'>
                {t('general.createButton.label', 'Create', 'Create button.')}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  );
};

{
  /* <Grid item lg={6}>
                  <DataSelect
                    id='reporter'
                    disabled
                    label='Reporter'
                    onChange={(value) => setFormData({ ...formData, reporter: value, reporterId: value.userId })}
                    options={users.getData()}
                    placeholder='Reporter'
                    present={(user) => user.firstName + ' ' + user.lastName}
                    value={formData.reporter}
                  />
                </Grid> */
}
