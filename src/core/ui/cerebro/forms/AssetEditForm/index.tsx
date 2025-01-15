import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { Asset, AssetGroup, AssetPriority, Device } from '@core/api/types';

// storages

import { useAsset } from '@core/storages/controllers/assets';
import { useModals } from '@core/storages/modals';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../forms.module.scss';
import stylesSelect from '@core/ui/components/Select/styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { FormControl } from '@core/ui/components/FormControl';
import { Grid } from '@core/ui/components/Grid';
import { Input } from '@core/ui/components/Input';
import { InputLabel } from '@core/ui/components/InputLabel';
import { SelectDeviceForm } from '../SelectDeviceForm';
import { SelectGroupForm } from '../SelectGroupForm';
import { Stack } from '@core/ui/components/Stack';
import { Upload } from '@core/ui/cerebro/forms/Upload';

type Props = {
  asset: Partial<Asset>;
  create?: boolean;
};

export const AssetEditForm: React.FC<Props> = ({ create, asset }) => {
  const modals = useModals();
  const controller = useAsset(asset);

  const [data, update] = React.useState<Partial<Asset>>({
    ...asset,
    location: undefined,
  });

  const ui = useUI();
  const locations = useLocations();
  const activeFormation = locations.getElementById(ui.currentFormation);
  const spaces = locations.getSpaces(activeFormation);
  spaces.push(asset.location!);

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

  const addGroup = () => {
    const select = (group: AssetGroup) => {
      controller.addGroup(group);
      update({ ...data });
    };
    modals.open(<SelectGroupForm onSelect={select} skip={data.groups} />);
  };

  const removeGroup = (group: AssetGroup) => {
    controller.removeGroup(group);
    update({ ...data });
  };

  const addDevice = () => {
    const select = (device: Device) => {
      controller.addDevice(device);
      update({ ...data });
    };
    modals.open(<SelectDeviceForm onSelect={select} skip={data.devices} />);
  };

  const removeDevice = (device: Device) => {
    controller.removeDevice(device);
    update({ ...data });
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(save)}>
      <Box className={styles['title-container']}>
        <h2 className={styles['title']}>
          {t('asset.assetTitle.label', 'Asset', 'Collection of hardware tools and gadgets.')}
        </h2>
      </Box>
      <Grid direction='column' className={styles['inputs-container']}>
        {create && (
          <FormControl fullWidth>
            {/* <InputLabel htmlFor='location-select'>
              {t('label.location', 'Location', 'Text for Location input label')}
            </InputLabel> */}
            <select
              className={cn(stylesSelect['select'], stylesSelect['input-base'], stylesSelect['input-wrapper'])}
              defaultValue={data.locationId}
              id='location-select'
              onChange={(evt) =>
                update({
                  ...data,
                  locationId: parseInt(evt.target.value),
                })
              }
            >
              {spaces.map(
                (space) =>
                  space && (
                    <option key={space.locationId} value={space.locationId}>
                      {space.name}
                    </option>
                  ),
              )}
            </select>
          </FormControl>
        )}
        {/* We do not support move asset and move device to other location functionality yet.
                    see the comment in https://iveda.atlassian.net/browse/WEB-45?focusedCommentId=10138
                */}
        <FormControl fullWidth>
          <Input
            id='addAssetName'
            label={t('asset.name.label', 'Asset Name', 'Asset name.')}
            defaultValue={data.name}
            onChange={(evt) => update({ ...data, name: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='addAssetSerialNumber'
            label={t('asset.serialNumber.label', 'Serial number', 'Serial number of asset or device.')}
            defaultValue={data.serialNumber}
            onChange={(evt) => update({ ...data, serialNumber: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            id='addAssetUid'
            label={t('asset.uid.label', 'UID', 'Unique identifier.')}
            defaultValue={data.assetUid}
            onChange={(evt) => update({ ...data, assetUid: evt.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          {/* <InputLabel htmlFor='priority-select'>
            {t('label.assetPriority', 'Priority', 'Text for Priority input label')}
          </InputLabel> */}
          <select
            id='priority-select'
            defaultValue={data.assetPriority}
            className={cn(stylesSelect['select'], stylesSelect['input-base'], stylesSelect['input-wrapper'])}
            onChange={(evt) =>
              update({
                ...data,
                assetPriority: parseInt(evt.target.value) as AssetPriority,
              })
            }
          >
            <option value={AssetPriority.Low}>{t('events.lowEvent.label', 'Low', 'Low priority notification.')}</option>
            <option value={AssetPriority.Medium}>
              {t('events.mediumEvent.label', 'Medium', 'Medium priority notification.')}
            </option>
            <option value={AssetPriority.High}>
              {t('events.highEvent.label', 'High', 'High priority notification.')}
            </option>
          </select>
        </FormControl>
        <FormControl fullWidth>
          <Stack spacing={4}>
            <span className='font-semibold'>{t('asset.groups.label', 'Groups', 'Groups of assets.')}</span>
            <Grid className='justify-end'>
              <Button variant='outlined' size='lg' onClick={() => addGroup()}>
                {t('asset.addGroupButton.label', 'Add group', 'Add group button.')}
              </Button>
            </Grid>
            {data.groups &&
              data.groups.map((group) => (
                <Grid key={group.groupId} className='items-center justify-between'>
                  <span>{group.name}</span>
                  <Button variant='outlined' color='error' size='lg' onClick={() => removeGroup(group)}>
                    {t('asset.removeGroupButton.label', 'Remove group', 'Remove group button.')}
                  </Button>
                </Grid>
              ))}
          </Stack>
        </FormControl>
        <FormControl fullWidth>
          {/* <ImageUpload /> */}
          <Input
            label={t('asset.assetImage.label', 'Asset Image', 'Asset image.')}
            accept='image/*'
            type='file'
            onChange={(evt) => {
              const file = evt.target.files?.[0];
              if (file) controller.setImage(file);
            }}
          />
          <img src={controller.getImage()} className={styles.image} />
        </FormControl>
        <FormControl fullWidth>
          {/* Connection to device */}
          <Stack spacing={4}>
            <span className='font-semibold'>{`${t('asset.devices.label', 'Devices', 'Devices')}.`}</span>
            <Grid className='justify-end'>
              <Button variant='outlined' size='lg' onClick={() => addDevice()}>
                {t('asset.addDeviceButton.label', 'Add device', 'Add device button.')}
              </Button>
            </Grid>
            {data.devices &&
              data.devices.map((device) => (
                <Grid key={device.deviceId} className='items-center justify-between'>
                  <span>{device.name}</span>
                  <Button variant='outlined' color='error' size='lg' onClick={() => removeDevice(device)}>
                    {t('asset.removeDeviceButton.label', 'Remove device', 'Remove Device Button.')}
                  </Button>
                </Grid>
              ))}
          </Stack>
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
