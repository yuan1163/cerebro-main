import React from 'react';

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User } from '@core/api/types';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { AccordionSummary } from '@core/ui/components/AccordionSummary';
import { Avatar } from '@core/ui/components/Avatar';
import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Disclosure } from '@headlessui/react';
import { FormControl } from '@core/ui/components/FormControl';
import { FormLabel } from '@core/ui/components/FormLabel';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Modal } from '@core/ui/components/Modal';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { Swatch } from '@core/ui/components/Palette/Swatch';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
  group?: ElementOf<UserGroupsQuery['userGroups']>;
} & React.HTMLAttributes<HTMLElement>;

export const GroupEdit: React.FC<Props> = ({ className, onClose, group, ...props }) => {
  // dialog

  const [openDialog, setDialogOpen] = React.useState(false);

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <CardHeader
        action={
          <IconButton
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            size='lg'
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
        title={t('user.editGroup.label', 'Edit Group', 'Edit user group.')}
      />
      <form id='user-data' className={styles['form']} onSubmit={() => ''}>
        <Scrollbar>
          <CardContent className={styles['card-content']}>
            <Grid direction='column'>
              <Accordion
                disableSummaryGutters
                disableGutters
                defaultOpen
                title={t('solutions.basicInformation.label', 'Basic information', 'Basic information header.')}
                size='sm'
              >
                <Grid direction='column'>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <Input
                        id='groupName'
                        label={t('user.groupNameInput.label', 'Group name', 'The collective label for a team.')}
                        name='groupName'
                        placeholder={group?.name ?? ''}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id='description'
                        label={t('user.descriptionInput.label', 'Description', 'User group description field.')}
                        name='description'
                        placeholder={
                          group?.description ??
                          t(
                            'user.descriptionInputPlaceholder.label',
                            'Enter description of group',
                            'Group name placeholder.',
                          )
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Grid direction='column'>
                        <FormLabel>
                          {t(
                            'general.color.label',
                            'Color',
                            'Specific hue assigned to categorize or visually distinguish labels or folders.',
                          )}
                        </FormLabel>
                        <Grid container alignItems='center' wrap='wrap'>
                          <Swatch />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Input
                        id='locations'
                        label={t('location.locations.label', 'Locations', 'Locations.')}
                        name='locations'
                        placeholder={t(
                          'location.addLocation.label',
                          'Add location',
                          'Action that allows to specify a new geographical location.',
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Modal
            open={openDialog}
            onClose={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            className='max-w-[28.5rem]'
          >
            <Card>
              <CardHeader
                action={
                  <IconButton
                    ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
                    color='icon-secondary'
                    onClick={() => {
                      setDialogOpen(false);
                      onClose?.();
                    }}
                    size='lg'
                    variant='text'
                  >
                    <XCloseLineIcon />
                  </IconButton>
                }
                className='card-header'
                disablePaddingBottom
                size='sm'
                title={t(
                  'general.unsavedChanges.label',
                  'Unsaved changes',
                  'Modifications made by the user that have not yet been saved or confirmed.',
                )}
              />
              <CardContent size='sm'>
                <Text color='typography-secondary' variant='sm'>
                  {t(
                    'general.unsavedChangesCaption.label',
                    'Are you sure you want to close without saving? Any unsaved changes will be lost.',
                    'This message seeks user confirmation when attempting to close a document or application without saving changes.',
                  )}
                </Text>
              </CardContent>
              <CardActions borderTop>
                <Grid container justifyContent='end' spacing={2}>
                  <Grid item>
                    <Button variant='outlined'>
                      {t(
                        'general.closeWithoutSavingButton.label',
                        'Close without Saving.',
                        'Action that allows to exit an application without preserving any unsaved changes.',
                      )}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant='solid'>
                      {t(
                        'general.saveAndCloseButton.label',
                        'Save and Close',
                        'Action that enables to save any changes and close the application.',
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Modal>
          <Button fullWidth onClick={handleClickDialogOpen} variant='solid'>
            {t('general.saveButton.label', 'Save', 'Save button.')}
          </Button>
        </CardContent>
      </form>
    </>
  );
};
