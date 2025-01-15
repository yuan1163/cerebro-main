import React, { useState } from 'react';

// form

import { Controller, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// storages

import { useAsset } from '@core/storages/controllers/assets';
import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';

// types

import { Asset, AssetGroup, Device } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectAssetDevices } from '../SelectAssetDevices';
import { SelectAssetGroups } from '../SelectAssetGroups';
import { UploadImage } from '@solutions/cerebro/Users/UploadImage';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
};

export const AddAsset: React.FC<Props> = ({ className, onClose }) => {
  const ui = useUI();
  const [formData, setFormData] = useState<Partial<Asset>>({
    locationId: ui.currentFormation,
  });
  const controller = useAsset(formData);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // avatar

  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Assets);

  // FORM

  const validationSchema = yup.object().shape({
    name: yup.string().required(formFieldSettings.asset.group.required),
    description: yup.string().required(formFieldSettings.asset.group.description.required),
    manufacturer: yup.string().optional(),
    costRange: yup.string().optional(),
    serialNumber: yup.string().optional(),
    assetUid: yup.string().optional(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Asset>({
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  // CLASSES

  const [initialClassesState, setInitialClassesState] = useState(formData.groups || []);
  const [selectedClasses, setSelectedClasses] = useState(formData.groups || []);

  const handleAppendGroup = (group: AssetGroup) => {
    setSelectedClasses((prevClasses) => [...prevClasses, group]);
  };

  const handleRemoveGroup = (groupToRemove: AssetGroup) => {
    setSelectedClasses((prevClasses) => prevClasses.filter((group) => group.groupId !== groupToRemove.groupId));
  };

  // DEVICES

  const [initialDevicesState, setInitialDevicesState] = useState(formData.devices || []);
  const [selectedDevices, setSelectedDevices] = useState(formData.devices || []);

  const handleAppendDevices = (device: Device) => {
    setSelectedDevices((prevDevices) => [...prevDevices, device]);
  };

  const handleRemoveDevices = (deviceToRemove: Device) => {
    setSelectedDevices((prevDevices) => prevDevices.filter((device) => device.deviceId !== deviceToRemove.deviceId));
  };

  // ON SAVE

  const save = async (data: Asset) => {
    // CLASSES

    const classesToAdd = selectedClasses.filter(
      (cls) => !initialClassesState.some((initCls) => initCls.groupId === cls.groupId),
    );
    const classesToRemove = initialClassesState.filter(
      (initCls) => !selectedClasses.some((cls) => cls.groupId === initCls.groupId),
    );

    await Promise.all(
      classesToRemove.map(async (cls) => {
        await controller.removeGroup(cls);
      }),
    );

    await Promise.all(
      classesToAdd.map(async (cls) => {
        await controller.addGroup(cls);
      }),
    );

    setInitialClassesState([...selectedClasses]);

    // DEVICES

    const devicesToAdd = selectedDevices.filter(
      (dvs) => !initialDevicesState.some((initDvs) => initDvs.deviceId === dvs.deviceId),
    );
    const devicesToRemove = initialDevicesState.filter(
      (initDvs) => !selectedDevices.some((dvs) => dvs.deviceId === initDvs.deviceId),
    );

    await Promise.all(
      devicesToRemove.map(async (dvs) => {
        await controller.removeDevice(dvs);
      }),
    );

    await Promise.all(
      devicesToAdd.map(async (dvs) => {
        await controller.addDevice(dvs);
      }),
    );

    setInitialDevicesState([...selectedDevices]);

    await controller.add(formData);

    onClose?.();
  };

  // ON CANCEL

  const handleCancel = () => {
    setSelectedClasses([...initialClassesState]);
    setSelectedDevices([...initialDevicesState]);
    onClose?.();
  };

  return (
    <>
      <CardHeader
        action={
          <IconButton
            ariaLabel={t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
            size='lg'
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
        title={t('asset.addAssetTitle.label', 'Add asset', 'Add asset title.')}
        disablePaddingBottom
      />

      <form id='add-asset-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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
                    {/* IMAGE */}

                    <Grid item className='mb-2'>
                      <UploadImage
                        clearImage={() => controller.clearImage()}
                        getImage={() => controller.getImage()}
                        setImage={(file) => controller.setImage(file)}
                        stillLife
                        title={t('asset.assetImage.label', 'Asset Image', 'Asset image.')}
                      />
                    </Grid>

                    {/* NAME */}

                    <Grid item>
                      <Controller
                        name='name'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='name'
                            label={formFieldSettings.asset.name.label}
                            severity={errors.name?.message ? 'error' : undefined}
                            helperText={errors?.name?.message}
                            placeholder={formFieldSettings.asset.name.placeholder}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                name: newValue,
                              }));
                            }}
                            value={value}
                            disabled={!hasEditRights}
                            requiredLabel
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
                            label={formFieldSettings.asset.description.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                description: newValue,
                              }));
                            }}
                            placeholder={formFieldSettings.asset.description.placeholder}
                            requiredLabel
                            severity={errors.description?.message ? 'error' : undefined}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* MANUFACTURER */}

                    <Grid item>
                      <Controller
                        name='manufacturer'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='manufacturer'
                            disabled={!hasEditRights}
                            label={formFieldSettings.asset.manufacturer.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({ ...prevState, manufacturer: newValue }));
                            }}
                            placeholder={formFieldSettings.asset.manufacturer.placeholder}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* COST RANGE */}

                    <Grid item>
                      <Controller
                        name='costRange'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='costRange'
                            disabled={!hasEditRights}
                            label={formFieldSettings.asset.costRange.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({ ...prevState, costRange: newValue }));
                            }}
                            placeholder={formFieldSettings.asset.costRange.placeholder}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* UID */}

                    <Grid item>
                      <Controller
                        name='assetUid'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='assetUid'
                            disabled={!hasEditRights}
                            label={formFieldSettings.asset.trackerID.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({ ...prevState, assetUid: newValue }));
                            }}
                            placeholder={formFieldSettings.asset.trackerID.placeholder}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* SERIAL NUMBER */}

                    <Grid item>
                      <Controller
                        name='serialNumber'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='serialNumber'
                            disabled={!hasEditRights}
                            label={formFieldSettings.asset.serialNumber.label}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              onChange(newValue);
                              setFormData((prevState) => ({ ...prevState, serialNumber: newValue }));
                            }}
                            placeholder={formFieldSettings.asset.serialNumber.placeholder}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* CLASSES */}

                    <Grid item>
                      <Controller
                        control={control}
                        name='groups'
                        render={({ field }) => (
                          <SelectAssetGroups
                            {...field}
                            inputId='classes'
                            initial={initialClassesState}
                            label={formFieldSettings.asset.classes.label}
                            onAppend={handleAppendGroup}
                            onChange={setSelectedClasses}
                            onRemove={handleRemoveGroup}
                            placeholder={formFieldSettings.asset.classes.placeholder}
                          />
                        )}
                      />
                    </Grid>

                    {/* DEVICES */}

                    <Grid item>
                      <Controller
                        control={control}
                        name='devices'
                        render={({ field }) => (
                          <SelectAssetDevices
                            {...field}
                            inputId='devices'
                            initial={initialDevicesState}
                            label={formFieldSettings.asset.devices.label}
                            onAppend={handleAppendDevices}
                            onChange={setSelectedDevices}
                            onRemove={handleRemoveDevices}
                            placeholder={formFieldSettings.asset.devices.placeholder}
                          />
                        )}
                      />
                    </Grid>
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
                <Button color='secondary' fullWidth variant='outlined' onClick={handleCancel} type='button'>
                  {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button fullWidth variant='solid' type='submit'>
                  {t('asset.addAssetButton.label', 'Add asset', 'Add asset button.')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </form>
    </>
  );
};
