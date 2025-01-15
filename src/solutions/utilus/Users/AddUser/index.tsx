import React, { useState } from 'react';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';

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
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Disclosure } from '@headlessui/react';
import { FormControl } from '@core/ui/components/FormControl';
import { FormLabel } from '@core/ui/components/FormLabel';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectGroup } from '@core/ui/components/Inputs/SelectGroup';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  groupList?: UserGroupsQuery['userGroups'];
  onClose?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export const AddUser: React.FC<Props> = ({ className, onClose, groupList, ...props }) => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    phone: '',
    jobTitle: '',
    role: '',
    group: '',
  });

  const { fname, email, phone, jobTitle, role, group } = formData;

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
        title={t('user.addUser.label', 'Add User', 'Add User Title.')}
      />
      <form id='add-user-form' className={styles['form']} onSubmit={onSubmit}>
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
                        id='fname'
                        label={t('user.fullNameInput.label', 'Full Name', 'User full name input label.')}
                        name='fname'
                        onChange={onChange}
                        placeholder={t(
                          'user.firstNameInputPlaceholder.label',
                          'Enter first name',
                          'User first name input placeholder.',
                        )}
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
                        placeholder={t(
                          'user.emailInputPlaceholder.label',
                          'Enter email',
                          'User email input placeholder.',
                        )}
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
                        placeholder={t(
                          'user.phoneInputPlaceholder.label',
                          'Enter phone number',
                          'User phone input placeholder.',
                        )}
                        type='tel'
                        value={phone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>

              <Accordion disableSummaryGutters disableGutters title='Permissions' size='sm'>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Input
                      id='jobTitle'
                      label={t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}
                      name='jobTitle'
                      onChange={onChange}
                      placeholder={t(
                        'user.jobTitleSelectPlaceholder.label',
                        'Select job title',
                        'Pick the relevant job role.',
                      )}
                      value={jobTitle}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      id='role'
                      label={t('user.roleInput.label', 'Role', 'User role input label.')}
                      name='role'
                      onChange={onChange}
                      placeholder={t('user.roleSelect.label', 'Select role', 'User role select label.')}
                      value={role}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormLabel component='label' htmlFor='group'>
                        {t('user.groups.label', 'Groups', 'User groups.')}
                      </FormLabel>
                      <SelectGroup groupList={groupList} id='group' name='group' onChange={onChange} value={group} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Button fullWidth variant='solid' type='submit' disabled={!validate()}>
            {t('user.addUser.label', 'Add User', 'Add User Title.')}
          </Button>
        </CardContent>
      </form>
    </>
  );
};
