import React from 'react';
import { useForm } from 'react-hook-form';
import { ChangeHandler } from 'react-hook-form';

// types

import { AssetGroup } from '@core/api/types';

// storages

import { useAssetGroup } from '@core/storages/controllers/assetGroups';
import { useModals } from '@core/storages/modals';

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

type Props = {
  create?: boolean;
  group: Partial<AssetGroup>;
};

export const AssetGroupEditForm: React.FC<Props> = ({ create, group }) => {
  const modals = useModals();

  const controller = useAssetGroup(group);

  const { register, handleSubmit } = useForm<Partial<AssetGroup>>({
    defaultValues: group,
  });

  const save = async (data: Partial<AssetGroup>) => {
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

  return (
    <form className={styles['form']} onSubmit={handleSubmit(save)}>
      <Box className={styles['title-container']}>
        <h2 className={styles['title']}>{t('asset.group.label', 'Group', 'Group of assets.')}</h2>
      </Box>
      <FormControl fullWidth>
        <Input
          inputId='addAssetGroupName'
          {...(register('name') as unknown as ChangeHandler)}
          label={t('asset.groupName.label', 'Name', 'Group name for assets.')}
        />
      </FormControl>
      <Grid className={styles['buttons-container']}>
        <Box className={styles['button-container']}>
          {!create && (
            <Button color='error' onClick={remove} size='lg' variant='outlined'>
              {t('general.removeButton.label', 'Remove', 'Remove button.')}
            </Button>
          )}
        </Box>
        <Stack direction='row'>
          <Button size='lg' type='submit' variant='solid'>
            {create
              ? t('general.addButton.label', 'Add', 'Add button.')
              : t('general.saveButton.label', 'Save', 'Save button.')}
          </Button>
          <Button onClick={close} size='lg' variant='solid'>
            {t('general.closeButton.label', 'Close', 'Close button.')}
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
