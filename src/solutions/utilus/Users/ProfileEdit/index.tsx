import React from 'react';

// utils

import { t } from '@core/utils/translate';

// api

import { UsersQuery } from '@solutions/utilus/api/generated';
import { UserGroupsQuery } from '@solutions/utilus/api/generated';

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
import { Checkbox } from '@core/ui/components/Checkbox';
import { Disclosure } from '@headlessui/react';
import { FormControl } from '@core/ui/components/FormControl';
import { FormControlLabel } from '@core/ui/components/FormControlLabel';
import { FormLabel } from '@core/ui/components/FormLabel';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Modal } from '@core/ui/components/Modal';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectGroup } from '@core/ui/components/Inputs/SelectGroup';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  groupList?: UserGroupsQuery['userGroups'];
  onClose?: () => void;
  user?: ElementOf<UsersQuery['users']>;
} & React.HTMLAttributes<HTMLElement>;

export const ProfileEdit: React.FC<Props> = ({ className, groupList, onClose, user, ...props }) => {
  // dialog

  const [openDialog, setDialogOpen] = React.useState(false);

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // form

  const [formData, setFormData] = React.useState({
    fname: '',
    email: '',
    phone: '',
    timezone: '',
    jobTitle: '',
    role: '',
    group: '',
  });

  const { fname, email, phone, jobTitle, timezone, role, group } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const validate = () => {
    return fname.length;
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
        title={t('user.editUser.label', 'Edit User', 'Editing User.')}
      />
      <form id='profile-edit-form' className={styles['form']} onSubmit={onSubmit}>
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
                  <Grid item>
                    <Box className={styles['avatar-container']}>
                      <Grid container spacing={2} alignItems='stretch' justifyContent='between'>
                        <Grid item>
                          <Grid direction='column' justifyContent='between'>
                            <Stack spacing={0}>
                              <Text variant='sm' lineHeight='snug' weight='bold'>
                                {t('user.profileImage.label', 'Profile Image', 'User avatar image.')}
                              </Text>
                              <Text color='typography-secondary' lineHeight='snug' variant='sm'>
                                {t(
                                  'general.imageRecommendedSize.label',
                                  'Recommended 500x500 px',
                                  'The recommended size for the uploaded image.',
                                )}
                              </Text>
                            </Stack>
                            <Stack direction='row'>
                              <Button size='sm' variant='solid'>
                                {t('general.imageFileChangeButton.label', 'Change', 'Change button.')}
                              </Button>
                              <Button size='sm' variant='outlined' disabled>
                                {t(
                                  'general.imageFileRemoveButton.label',
                                  'Remove',
                                  'Removal or deletion of an image button.',
                                )}
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Avatar
                            className={styles['avatar']}
                            firstName={user?.firstName ?? ''}
                            size='4xl'
                            src={user?.avatar ?? ''}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <Input
                        id='fname'
                        label={t('user.fullNameInput.label', 'Full Name', 'User full name input label.')}
                        name='fname'
                        onChange={onChange}
                        placeholder={`${user?.firstName} ${user?.lastName}`}
                        required
                        value={fname}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id='email'
                        label={t('user.emailInput.label', 'Email', 'User email input Label.')}
                        name='email'
                        onChange={onChange}
                        placeholder={
                          user?.email ??
                          t('user.emailInputPlaceholder.label', 'Enter email', 'User email input placeholder.')
                        }
                        type='email'
                        value={email}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id='phone'
                        label={t('user.phoneInput.label', 'Phone', 'User phone input label.')}
                        name='phone'
                        onChange={onChange}
                        placeholder={
                          user?.phone ??
                          t('user.phoneInputPlaceholder.label', 'Enter phone number', 'User phone input placeholder.')
                        }
                        type='tel'
                        value={phone}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id='timezone'
                        label={t('user.phoneInput.label', 'Phone', 'User phone input label.')}
                        name='timezone'
                        onChange={onChange}
                        placeholder={t(
                          'user.timezoneInputPlaceholder.label',
                          'Add a timezone',
                          'User timezone input placeholder.',
                        )}
                        value={timezone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
              <Accordion
                disableSummaryGutters
                disableGutters
                title={t(
                  'user.permissions.label',
                  'Permissions',
                  'Permissions determine what a user can or cannot do.',
                )}
                size='sm'
              >
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Input
                      id='jobTitle'
                      label={t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}
                      name='jobTitle'
                      onChange={onChange}
                      placeholder={
                        user?.jobTitle ??
                        t('user.jobTitleInputPlaceholder.label', 'Enter job title', 'User job title input placeholder.')
                      }
                      value={jobTitle}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      id='role'
                      label={t('user.roleInput.label', 'Role', 'User role input label.')}
                      name='role'
                      onChange={onChange}
                      placeholder={
                        user?.role?.name ??
                        t('user.roleInputPlaceholder.label', 'Enter role', 'User role input placeholder.')
                      }
                      value={role}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormLabel component='label' htmlFor='group'>
                        {t('user.groups.label', 'Groups', 'User groups.')}
                      </FormLabel>
                      <SelectGroup
                        groupList={groupList}
                        id='group'
                        name='group'
                        onChange={onChange}
                        user={user}
                        value={group}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Accordion>
              <Accordion
                disableSummaryGutters
                disableGutters
                title={t('user.notifications.label', 'Notifications', 'Notifications.')}
                size='sm'
              >
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormLabel>
                        {t(
                          'user.methodOfContact.label',
                          'Preferred method of contact',
                          'Preferred method to contact user.',
                        )}
                      </FormLabel>
                      <Card color='surface-02' fullWidth>
                        <CardContent>
                          <Stack spacing={3}>
                            <FormControl size='sm' variant='checkbox'>
                              <Checkbox
                                inputId='text-checkbox'
                                label={t('user.methodOfContactText.label', 'Text', 'Text method to contact user.')}
                                size='sm'
                                disabled
                              />
                            </FormControl>
                            <FormControl size='sm' variant='checkbox'>
                              <Checkbox
                                inputId='email-checkbox'
                                label={t('user.methodOfContactEmail.label', 'Email', 'Email Method to Contact User.')}
                                size='sm'
                                disabled
                              />
                            </FormControl>
                            <FormControl size='sm' variant='checkbox'>
                              <Checkbox
                                inputId='call-checkbox'
                                label={t('user.methodOfContactCall.label', 'Call', 'Call method to contact user.')}
                                size='sm'
                                disabled
                              />
                            </FormControl>
                          </Stack>
                        </CardContent>
                      </Card>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormLabel>
                        {t(
                          'user.feedbackDispatchCriteria.label',
                          'Send notifications, when...',
                          'Feedback dispatch criteria.',
                        )}
                      </FormLabel>
                      <Card color='surface-02' fullWidth>
                        <CardContent>
                          <Stack spacing={3}>
                            <Checkbox
                              inputId='critical-events-checkbox'
                              label={t(
                                'events.criticalEvents.label',
                                'Critical events',
                                'Significant incidents that demand urgent attention.',
                              )}
                              size='sm'
                              disabled
                            />
                            <Checkbox
                              inputId='tickets-checkbox'
                              label={t(
                                'user.feedbackDispatchCriteriaTickets.label',
                                'Tickets create, commented, resolved',
                                'Feedback when tickets were created, commented, resolved.',
                              )}
                              size='sm'
                              disabled
                            />
                            <Checkbox
                              inputId='news-checkbox'
                              label={t(
                                'user.feedbackDispatchCriteriaNews.label',
                                'News and updates',
                                'Send feedback when new updates are available.',
                              )}
                              size='sm'
                              disabled
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </FormControl>
                  </Grid>
                </Grid>
              </Accordion>
              <Accordion disableSummaryGutters disableGutters title='Security' size='sm'>
                <Grid container direction='column' spacing={3}>
                  <Grid item>
                    <Input
                      id='current_password'
                      label={t('user.currentPassword.label', 'Current password', "User's present password.")}
                      name='current_password'
                      placeholder=''
                      type='password'
                      value='12345678'
                      disabled
                    />
                  </Grid>
                  <Grid item>
                    <Stack direction='row' fullWidth>
                      <Button fullWidth variant='solid' disabled>
                        {t(
                          'general.changePasswordButton.label',
                          'Change Password',
                          'Title indicates a section or prompt where users can update their account password.',
                        )}
                      </Button>
                      <Button fullWidth variant='outlined' disabled>
                        {t(
                          'general.requestNewPasswordButton.label',
                          'Request a new one',
                          'Request a new one password button.',
                        )}
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Text color='typography-secondary' variant='sm'>
                      {t(
                        'general.requestNewPasswordCaption.label',
                        "If you don't know your current password – Request a new one. Note: You will be automatically logged out and password reset instructions will be sent to vlee@gmail.com",
                        'Prompt for users to obtain a replacement password.',
                      )}
                    </Text>
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
                title={t('general.closeButton.label', 'Close', 'Close button.')}
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
