import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import moment from 'moment';

// types

import { AlertPriority, Issue, IssuePriority, IssueStatus, Notification } from '@core/api/types';
import { getPriorityData } from '@core/ui/types';

// storages

import { useAuth } from '@core/storages/auth';
import { useComments } from '@core/storages/controllers/comments';
import { useIssue } from '@core/storages/controllers/issue';
import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// pages

import { WaitingPage } from '@core/ui/pages/WaitingPage';

// components

import { AddComment } from './AddComment';
import { AssetCard } from './AssetCard';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { EditComment } from './EditComment';
import { EditIssue } from '../EditIssue';
import { EditIssueModal } from '../EditIssueModal';
import { EventCard } from './EventCard';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Icon } from '@core/ui/components/Icon';
import { Indicator } from '@core/ui/components/Indicator';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { UserAvatar } from '@core/ui/cerebro/UserAvatar';

// icons

import CalendarLineIcon from '@assets/icons/line/calendar.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';
import ChevronUpDoubleLineIcon from '@assets/icons/line/chevron-up-double.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import ClockLineIcon from '@assets/icons/line/clock.svg?component';
import EqualLineIcon from '@assets/icons/line/equal.svg?component';

export const getStatusData = (status: IssueStatus) => {
  switch (status) {
    case IssueStatus.Open:
      return {
        label: t('status.openStatus.label', 'Open', 'Open status.'),
        color: 'secondary',
      };
    case IssueStatus.InProgress:
      return {
        label: t('status.inProgressStatus.label', 'In Progress', 'In Progress status.'),
        color: 'violet',
      };
    case IssueStatus.Resolved:
      return {
        label: t('status.resolvedStatus.label', 'Resolved', 'Resolved status.'),
        color: 'teal',
      };
    case IssueStatus.Closed:
      return {
        label: t('status.closedStatus.label', 'Closed', 'Closed status.'),
        color: 'success',
      };
  }
};

