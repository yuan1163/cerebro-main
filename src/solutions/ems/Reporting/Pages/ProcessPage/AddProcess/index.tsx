import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

// utils
import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useProcess } from '@solutions/ems/Reporting/storages/controllers/process';

// types
import { AddProcessPropose } from '@solutions/ems/Reporting/data/process';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
};

export const AddProcess: React.FC<Props> = ({ className, onClose, ...props }) => {
  const ui = useUI();
  const controller = useProcess({
    locationId: ui.currentFormation,
  });

  // yup
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('ems.enterProcessName.label', 'You must enter process name.', 'Process name required.')),
  });

  const defaultValues = {
    name: '',
  };

  const {
    formState: { isDirty, errors },
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    watch,
  } = useForm<AddProcessPropose>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const save = async (data: AddProcessPropose) => {
    // create process
    await controller.add({
      locationId: ui.currentFormation,
      name: data.name,
    });

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
        title={t('ems.addProcess.label', 'Add Process', 'Add Process.')}
        disablePaddingBottom
      />
      <form id='process-add-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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
                    {/* NAME */}
                    <Grid item>
                      <Controller
                        name={'name'}
                        control={control}
                        defaultValue={defaultValues.name}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='process_name'
                            severity={errors.name?.message ? 'error' : undefined}
                            helperText={errors.name && errors?.name?.message}
                            label={t('general.name.label', 'Name', 'Name.')}
                            placeholder={t('ems.enterProcessName.label', 'Enter process name', 'Enter process name.')}
                            onChange={onChange}
                            value={value}
                            requiredLabel
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
        <CardContent className={styles['card-footer']}>
          <Grid container spacing={2} fullWidth>
            <Grid item lg={6}>
              <Button color='secondary' fullWidth variant='outlined' onClick={onClose} type='button'>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
            </Grid>
            <Grid item lg={6}>
              <Button fullWidth variant='solid' type='submit'>
                {t('ems.addProcess.label', 'Add Process', 'Add Process.')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </>
  );
};
