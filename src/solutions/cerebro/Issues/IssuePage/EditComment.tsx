import React from 'react';
import moment from 'moment';

// types

import { Issue, Comment } from '@core/api/types';

// components
import { UserAvatar } from '@core/ui/cerebro/UserAvatar';
import { Button } from '@core/ui/components/Button';
import { Bull } from '@core/ui/components/Bull';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

import { useComment } from '@core/storages/controllers/comments';
import { Textarea } from '@core/ui/components/Textarea';
import { useAuth } from '@core/storages/auth';

type Props = {
  issue: Issue;
  comment: Comment;
};

export const EditComment: React.FC<Props> = ({ issue, comment }) => {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(comment.text);
  const controller = useComment(issue, comment);
  const auth = useAuth();

  return (
    <Grid item>
      <Grid container spacing={4}>
        <Grid item>
          <UserAvatar user={comment.author} rounded size='xl' />
        </Grid>
        <Grid item grow>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <Grid container alignItems='baseline'>
                <Text variant='sm' weight='medium'>
                  {`${comment.author.firstName} ${comment.author.lastName}`}
                </Text>
                <Bull />
                <Text color='typography-tertiary' variant='sm'>
                  {moment(comment.creationDate).format('D MMMM YYYY [at] HH:mm A')}
                </Text>
              </Grid>
            </Grid>
            <Grid item>
              {editing ? (
                <Textarea value={text} onChange={(evt) => setText(evt.target.value)} />
              ) : (
                <Text variant='paragraph-md'>{comment.text}</Text>
              )}
            </Grid>
            {auth.profile?.userId === comment.author.userId && (
              <Grid item>
                {editing ? (
                  <Grid container justifyContent='end' spacing={4}>
                    <Grid item>
                      <Button color='typography-primary' variant='text' onClick={() => setEditing(false)} size='md'>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='solid'
                        onClick={() => {
                          controller.update({ text });
                          setEditing(false);
                        }}
                        size='md'
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Button color='typography-secondary' variant='text' onClick={() => controller.remove()} size='md'>
                      Delete
                    </Button>
                    <Bull />
                    <Button color='typography-secondary' variant='text' onClick={() => setEditing(true)} size='md'>
                      Edit
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
