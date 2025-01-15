import React from 'react';

// types

import { Issue } from '@core/api/types';

// storages

import { useComment } from '@core/storages/controllers/comments';
import { useAuth } from '@core/storages/auth';

// components

import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { Textarea } from '@core/ui/components/Textarea';
import { UserAvatar } from '@core/ui/cerebro/UserAvatar';

type Props = {
  issue: Issue;
};

export const AddComment: React.FC<Props> = ({ issue }) => {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState('');
  const [rows, setRows] = React.useState(1);
  const handleClear = () => {
    setText('');
  };
  const controller = useComment(issue);

  const auth = useAuth();

  return (
    <Grid container direction='column'>
      <Grid container spacing={4}>
        <Grid item>
          <UserAvatar user={auth.profile} rounded size='xl' />
        </Grid>
        <Grid item grow>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Textarea
                placeholder='Add comment'
                rows={rows}
                value={text}
                onChange={(evt) => {
                  setText(evt.target.value);
                  setEditing(evt.target.value !== '' && true);
                  setRows(4);
                }}
              />
            </Grid>
            {editing && (
              <Grid item>
                <Grid container justifyContent='end' spacing={4}>
                  <Grid item>
                    <Button
                      color='typography-primary'
                      onClick={(evt) => {
                        setEditing(false);
                        handleClear();
                        setRows(1);
                      }}
                      variant='text'
                      size='md'
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='solid'
                      onClick={() => {
                        controller.add({ text });
                        setEditing(false);
                        handleClear();
                        setRows(1);
                      }}
                      size='md'
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

{
  /* <Button
      variant='outlined'
      fullWidth
      onClick={() => {
        setText('');
        setEditing(true);
      }}
    >
      Add comment
    </Button> */
}
