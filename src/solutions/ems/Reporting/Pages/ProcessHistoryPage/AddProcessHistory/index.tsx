import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// 直接引入 react-datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// utils

import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useProcess } from '@solutions/ems/Reporting/storages/controllers/process';
import { useProcessHistory } from '@solutions/ems/Reporting/storages/controllers/processHistory';

// types
import {
  AddProcessHistoryPropose,
  getDeviceCircuitById,
  ProcessHistory,
} from '@solutions/ems/Reporting/data/processHistory';
import { Unit } from '@solutions/ems/Reporting/data/unit';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircuitSelect } from '../CircuitSelect';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { DataSelect } from '@core/ui/components/DataSelect';
// import { Datepicker } from '@solutions/ems/Reporting/Components/Datepicker'; // 暫時不使用自定義的 Datepicker
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// icons
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

// 自定義日期選擇器樣式
const datePickerStyles = {
  container: {
    width: '100%',
    marginBottom: '8px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
  }
};

// 自定義 className 用於 DatePicker 樣式
const datePickerClassName = 'custom-datepicker';

// 添加全局樣式
const DatePickerStyle = () => (
  <style>
    {`
      .custom-datepicker {
        padding: 8px 12px;
        width: 100%;
        height: 38px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 14px;
      }
    `}
  </style>
);

type Props = {
  className?: string;
  onClose?: () => void;
  unit: Unit[] | undefined;
};