export function getPriority(priority: IssuePriority) {
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

export const IssuePage = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const ui = useUI();
  const controller = useIssue({
    locationId: ui.currentFormation,
    issueId: issueId ? parseInt(issueId) : undefined,
  });

  const issue = controller.data;

  const comments = useComments({
    locationId: ui.currentFormation,
    issueId: issueId ? parseInt(issueId) : undefined,
  });

  const [openDialog, setDialogOpen] = React.useState(false);

  // DESCRIPTION

  const [showDescription, setShowDescription] = React.useState(true);

  const handleEditDescription = () => {
    setShowDescription(!showDescription);
  };

  const auth = useAuth();

  return issue ? (
    <>
      <Header title={t('issue.issuesTitle.label', 'Issues', 'Issues title.')} backLink />
      <UnitContainer>
        <Unit>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Card fullWidth>
                {/* HEADER */}
                <CardHeader borderBottom>
                  <Grid direction='column' fullWidth>
                    <Grid container alignItems='center' justifyContent='between' spacing={3}>
                      <Grid item>
                        <Text component='h1' variant='lg' weight='semibold'>
                          {issue.title}
                        </Text>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => setDialogOpen(true)} variant='outlined'>
                          {t('issue.editIssueTitle.label', 'Edit Issue', 'Edit issue title.')}
                        </Button>
                      </Grid>
                    </Grid>
                    <Text color='typography-tertiary' variant='sm' weight='semibold'>
                      {`IVD-${issue.issueId}` /* TODO prefixes */}
                    </Text>
                  </Grid>
                </CardHeader>
                {/* CONTENT */}
                <CardContent>
                  <Grid container direction='column' spacing={3}>
                    <Grid item>
                      <Text component='h2' variant='sm' weight='semibold'>
                        {t('issue.description.label', 'Description', 'Issue description.')}
                      </Text>
                    </Grid>
                    <Grid item>
                      {auth.profile?.userId === issue.assignee?.userId ? (
                        <>
                          <div onClick={handleEditDescription}>
                            {showDescription && <Text variant='paragraph-md'>{parse(issue.text)}</Text>}
                          </div>
                          {!showDescription && <EditIssue issue={issue} onSave={handleEditDescription} />}
                        </>
                      ) : (
                        <Text variant='paragraph-md'>{parse(issue.text)}</Text>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* COMMENTS */}
            <Grid item>
              <Card fullWidth>
                <CardContent>
                  <Grid container direction='column' spacing={6}>
                    {/* COMMENT ADD */}
                    <Grid item>
                      <AddComment issue={issue} />
                    </Grid>
                    {/* COMMENTS LIST */}
                    {comments.data &&
                      comments.data.map((comment) => (
                        <EditComment key={comment.commentId} comment={comment} issue={issue} />
                      ))}
                    {/* COMMENT 02 */}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Unit>
        <Unit variant='sidebar'>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Card fullWidth>
                <CardHeader title={t('issue.aboutEvent.label', 'About event', 'About event title.')} />
                <CardContent disablePaddingTop>
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
                    <Grid item>
                      {issue.alerts.map((item) => (
                        <AssetCard key={item.alertId} locationId={issue.locationId} alert={item} />
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* DETAILS */}
            <Grid item>
              <Card fullWidth>
                <CardHeader title={t('issue.details.label', 'Details', 'Issue specifics.')} />
                <CardContent disablePaddingTop>
                  <Grid display='grid' className='grid-cols-[1fr_2fr] items-center gap-5'>
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('issue.status.label', 'Status', "Issue's status.")}
                    </Text>
                    <Grid>
                      {((status) => (
                        <Chip color={status.color} uppercase>
                          {status.label}
                        </Chip>
                      ))(getStatusData(issue.status))}
                    </Grid>
                    {/* ASSIGNEE */}

                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('issue.assignee.label', 'Assignee', "Issue's assignee.")}
                    </Text>

                    <Grid container spacing={2}>
                      {issue.assignee ? (
                        <>
                          <Grid item>
                            <UserAvatar user={issue.assignee} rounded size='sm' />
                          </Grid>
                          <Grid item>
                            <Text
                              variant='sm'
                              weight='medium'
                            >{`${issue.assignee?.firstName} ${issue.assignee?.lastName}`}</Text>
                          </Grid>
                        </>
                      ) : null}
                    </Grid>

                    {/* REPORTER */}
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('issue.reporter.label', 'Reporter', "Issue's Reporter.")}
                    </Text>
                    <Grid container spacing={2}>
                      <Grid item>
                        <UserAvatar user={issue.reporter} rounded size='sm' />
                      </Grid>
                      <Grid item>
                        <Text
                          variant='sm'
                          weight='medium'
                        >{`${issue.reporter.firstName} ${issue.reporter.lastName}`}</Text>
                      </Grid>
                    </Grid>
                    {/* PRIORITY */}
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('events.priority.label', 'Priority', "Event's importance.")}
                    </Text>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Icon color={getPriority(issue.priority).color} variant='plain'>
                          {getPriority(issue.priority).icon}
                        </Icon>
                      </Grid>
                      <Grid item>
                        <Text variant='sm' weight='medium'>
                          {getPriority(issue.priority).label}
                        </Text>
                      </Grid>
                    </Grid>
                    {/* Due date */}
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('date.dueDateInput.label', 'Due date', 'Due date field.')}
                    </Text>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Icon color='icon-tertiary' variant='plain'>
                          <CalendarLineIcon />
                        </Icon>
                      </Grid>
                      <Grid item>
                        <Text variant='sm' weight='medium'>
                          {moment(issue.dueDate).format('D MMMM YYYY')}
                        </Text>
                      </Grid>
                    </Grid>
                    {/* Created at */}
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t('date.createdAt.label', 'Created at', 'Date of creation.')}
                    </Text>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Icon color='icon-tertiary' variant='plain'>
                          <ClockLineIcon />
                        </Icon>
                      </Grid>
                      <Grid item>
                        <Text variant='sm' weight='medium'>
                          {moment(issue.creationDate).format('D MMMM YYYY, HH:mm')}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Unit>
      </UnitContainer>
      <EditIssueModal issue={issue} onClose={() => setDialogOpen(false)} open={openDialog} />
    </>
  ) : controller.isLoading ? (
    <WaitingPage />
  ) : (
    <Text>{t('issue.notFound.label', 'Issue not found', 'The issue is missing.')}</Text>
  );
};
