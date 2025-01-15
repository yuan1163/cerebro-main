import React, { useState } from 'react';

// form

import { Controller, Resolver, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';

// storages

import { useAssetGroup } from '@core/storages/controllers/assetGroups';
import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { AssetGroup } from '@core/api/types';

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
  className?: string;
  onClose?: () => void;
};

export const AddGroup: React.FC<Props> = ({ className, onClose }) => {
  const ui = useUI();
  const [formData, setFormData] = useState<Partial<AssetGroup>>({
    locationId: ui.currentFormation,
  });
  const controller = useAssetGroup(formData);

  const submit = () => {
    controller.add(formData);
    onClose?.();
  };

  // yup

  const validationSchema = yup.object().shape({
    name: yup.string().required(formFieldSettings.asset.group.required),
    description: yup.string().required(formFieldSettings.asset.group.description.required),
  });

  // FORM

  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    setFocus,
    control,
  } = useForm<AssetGroup>({
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
        title={t('asset.addClassButton.label', 'Add class', 'Add class button.')}
        disablePaddingBottom
      />

      <form id='add-class-form' className={styles['form']} onSubmit={handleSubmit(submit)}>
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
                                />
                              </FormControl>
                            </Grid> */}
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>

        <CardContent className={styles['card-footer']}>
          <Grid container spacing={2} fullWidth>
            <Grid item lg={6}>
              <Button color='secondary' fullWidth variant='outlined' onClick={onClose} type='button'>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
            </Grid>
            <Grid item lg={6}>
              <Button fullWidth variant='solid' type='submit'>
                {t('asset.addClassButton.label', 'Add class', 'Add class button.')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </>
  );
};