export const AddProcessHistory: React.FC<Props> = ({ className, onClose, unit, ...props }) => {
  const ui = useUI();
  const controller = useProcessHistory({
    locationId: ui.currentFormation,
  });

  const processController = useProcess({
    locationId: ui.currentFormation,
  });

  // Options
  const unitOption = unit?.map((u) => u.unitId);
  const [selectedUnit, setSelectedUnit] = useState<number>(0);
  const [processOption, setProcessOption] = useState<number[]>([0]);

  const process = processController.get({
    locationId: ui.currentFormation,
    unitId: selectedUnit,
  });

  // device circuit
  const deviceCircuit = getDeviceCircuitById(ui.currentFormation);

  useEffect(() => {
    if (process?.length) {
      setProcessOption(process.map((p) => p.processId));
      setValue('processId', process[0].processId);
    }
  }, [process]);

  // 設定初始日期為現在時間，避免欄位為null
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setHours(currentDate.getHours() + 24); // 預設結束日期為現在時間+24小時

  // yup
  const validationSchema = yup.object().shape({
    unitId: yup.number().min(1, t('ems.unitRequire.label', 'Unit must be require', 'Unit is mandatory.')),
    processId: yup.number().min(1, t('ems.processRequire.label', 'Process must be require', 'Process is mandatory.')),
    deviceId: yup.string().required(t('ems.deviceId.label', 'Device Id must be require', 'Device Id is mandatory.')),
    unitsNumber: yup
      .number()
      .min(1, t('ems.unitsNumberBetterThanZero.label', 'Units number must be better than 0', 'Unit number > 0.'))
      .transform((value) => (isNaN(value) ? undefined : Number(value)))
      .required(t('ems.enterAmount.label', 'You must enter amount', 'Amount required.')),
    startDate: yup
      .date()
      .required(t('general.enterStartDate.label', 'You must enter start date', 'Start date required.')),
    endDate: yup
      .date()
      .min(
        yup.ref('startDate'),
        t(
          'ems.startDateBetterEndDate.label',
          'Start date do not better than end date',
          'Start date must be before end date.',
        ),
      )
      .required(t('ems.mustEnterEndDate.label', 'You must enter end date', 'End date required.')),
  });

  const defaultValues = {
    unitId: 0,
    processId: 0,
    deviceId: '',
    unitsNumber: 1,
    startDate: currentDate, // 設定預設值為現在時間而非null
    endDate: endDate, // 設定預設值為當前時間+24小時而非null
  };

  const {
    formState: { isDirty, errors },
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    watch,
  } = useForm<AddProcessHistoryPropose>({
    defaultValues,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const save = async (data: AddProcessHistoryPropose) => {
    // create process and process history
    const deviceId = data.deviceId.split('_', 2)[0];
    const partIndex = data.deviceId.split('_', 2)[1];
    const processHistory: Partial<ProcessHistory> = {
      processId: data.processId,
      deviceId: deviceId,
      partIndex: partIndex,
      startDate: moment.utc(data.startDate).format('YYYY-MM-DDTHH:mm:ss'),
      endDate: moment.utc(data.endDate).format('YYYY-MM-DDTHH:mm:ss'),
      unitId: data.unitId,
      unitsNumber: data.unitsNumber,
      locationId: ui.currentFormation,
    };

    await controller.add(processHistory);
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
        title={t('ems.addHistory.label', 'Add History', 'Add History.')}
        disablePaddingBottom
      />
      <form id='process-add-form' className={styles['form']} onSubmit={handleSubmit(save)}>
        <Scrollbar>
          <CardContent className={styles['card-content']} fullHeight>
            <Grid direction='column'>
              <Accordion
                disableSummaryGutters
                disableGutters
                defaultOpen
                title={t('solutions.basicInformation.label', 'Basic information', 'Basic information header.')}
              >
                <Grid direction='column'>
                  <Grid container direction='column' spacing={2}>
                    {/* Unit Process */}
                    <Grid item container direction='column' key={`unitProcessList`}>
                      <Grid item container spacing={2} direction={'column'}>
                        {/* Unit */}
                        <Grid item grow>
                          <Controller
                            name={`unitId`}
                            control={control}
                            defaultValue={defaultValues.unitId}
                            render={({ field: { onChange, value } }) => (
                              <DataSelect
                                options={unitOption}
                                present={(value: number) => {
                                  if (!unit?.length) {
                                    return t('ems.noUnit.label', 'No Unit', 'Unit missing.');
                                  }
                                  const filter_unit = unit?.filter((u) => u.unitId === value);
                                  return filter_unit[0]?.name;
                                }}
                                label={t('ems.unit.label', 'Unit', 'Unit.')}
                                placeholder={t('ems.selectUnit.label', 'Select unit', 'Select a unit.')}
                                value={value}
                                onChange={(unitId) => {
                                  setSelectedUnit(unitId);
                                  onChange(unitId);
                                }}
                                severity={errors.unitId?.message ? 'error' : undefined}
                                helperText={errors.unitId && errors?.unitId?.message}
                              />
                            )}
                          />
                        </Grid>

                        {/* Process */}
                        <Grid item grow>
                          <Controller
                            name={`processId`}
                            control={control}
                            defaultValue={defaultValues.processId}
                            render={({ field: { onChange, value } }) => {
                              return (
                                <DataSelect
                                  options={processOption}
                                  present={(value: number) => {
                                    if (!process?.length) {
                                      return t('ems.noProcess.label', 'No Process', 'Process missing.');
                                    }
                                    const filter_process = process?.filter((p) => p.processId === value);
                                    return filter_process[0]?.name;
                                  }}
                                  label={t('ems.process.label', 'Process', 'Process.')}
                                  placeholder={t('ems.selectProcess.label', 'Select process', 'Select a process.')}
                                  value={value}
                                  onChange={onChange}
                                  severity={errors.processId?.message ? 'error' : undefined}
                                  helperText={errors.processId && errors?.processId?.message}
                                />
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {deviceCircuit.length ? (
                      <Grid item container direction='column' key={`circuitList`}>
                        <Grid item container spacing={2} direction={'column'}>
                          {/* Circuit */}
                          <Grid item grow>
                            <Controller
                              name={`deviceId`}
                              control={control}
                              defaultValue={defaultValues.deviceId}
                              render={({ field: { onChange, value } }) => (
                                <CircuitSelect
                                  label={t('ems.circuitLoop.label', 'Circuit loop', 'Circuit loop.')}
                                  placeholder={t('ems.selectCircuit.label', 'Select circuit', 'Select circuit.')}
                                  value={value}
                                  onSelect={(circuit) => {
                                    onChange(circuit);
                                  }}
                                  severity={errors.deviceId?.message ? 'error' : undefined}
                                  helperText={errors.deviceId && errors?.deviceId?.message}
                                />
                              )}
                            />
                          </Grid>

                          {/* Units Number */}
                          <Grid item grow>
                            <Controller
                              name={`unitsNumber`}
                              control={control}
                              defaultValue={defaultValues.unitsNumber}
                              render={({ field: { onChange, value } }) => (
                                <Input
                                  label={t('general.amount.label', 'Amount', 'Amount.')}
                                  inputId={`unitsNumber`}
                                  severity={errors.unitsNumber?.message ? 'error' : undefined}
                                  helperText={errors.unitsNumber && errors?.unitsNumber?.message}
                                  placeholder={t('general.enterAmount.label', 'Enter amount', 'Enter amount.')}
                                  onChange={onChange}
                                  value={value}
                                  requiredLabel
                                />
                              )}
                            />
                          </Grid>

                          {/* Start Date */}
                          <Grid item grow>
                            <div style={datePickerStyles.container}>
                              <label style={datePickerStyles.label}>
                                {t('general.startDate.label', 'Start date', 'Start date.')}
                              </label>
                              <Controller
                                name={`startDate`}
                                control={control}
                                defaultValue={defaultValues.startDate}
                                render={({ field }) => (
                                  <>
                                    <DatePicker
                                      selected={field.value}
                                      onChange={(date: Date) => {
                                        field.onChange(date);
                                        setValue('startDate', date, { shouldValidate: true });
                                      }}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={15}
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      placeholderText={t(
                                        'general.selectStartDate.label',
                                        'Select start date',
                                        'Select start date.',
                                      )}
                                      className={datePickerClassName}
                                    />
                                    {errors.startDate?.message && (
                                      <div style={datePickerStyles.error}>{errors.startDate.message}</div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Grid>

                          {/* End Date */}
                          <Grid item grow>
                            <div style={datePickerStyles.container}>
                              <label style={datePickerStyles.label}>
                                {t('general.endDate.label', 'End date', 'End date.')}
                              </label>
                              <Controller
                                name={`endDate`}
                                control={control}
                                defaultValue={defaultValues.endDate}
                                render={({ field }) => (
                                  <>
                                    <DatePicker
                                      selected={field.value}
                                      onChange={(date: Date) => {
                                        field.onChange(date);
                                        setValue('endDate', date, { shouldValidate: true });
                                      }}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={15}
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      placeholderText={t(
                                        'general.selectEndDate.label',
                                        'Select end date',
                                        'Select end date.',
                                      )}
                                      className={datePickerClassName}
                                    />
                                    {errors.endDate?.message && (
                                      <div style={datePickerStyles.error}>{errors.endDate.message}</div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <CircularProgress />
                    )}
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
                {t('ems.addHistory.label', 'Add History', 'Add History.')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      <DatePickerStyle />
    </>
  );
};
