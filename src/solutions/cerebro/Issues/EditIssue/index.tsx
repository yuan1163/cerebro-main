import React, { useEffect } from 'react';

// types

import { Issue } from '@core/api/types';

// controllers

import { useIssue } from '@core/storages/controllers/issue';
import { useLocations } from '@core/storages/controllers/locations';
import { useNotification } from '@core/storages/controllers/notifications';

// components

import { Button } from '@core/ui/components/Button';
import { Editor } from '@core/ui/components/Editor';
import { Grid } from '@core/ui/components/Grid';

type Props = {
  issue: Issue;
  onSave: () => void;
};

export const EditIssue: React.FC<Props> = ({ issue, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<Issue>>({ ...issue });

  useEffect(() => {
    setFormData({ ...issue });
  }, [issue]);

  const controller = useIssue({
    locationId: issue.locationId,
    issueId: issue.issueId,
  });

  const edit = () => {
    controller.update({
      ...formData,
    });
  };

  const locations = useLocations();
  const company = locations.getCompany();

  const { data } = useNotification(issue.locationId, issue.alerts[0]);
  const item = data?.[0];
  if (!item) return null;

  return (
    <Grid container direction='column' grow spacing={3}>
      <Grid item>
        <Editor onChange={(evt) => setFormData({ ...formData, text: evt.target.value })} value={formData.text} />
      </Grid>
      <Grid item>
        <Grid container justifyContent='end' spacing={2}>
          <Grid item>
            <Button
              onClick={() => {
                edit(), onSave();
              }}
              variant='solid'
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
