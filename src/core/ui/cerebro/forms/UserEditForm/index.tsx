import React from 'react';

// storages

import { useUser } from '@core/storages/controllers/users';
import { useModals } from '@core/storages/modals';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// types

import { User, UserRole, Location } from '@core/api/types';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from '../forms.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { FormControl } from '@core/ui/components/FormControl';
import { Grid } from '@core/ui/components/Grid';
import { Input } from '@core/ui/components/Input';
import { Stack } from '@core/ui/components/Stack';
import { SelectLocationForm } from '@core/ui/cerebro/forms/SelectLocationForm';

type Props = {
  create?: boolean;
  user: Partial<User>;
};

export const UserEditForm: React.FC<Props> = ({ create, user }) => {
  const modals = useModals();

  const controller = useUser(user);
  const [data, update] = React.useState<Partial<User>>({ ...user });

  const handleSubmit = (callback: () => void) => {
    return (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      callback();
    };
  };

  const save = async () => {
    if (create) await controller.add(data);
    else await controller.update(data);
    modals.close();
  };

  const remove = async () => {
    await controller.remove();
    modals.close();
  };

  const close = () => {
    modals.close();
  };

  const addLocation = () => {
    const select = (location: Location) => {
      controller.addLocation(location);
      update({ ...data });
    };

    modals.open(<SelectLocationForm onSelect={select} />);
  };

  const removeLocation = (location: Location) => {
    controller.removeLocation(location);
    update({ ...data });
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(save)}>
      <Box className={styles['title-container']}>
        <h2 className={styles['title']}>{t('user.userTitle.label', 'User', 'User Title.')}</h2>
      </Box>
      <Grid direction='column' className={styles['inputs-container']}>
        <FormControl fullWidth>
          <Input
            id='username'
            label={t('user.usernameInput.label', 'Username', 'Username input label.')}
            defaultValue={data.username}
            onChange={(evt) => update({ ...data, username: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='firstName'
            label={t('user.firstNameInput.label', 'First Name', 'User first name input label.')}
            defaultValue={data.firstName}
            onChange={(evt) => update({ ...data, firstName: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='lastName'
            label={t('user.lastNameInput.label', 'Last Name', 'User last name input label.')}
            defaultValue={data.lastName}
            onChange={(evt) => update({ ...data, lastName: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='jobTitle'
            label={t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}
            defaultValue={data.jobTitle}
            onChange={(evt) => update({ ...data, jobTitle: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='email'
            label={t('user.emailInput.label', 'Email', 'User email input Label.')}
            defaultValue={data.email}
            onChange={(evt) => update({ ...data, email: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='phone'
            label={t('user.phoneInput.label', 'Phone', 'User phone input label.')}
            defaultValue={data.phone}
            onChange={(evt) => update({ ...data, phone: evt.target.value })}
          />
        </FormControl>
        {/* <FormControl fullWidth>
            <label>{t('label.assetPriority', 'Priority', 'Text for Priority input label')}</label>
            <select
                defaultValue={data.assetPriority}
                onChange={evt => update({ ...data, assetPriority: parseInt(evt.target.value) as AssetPriority })}
            >
                <option value={AssetPriority.Low}>{t('label.priority.low', 'Low', 'Text for Low priority')}</option>
                <option value={AssetPriority.Medium}>{t('label.priority.medium', 'Medium', 'Text for Medium priority')}</option>
                <option value={AssetPriority.High}>{t('label.priority.high', 'High', 'Text for High priority')}</option>
            </select>
          </FormControl> */}
        <FormControl fullWidth>
          <Grid className='justify-between'>
            <span className='font-semibold'>{t('location.locations.label', 'Locations', 'Locations.')}</span>
            <Button type='button' onClick={() => addLocation()}>
              {t('general.addButton.label', 'Add', 'Add button.')}
            </Button>
          </Grid>
          {controller.locations &&
            controller.locations.map((location) => (
              <Grid key={location.locationId} className='justify-between'>
                <span>{location.name}</span>
                <Button type='button' onClick={() => removeLocation(location)}>
                  {t('general.removeButton.label', 'Remove', 'Remove button.')}
                </Button>
              </Grid>
            ))}
        </FormControl>
        <FormControl fullWidth>
          {/* <ImageUpload /> */}
          <Input
            label={t('user.avatar.label', 'Avatar', 'User avatar.')}
            accept='image/*'
            type='file'
            onChange={(evt) => {
              const file = evt.target.files?.[0];
              if (file) controller.setAvatar(file);
            }}
          />
          <img src={controller.getAvatar()} className={styles.image} />
        </FormControl>
      </Grid>
      <Grid className={styles['buttons-container']}>
        <Box className={styles['button-container']}>
          {!create && (
            <Button color='error' onClick={remove} size='lg' variant='outlined'>
              {t('general.removeButton.label', 'Remove', 'Remove button.')}
            </Button>
          )}
        </Box>
        <Stack direction='row' spacing={2}>
          <Button size='lg' type='submit' variant='solid'>
            {create
              ? t('general.addButton.label', 'Add', 'Add button.')
              : t('general.saveButton.label', 'Save', 'Save button.')}
          </Button>
          <Button onClick={close} size='lg' variant='outlined'>
            {t('general.closeButton.label', 'Close', 'Close button.')}
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
