import React, { useState } from 'react';

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
import { Swatch } from '@core/ui/components/Palette/Swatch';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
  group?: ElementOf<UserGroupsQuery['userGroups']>;
} & React.HTMLAttributes<HTMLElement>;

export const AddGroup: React.FC<Props> = ({ className, onClose, group, ...props }) => {
  const [formData, setFormData] = useState({
    groupname: '',
    description: '',
    locations: '',
  });

  const { groupname, description, locations } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const validate = () => {
    return groupname.length;
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
        title={t('user.addGroupButton.label', 'Add group', 'Add Group Button.')}
      />
      <form id='add-user-group-form' className={styles['form']} onSubmit={onSubmit}>
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
                        id='groupname'
                        label={t('user.groupNameInput.label', 'Group name', 'The collective label for a team.')}
                        name='groupname'
                        onChange={onChange}
                        placeholder={t(
                          'user.groupNameInputPlaceholder.label',
                          'Enter group name',
                          'Group name placeholder.',
                        )}
                        required
                        value={groupname}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id='description'
                        label={t('user.descriptionInput.label', 'Description', 'User group description field.')}
                        name='description'
                        onChange={onChange}
                        placeholder={t(
                          'user.descriptionInputPlaceholder.label',
                          'Enter description of group',
                          'Group name placeholder.',
                        )}
                        value={description}
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
                        onChange={onChange}
                        placeholder={t(
                          'location.selectLocationFromList.label',
                          'Select location',
                          'Select location from the list.',
                        )}
                        value={locations}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Button fullWidth variant='solid' type='submit' disabled={!validate()}>
            {t('user.addGroupButton.label', 'Add group', 'Add Group Button.')}
          </Button>
        </CardContent>
      </form>
    </>
  );
};
