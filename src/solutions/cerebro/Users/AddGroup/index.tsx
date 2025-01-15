import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// form

import { Controller, Resolver, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// storages

import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { useUserGroup } from '@core/storages/controllers/userGroups';

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
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Swatch } from '@core/ui/components/Palette/Swatch';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  onClose?: () => void;
};

export const AddGroup: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const locations = useLocations();
  const controller = useUserGroup({
    locationId: locations.getCompany().locationId,
  });

  const [formData, setFormData] = useState<Partial<UserGroup>>({});

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submit = async () => {
    controller.add(formData);
    onClose?.();
  };

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Users);

  // FORM

  type GroupAdd = {
    name: string;
    description: string;
  };

  // yup

  const validationSchema = yup.object().shape({
    name: yup.string().required(formFieldSettings.user.group.required),
    description: yup.string().required(formFieldSettings.user.group.description.required),
  });

  const defaultValues = {
    name: '',
    description: '',
  };

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<GroupAdd>({
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

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
        disablePaddingBottom
      />
      <form id='add-user-group-form' className={styles['form']} onSubmit={handleSubmit(submit)}>
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
                            disabled={!hasEditRights}
                            helperText={errors?.name?.message}
                            label={formFieldSettings.user.group.name.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                name: newValue,
                              }));
                            }}
                            placeholder={formFieldSettings.user.group.name.placeholder}
                            requiredLabel
                            severity={errors.name?.message ? 'error' : undefined}
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
                            disabled={!hasEditRights}
                            helperText={errors?.description?.message}
                            label={formFieldSettings.user.group.description.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                description: newValue,
                              }));
                            }}
                            placeholder={formFieldSettings.user.group.description.placeholder}
                            requiredLabel
                            severity={errors.description?.message ? 'error' : undefined}
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
                          <Swatch onChange={(value) => setFormData({ ...formData, style: value })} />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid item>
                              <FormControl fullWidth>
                                <Input
                                  fullWidth
                                  id='locations'
                                  label={t('label.locations', 'Locations*', 'Text for input label')}
                                  name='locations'
                                  onChange={onChange}
                                  placeholder='Select locations'
                                  value={locations}
                                  required
                                />
                              </FormControl>
                            </Grid> */}
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        {hasEditRights && (
          <CardContent className={styles['card-footer']}>
            <Grid container spacing={2} fullWidth>
              <Grid item lg={6}>
                <Button color='secondary' fullWidth variant='outlined' onClick={onClose} type='button'>
                  {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button fullWidth variant='solid' type='submit'>
                  {t('user.addGroupButton.label', 'Add group', 'Add Group Button.')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </form>
    </>
  );
};
