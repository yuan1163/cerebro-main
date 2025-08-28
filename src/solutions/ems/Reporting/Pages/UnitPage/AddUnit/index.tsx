import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

// utils
import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useUnit } from '@solutions/ems/Reporting/storages/controllers/unit';

// types
import { AddUnitPropos } from '@solutions/ems/Reporting/data/unit';

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
import { ProcessSelect } from '../ProcessSelect';

// icons
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
};

const AddUnit: React.FC<Props> = ({ className, onClose, ...props }) => {
  const ui = useUI();
  const controller = useUnit({
    locationId: ui.currentFormation,
  });

  const [addProcessList, setAddProcessList] = React.useState([
    {
      id: 0,
    },
  ]);

  const [processMaxId, setProcessMaxId] = React.useState<number>(addProcessList.length);

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

  const {
    formState: { isDirty, errors },
    handleSubmit,
    getValues,
    setValue,
    control,
    clearErrors,
  } = useForm<AddUnitPropos, any, AddUnitPropos>({
    defaultValues,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const save: SubmitHandler<AddUnitPropos> = async (data) => {
    const processIdArr = addProcessList.map((p) => {
      return data.processId[p.id];
    });

    await controller.add(
      {
        locationId: ui.currentFormation,
        name: data.name,
      },
      processIdArr,
    );

    onClose?.();
  };

  const addProcess = () => {
    addProcessList.push({
      id: processMaxId,
    });

    const copyAddProcessList = [...addProcessList];

    setProcessMaxId(processMaxId + 1);
    setAddProcessList(copyAddProcessList);
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
        title='Add Unit'
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

                    {addProcessList.map((item, index) => (
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
                                severity={errors.processId && errors.processId[item.id]?.message ? 'error' : undefined}
                                helperText={
                                  errors.processId && errors.processId[item.id] && errors.processId[item.id]?.message
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
                    ))}
                    <Grid item>
                      <Button startIcon={<PlusLineIcon />} variant='link' size='sm' onClick={addProcess}>
                        Add Process
                      </Button>
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
                Cancel
              </Button>
            </Grid>
            <Grid item lg={6}>
              <Button fullWidth variant='solid' type='submit'>
                Add Unit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </>
  );
};

export default AddUnit;
