import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '@core/storages/ui';
import { useIssue } from '@core/storages/controllers/issue';
import { Notification } from '@core/api/types';

// utils

import { t } from '@core/utils/translate';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Chip } from '@core/ui/components/Chip';
import { CreateIssueModal } from '../CreateIssueModal';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// issue preview

import { UserAvatar } from '@core/ui/cerebro/UserAvatar';
import { getPriority, getStatusData } from '@solutions/cerebro/Issues/IssuePage';
import { Solutions } from '@core/ui/types';

type Props = {
  event: Partial<Notification>;
  locationId?: number;
  issueId?: number;
};

export const Issue: React.FC<Props> = ({ event, locationId, issueId }) => {
  const { data } = useIssue({ locationId, issueId });

  // modal

  const [openDialog, setDialogOpen] = React.useState(false);

  const ui = useUI();
  const navigate = useNavigate();

  const hideIssues = false;
  // const hideIssues = ui.activeSolution === Solutions.ems;

  return issueId && data ? (
    <Grid item>
      <Card color='surface-02' fullWidth>
        <CardContent>
          <Grid display='grid' gap={2}>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
              <Text component='span' variant='sm' weight='medium'>
                {data?.title}
              </Text>
            </div>
            <Grid alignItems='center' justifyContent='between' container>
              <Grid item>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item>
                    <UserAvatar user={data.assignee} rounded size='sm' />
                  </Grid>
                  <Grid item>
                    <Text color='typography-tertiary' variant='sm' weight='semibold'>
                      {`${data.assignee?.firstName} ${data.assignee?.lastName}`}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid alignItems='center' container spacing={3}>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Icon color={getPriority(data.priority)?.color} variant='plain'>
                          {getPriority(data.priority)?.icon}
                        </Icon>
                      </Grid>
                      <Grid item>
                        <Text variant='sm' weight='medium'>
                          {getPriority(data.priority)?.label}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {((status) => (
                      <Chip color={status?.color} uppercase>
                        {status?.label}
                      </Chip>
                    ))(getStatusData(data.status))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Button
                fullWidth
                className='mt-1'
                variant='outlined'
                onClick={() => navigate(`/${ui.activeSolution}/issues/${ui.currentFormation}/issue/${issueId}`)}
              >
                {t('issue.viewIssue.label', 'View Issue', 'View issue button or link.')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <>
      {!hideIssues && (
        <Grid item>
          <Button fullWidth onClick={() => setDialogOpen(true)} variant='outlined'>
            {t('issue.createIssue.label', 'Create Issue', 'Create issue title.')}
          </Button>

          <CreateIssueModal open={openDialog} onClose={() => setDialogOpen(false)} event={event} />
        </Grid>
      )}
    </>
  );
};
