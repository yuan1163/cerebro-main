import React from 'react';

// form

import { Controller, Resolver, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

// controllers

import { useUserGroup } from '@core/storages/controllers/userGroups';

// storages

import { useAuth } from '@core/storages/auth';
import { useUserGroups } from '@core/storages/controllers/userGroups';
import { useLocations } from '@core/storages/controllers/locations';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { User, UserGroup, UserPermissions } from '@core/api/types';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { InputLabel } from '@core/ui/components/InputLabel';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Swatch } from '@core/ui/components/Palette/Swatch';
import { Text } from '@core/ui/components/Text';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  onClose?: () => void;
  group: UserGroup;
};

export const GroupEdit: React.FC<Props> = ({ onClose, group }) => {
  const controller = useUserGroup(group);

  const [formData, setFormData] = React.useState<Partial<UserGroup>>(group);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const save = async () => {
    await controller.update(formData);
  };

  // dialog

  const [openDialog, setDialogOpen] = React.useState(false);

  // REMOVE
  const navigate = useNavigate();
  const locations = useLocations();
  const company = locations.getCompany();
  const groups = useUserGroups({
    locationId: company.locationId,
  });

  const remove = async (item: Partial<UserGroup>) => {
    await groups.remove(item);
    navigate('..');
    onClose?.();
  };

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  // FORM

  type GroupEdit = {
    name: string;
    description: string;
  };

  // yup

  const validationSchema = yup.object().shape({
    name: yup.string().required(formFieldSettings.asset.group.required),
    description: yup.string().required(formFieldSettings.asset.group.description.required),
  });

  const defaultValues = {
    name: formData.name,
    description: formData.description,
    style: formData.style,
  };

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<GroupEdit>({
    defaultValues: { ...formData },
    resolver: yupResolver(validationSchema),
  });

  const watchName = watch('name');
  const watchDescription = watch('description');
  const watchAllFields = watch();

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
        disablePaddingBottom
      />
      <form id='user-data' className={styles['form']} onSubmit={handleSubmit(save)}>
        <Scrollbar>
          <CardContent className={styles['card-content']}>
            <Grid direction='column'>
              <Accordion
                disableSummaryGutters
                disableGutters
                defaultOpen
                title={t('solutions.basicInformation.label', 'Basic information', 'Basic information header.')}
              >
                <Grid direction='column'>
                  <Grid container direction='column' spacing={2}>
                    {/* GROUP NAME */}

                    <Grid item>
                      <Controller
                        name='name'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='name'
                            severity={errors.name?.message ? 'error' : undefined}
                            helperText={errors?.name?.message}
                            label={formFieldSettings.asset.classes.name.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                name: newValue,
                              }));
                            }}
                            placeholder={formFieldSettings.asset.classes.name.placeholder}
                            requiredLabel
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* DESCRIPTION */}

                    <Grid item>
                      <Controller
                        name='description'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='description'
                            severity={errors.description?.message ? 'error' : undefined}
                            helperText={errors?.description?.message}
                            label={formFieldSettings.asset.devices.description.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                description: newValue,
                              }));
                            }}
                            placeholder={formFieldSettings.asset.devices.description.placeholder}
                            requiredLabel
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* COLORS */}

                    <Grid item>
                      <Grid direction='column'>
                        <InputLabel
                          label={t(
                            'general.color.label',
                            'Color',
                            'Specific hue assigned to categorize or visually distinguish labels or folders.',
                          )}
                        />
                        <Grid container alignItems='center' wrap='wrap'>
                          <Swatch value={formData.style} onChange={(style) => setFormData({ ...formData, style })} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Accordion>

              {/* DELETE */}

              <Accordion disableSummaryGutters disableGutters title='Delete group'>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      {t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button variant='delete' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      {/* <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'> */}
                      {t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
                    </Button>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <ModalDelete
            content={`This action will permanently delete the group.`}
            // content={`${t(
            //   'user.deleteGroupQuestion.label',
            //   'Are you sure you want to remove group?',
            //   'Confirmation prompt: Delete group?',
            // )} “${group.name}” ${t('company.fromCerebroApp.label', 'from Cerebro App?', 'Refers to the source app.')}`}
            open={openDialog}
            title={`Confirm to delete this group［ ${group.name} ］?`}
            // title={t('user.deleteGroup.label', 'Delete group', 'Delete user group button.')}
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove(group);
              onClose?.();
            }}
          />
          {hasEditRights && (
            <Grid container direction='column' spacing={3}>
              {/* {isDirty && (
                <Grid item>
                  <Grid alignItems='center' container spacing={2}>
                    <Grid item>
                      <Icon color='icon-tertiary' size='sm' variant='plain'>
                        <AlertCircleLineIcon />
                      </Icon>
                    </Grid>
                    <Grid item>
                      <Text color='typography-secondary' variant='sm' weight='medium'>
                        {t(
                          'general.youHaveUnsavedChanges.label',
                          'You have unsaved changes.',
                          'Label displayed to alert that there are edits made to the content.',
                        )}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              )} */}
              <Grid item>
                <Grid container spacing={2} fullWidth>
                  <Grid item lg={6}>
                    <Button color='secondary' fullWidth variant='outlined' onClick={onClose} type='button'>
                      {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                    </Button>
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      fullWidth
                      variant='solid'
                      type='submit'
                      onClick={() => {
                        save();
                        onClose?.();
                      }}
                      disabled={!watchName || !watchDescription}
                    >
                      {t(
                        'general.saveChanges.label',
                        'Save changes',
                        'Allows users to confirm any modifications they have made to content.',
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </form>
    </>
  );
};
