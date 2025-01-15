import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

// utils
import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useProcess } from '@solutions/ems/Reporting/storages/controllers/process';

// types
import { EditProcess, Process } from '@solutions/ems/Reporting/data/process';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// icons
import AlertCircleLineIcon from '@assets/icons/line/alert-circle.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
  process: Process;
};

export const ProcessEdit: React.FC<Props> = ({ className, onClose, process, ...props }) => {
  const navigate = useNavigate();
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

  type defaultValuesPropos = {
    name: string;
  };

  const defaultValues: defaultValuesPropos = {
    name: '',
  };

  const processCircuit: EditProcess = {
    name: process.name,
  };

  const {
    formState: { isDirty, errors },
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    watch,
  } = useForm<EditProcess>({
    defaultValues: processCircuit,
    resolver: yupResolver(validationSchema),
  });

  const save = async (data: Partial<Process>) => {
    await controller.update({ ...data, locationId: process.locationId, processId: process.processId });
    onClose?.();
  };

  const remove = async (item: Partial<Process>) => {
    await controller.remove(item);
    navigate('..');
  };

  // dialogs

  const [openDialog, setDialogOpen] = React.useState(false);

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
        title={t('ems.editProcess.label', 'Edit Process', 'Edit Process.')}
        disablePaddingBottom
      />
      <form id='profile-edit-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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

              {/* DELETE */}
              <Accordion
                disableSummaryGutters
                disableGutters
                title={t('ems.deleteProcess.label', 'Delete Process', 'Delete Process.')}
              >
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      {t(
                        'ems.deleteProcessCaption.label',
                        ' Careful! This will permanently delete the process. After this, circuit has link with it will be released.',
                        'Delete Process Caption.',
                      )}
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      {t('ems.deleteProcess.label', 'Delete Process', 'Delete Process.')}
                    </Button>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
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
                    // disabled={!isDirty}
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
          <ModalDelete
            content={`${t(
              'ems.deleteProcessExtraCapture.label',
              'Are you sure you want to remove process',
              'Are you sure you want to delete the process?',
            )} ${process.name}?`}
            open={openDialog}
            title={t('ems.deleteProcess.label', 'Delete Process', 'Delete Process.')}
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove(process);
              onClose?.();
            }}
          />
        </CardContent>
      </form>
    </>
  );
};
