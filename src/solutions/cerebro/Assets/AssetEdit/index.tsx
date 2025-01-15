import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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
import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useModals } from '@core/storages/modals';
import { useUI } from '@core/storages/ui';

// types

import { Asset, AssetGroup, AssetPriority, Device } from '@core/api/types';
import { User, UserPermissions } from '@core/api/types';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectAssetDevices } from '../SelectAssetDevices';
import { SelectAssetGroups } from '../SelectAssetGroups';
import { Text } from '@core/ui/components/Text';
import { UploadImage } from '@solutions/cerebro/Users/UploadImage';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  asset: Partial<Asset>;
  className?: string;
  onClose?: () => void;
};

export const AssetEdit: React.FC<Props> = ({ className, onClose, asset }) => {
  const controller = useAsset(asset);

  const [data, update] = React.useState<Partial<Asset>>({
    ...asset,
    location: undefined,
    files: undefined,
  });

  // const ui = useUI();
  // const locations = useLocations();
  // const spaces = locations.getSpaces(ui.activeFormation);
  // spaces.push(asset.location!);

  // modal

  const [openDialog, setDialogOpen] = React.useState(false);

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights = profile?.permissions?.includes(UserPermissions.Assets);

  // yup

  const validationSchema = yup.object().shape({
    name: yup.string().required(formFieldSettings.asset.group.required),
    description: yup.string().required(formFieldSettings.asset.group.description.required),
    manufacturer: yup.string().optional(),
    costRange: yup.string().optional(),
    serialNumber: yup.string().optional(),
    assetUid: yup.string().optional(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Asset>({
    defaultValues: { ...data },
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  // CLASSES

  const [initialClassesState, setInitialClassesState] = useState(data.groups || []);
  const [selectedClasses, setSelectedClasses] = useState(data.groups || []);

  const handleAppendGroup = (group: AssetGroup) => {
    setSelectedClasses((prevClasses) => [...prevClasses, group]);
  };

  const handleRemoveGroup = (groupToRemove: AssetGroup) => {
    setSelectedClasses((prevClasses) => prevClasses.filter((group) => group.groupId !== groupToRemove.groupId));
  };

  // DEVICES

  const [initialDevicesState, setInitialDevicesState] = useState(data.devices || []);
  const [selectedDevices, setSelectedDevices] = useState(data.devices || []);

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

    await controller.update({ ...data });
    onClose?.();
  };

  const navigate = useNavigate();

  const remove = async () => {
    await controller.remove();
    navigate('../asset');
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
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            size='lg'
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
        title={t('asset.editAsset.label', 'Edit asset', 'Adjusting asset configuration.')}
        disablePaddingBottom
      />
      <form id='asset-edit-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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
                            disabled={!hasEditRights}
                            helperText={errors?.name?.message}
                            label={formFieldSettings.asset.name.label}
                            onChange={onChange}
                            placeholder={formFieldSettings.asset.name.placeholder}
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
                            label={formFieldSettings.asset.description.label}
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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

              {/* DELETE */}

              <Accordion
                disableSummaryGutters
                disableGutters
                title={t('asset.deleteAsset.label', 'Delete asset', 'Delete asset.')}
              >
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      {t(
                        'asset.deleteAssetCaption.label',
                        'Careful! This will permanently delete the asset and all collected data. After this, paired device will be automatically unpaired.',
                        'Delete asset caption.',
                      )}
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      {t('asset.deleteAsset.label', 'Delete asset', 'Delete asset.')}
                    </Button>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          {/* <Button
            onClick={() =>
              modals.open(
                <AssetEditForm
                  create
                  asset={{ locationId: ui.activeFormation?.locationId, location: ui.activeFormation }}
                />,
              )
            }
          >
            Click
          </Button> */}
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
                    <Button color='secondary' fullWidth variant='outlined' onClick={handleCancel} type='button'>
                      {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                    </Button>
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      fullWidth
                      variant='solid'
                      type='submit'
                      // disabled={!isDirty}
                      // onClick={() => {
                      //   save();
                      //   onClose?.();
                      // }}
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
          <ModalDelete
            content={`${t(
              'asset.removeAssetProcess.label',
              'Are you sure you want to remove asset',
              'Description of asset removal process.',
            )} “${data.name}” ${t('company.fromCerebroApp.label', 'from Cerebro App?', 'Refers to the source app.')}`}
            open={openDialog}
            title={t('asset.deleteAsset.label', 'Delete asset', 'Delete asset.')}
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove();
              onClose?.();
            }}
          />
        </CardContent>
      </form>
    </>
  );
};
