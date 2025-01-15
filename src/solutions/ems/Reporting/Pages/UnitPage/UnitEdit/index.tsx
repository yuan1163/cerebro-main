import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

// utils

import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useUnit } from '@solutions/ems/Reporting/storages/controllers/unit';

// types
import { EditUnitPropos, Unit, UnitProcess } from '@solutions/ems/Reporting/data/unit';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
import { ProcessSelect } from '../ProcessSelect';

// icons
import AlertCircleLineIcon from '@assets/icons/line/alert-circle.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
  unit: Unit;
};

declare module 'yup' {
  interface ArraySchema<TIn extends any[] | null | undefined, TContext> {
    processId_unique(message?: string): this;
  }
}

const UnitEdit: React.FC<Props> = ({ className, onClose, unit, ...props }) => {
  const navigate = useNavigate();
  const ui = useUI();
  const controller = useUnit({
    locationId: ui.currentFormation,
  });

  const queryProcess: Partial<UnitProcess> = {
    locationId: unit.locationId,
    unitId: unit.unitId,
  };

  const process = controller.getProcess(queryProcess);

  const [addProcessList, setAddProcessList] = React.useState([{ id: 0 }]);
  const [processMaxId, setProcessMaxId] = React.useState<number>(0);

  React.useEffect(() => {
    const newAddProcessList = process?.map((p, index) => {
      return { id: index };
    });

    if (newAddProcessList?.length) {
      setAddProcessList(newAddProcessList);
    }

    if (process) {
      setProcessMaxId(process.length);
      setValue(
        'processId',
        process.map((p) => p.processId),
      );
    }
  }, [process]);

  // yup
  const getSkipIndex = () => {
    const skipIndex = getValues('processId').map((v, index) => {
      if (!addProcessList.map((p) => p.id).includes(index)) {
        return index;
      }
    });

    return skipIndex;
  };

  yup.addMethod(yup.number, 'processId_unique', function (message) {
    return this.test('processId_unique', message, function (processId) {
      const currentIndex = this.options.index;
      const skipIndex = getSkipIndex();
      if (skipIndex.includes(currentIndex)) return true;

      const processIdArr = addProcessList.map((p) => {
        return getValues('processId')[p.id];
      });
      const duplicate = processIdArr.filter((p) => p === processId && p !== 0);
      return duplicate.length < 2;
    });
  });

  yup.addMethod(yup.number, 'processId_require', function (message) {
    return this.test('processId_require', message, function (processId) {
      const currentIndex = this.options.index;
      const skipIndex = getSkipIndex();
      if (skipIndex.includes(currentIndex)) return true;

      if (processId) return processId >= 1;
    });
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required('You must enter product name.'),
    processId: yup
      .array()
      .of(yup.number().processId_unique('Process must be unique').processId_require('Process is required')),
  });

  const defaultValues = {
    name: '',
    processId: [0],
  };

  const unitProcess = {
    name: unit.name,
    processId: process ? process.map((p) => p.processId) : [],
  };

  const {
    formState: { isDirty, errors },
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    watch,
    clearErrors,
  } = useForm<EditUnitPropos>({
    defaultValues: unitProcess,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const save = async (data: EditUnitPropos) => {
    const processIdArr = addProcessList.map((p) => {
      return data.processId[p.id];
    });

    await controller.update(
      {
        locationId: ui.currentFormation,
        unitId: unit.unitId,
        name: data.name,
      },
      {
        old: unitProcess.processId,
        new: processIdArr,
      },
    );

    onClose?.();
  };

  const remove = async (item: Partial<Unit>) => {
    await controller.remove(item, process);
    navigate('..');
  };

  const addProcess = () => {
    if (addProcessList && processMaxId !== undefined) {
      addProcessList.push({
        id: processMaxId,
      });

      const copyAddProcessList = [...addProcessList];

      setProcessMaxId(processMaxId + 1);
      setAddProcessList(copyAddProcessList);
    }
  };

  const removeProcess = (index: number) => {
    if (addProcessList && processMaxId !== undefined) {
      addProcessList.splice(index, 1);
      const newAddProcessList = [...addProcessList];
      setAddProcessList(newAddProcessList);

      const newProcessId = getValues('processId');

      newAddProcessList.map((l) => {
        setValue(`processId.${l.id}`, newProcessId[l.id]);
      });

      newProcessId.map((p, index) => {
        if (!(index in newAddProcessList)) {
          clearErrors(`processId.${index}`);
        }
      });
    }
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
        title='Edit Unit'
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
                {!process ? (
                  <Grid alignItems='center' justifyContent='center' fullHeight>
                    <CircularProgress />
                  </Grid>
                ) : (
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
                              inputId='unit_name'
                              severity={errors.name?.message ? 'error' : undefined}
                              helperText={errors.name && errors?.name?.message}
                              label={t('general.name.label', 'Name', 'Name.')}
                              placeholder='Enter unit name'
                              onChange={onChange}
                              value={value}
                              requiredLabel
                            />
                          )}
                        />
                      </Grid>

                      {addProcessList.map((item, index) => {
                        return (
                          <Grid item container direction='column' key={`processList.${item.id}`}>
                            {index > 0 && (
                              <Grid item fullWidth justifyContent='end'>
                                <IconButton variant='outlined' size='xs' onClick={() => removeProcess(index)}>
                                  <MinusLineIcon />
                                </IconButton>
                              </Grid>
                            )}

                            {/* Process */}
                            <Grid item grow>
                              <Controller
                                name={`processId.${item.id}`}
                                control={control}
                                defaultValue={defaultValues.processId[0]}
                                render={({ field: { onChange, value } }) => (
                                  <ProcessSelect
                                    inputId={`processId.${item.id}`}
                                    label='Process'
                                    placeholder='Select process'
                                    severity={
                                      errors.processId && errors.processId[item.id]?.message ? 'error' : undefined
                                    }
                                    helperText={
                                      errors.processId &&
                                      errors.processId[item.id] &&
                                      errors.processId[item.id]?.message
                                    }
                                    value={value}
                                    onSelect={(process) => {
                                      onChange(process);
                                    }}
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}

                      <Grid item>
                        <Button startIcon={<PlusLineIcon />} variant='link' size='sm' onClick={addProcess}>
                          Add Process
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Accordion>

              {/* DELETE */}
              <Accordion disableSummaryGutters disableGutters title='Delete Unit'>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      Careful! This will permanently delete the unit. After this, process has link with it will be
                      released.
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      Delete unit
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
                      You have unsaved changes.
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            )} */}
            <Grid item>
              <Grid container spacing={2} fullWidth>
                <Grid item lg={6}>
                  <Button color='secondary' fullWidth variant='outlined' onClick={onClose} type='button'>
                    Cancel
                  </Button>
                </Grid>
                <Grid item lg={6}>
                  <Button
                    fullWidth
                    variant='solid'
                    type='submit'
                    // disabled={!isDirty}
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ModalDelete
            content={`Are you sure you want to remove unit ${unit.name}?`}
            open={openDialog}
            title='Delete unit'
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove(unit);
              onClose?.();
            }}
          />
        </CardContent>
      </form>
    </>
  );
};

export default UnitEdit;
