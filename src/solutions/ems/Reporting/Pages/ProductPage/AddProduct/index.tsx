import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// storages
import { useUI } from '@core/storages/ui';
import { useProduct } from '@solutions/ems/Reporting/storages/controllers/product';

// types
import { Asset } from '@core/api/types';
import { AddProductPropos } from '@solutions/ems/Reporting/data/product';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
import { UnitSelect } from '../UnitSelect';

// icons
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
};

export const AddProduct: React.FC<Props> = ({ className, onClose }) => {
  const ui = useUI();
  const controller = useProduct({
    locationId: ui.currentFormation,
  });

  const [formData, setFormData] = React.useState<Partial<Asset>>({
    locationId: ui.currentFormation,
  });

  const [addUnitList, setAddUnitList] = React.useState([
    {
      id: 0,
    },
  ]);
  const [unitMaxId, setUnitMaxId] = React.useState<number>(addUnitList.length);

  // yup
  const getSkipIndex = () => {
    const skipIndex = getValues('unitId').map((v, index) => {
      if (!addUnitList.map((u) => u.id).includes(index)) {
        return index;
      }
    });

    return skipIndex;
  };

  yup.addMethod(yup.number, 'unitId_unique', function (message) {
    return this.test('unitId_unique', message, function (unitId) {
      const currentIndex = this.options.index;
      const skipIndex = getSkipIndex();
      if (skipIndex.includes(currentIndex)) return true;

      const unitIdArr = addUnitList.map((u) => {
        return getValues('unitId')[u.id];
      });
      const duplicate = unitIdArr.filter((u) => u === unitId && u !== 0);
      return duplicate.length < 2;
    });
  });

  yup.addMethod(yup.number, 'unitId_require', function (message) {
    return this.test('unitId_require', message, function (unitId) {
      const currentIndex = this.options.index;
      const skipIndex = getSkipIndex();
      if (skipIndex.includes(currentIndex)) return true;

      if (unitId) return unitId >= 1;
    });
  });

  yup.addMethod(yup.number, 'unitsNumber_require', function (message) {
    return this.test('unitsNumber_require', message, function (unitsNumber) {
      const currentIndex = this.options.index;
      const skipIndex = getSkipIndex();
      if (skipIndex.includes(currentIndex)) return true;

      if (unitsNumber) return unitsNumber >= 1;
    });
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required('You must enter product name.'),
    unitId: yup.array().of(yup.number().unitId_unique('Unit must be unique').unitId_require('Unit is required')),
    unitsNumber: yup.array().of(
      yup
        .number()
        .unitsNumber_require('Units number must be better than 0')
        .transform((value) => (isNaN(value) ? undefined : Number(value)))
        .required('You must enter amount'),
    ),
  });

  type AddProductFormValues = {
    name: string;
    unitId: number[];
    unitsNumber: number[];
  };

  const defaultValues: AddProductFormValues = {
    name: '',
    unitId: [0],
    unitsNumber: [1],
  };

  const {
    formState: { isDirty, errors },
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
  } = useForm<AddProductFormValues, any, AddProductFormValues>({
    defaultValues,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const save: SubmitHandler<AddProductFormValues> = async (data) => {
    const unitData: { unitId: number; unitsNumber: number }[] | any[] = [];

    addUnitList.map((u) => {
      unitData.push({ unitId: data.unitId[u.id], unitsNumber: data.unitsNumber[u.id] });
    });

    await controller.add(
      {
        locationId: ui.currentFormation,
        name: data.name,
      },
      unitData,
    );

    onClose?.();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // product image

  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const addUnit = () => {
    addUnitList.push({
      id: unitMaxId,
    });

    const copyAddUnitList = [...addUnitList];

    setUnitMaxId(unitMaxId + 1);
    setAddUnitList(copyAddUnitList);
  };

  const removeProductUnit = (index: number) => {
    if (addUnitList && unitMaxId !== undefined) {
      addUnitList.splice(index, 1);
      const newAddUnitList = [...addUnitList];
      setAddUnitList(newAddUnitList);

      const newUnitId = getValues('unitId');
      const newUnitsNumber = getValues('unitsNumber');

      newAddUnitList.map((l) => {
        setValue(`unitId.${l.id}`, newUnitId[l.id]);
        setValue(`unitsNumber.${l.id}`, newUnitsNumber[l.id]);
      });

      newUnitId.map((p, index) => {
        if (!(index in newAddUnitList)) {
          clearErrors(`unitId.${index}`);
        }
      });

      newUnitsNumber.map((p, index) => {
        if (!(index in newAddUnitList)) {
          clearErrors(`unitsNumber.${index}`);
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
        title='Add Product'
        disablePaddingBottom
      />

      <form id='add-product-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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
                    <Grid item>
                      <Grid alignItems='center' justifyContent='between' fullWidth>
                        <Grid direction='column' container spacing={3}>
                          <Grid item direction='column'>
                            <Text variant='sm' weight='medium'>
                              Product photo
                            </Text>
                            <Text color='typography-secondary' variant='sm'>
                              Recommended 500x500px
                            </Text>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item>
                                <Button onClick={() => imageInputRef.current?.click()} size='sm' variant='outlined'>
                                  Change
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button onClick={() => controller.clearImage()} size='sm' variant='outlined'>
                                  Delete
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <input
                          accept='image/*'
                          hidden
                          onChange={(evt) => {
                            if (evt.target.files?.length) controller.setImage(evt.target.files[0]);
                          }}
                          ref={imageInputRef}
                          type='file'
                        />
                        <Avatar className={styles['avatar']} size='4xl' src={controller.getImage()} stillLife />
                      </Grid>
                    </Grid>

                    {/* NAME */}
                    <Grid item>
                      <Controller
                        name={'name'}
                        control={control}
                        render={(props) => (
                          <Input
                            inputId='product.name'
                            label={t('general.name.label', 'Name', 'Name.')}
                            severity={errors.name?.message ? 'error' : undefined}
                            helperText={errors.name && errors?.name?.message}
                            name={props.field.name}
                            placeholder='Enter product name'
                            onChange={(value): void => {
                              props.field.onChange(value);
                              changeHandler(value);
                            }}
                            value={formData.name}
                            requiredLabel
                          />
                        )}
                      />
                    </Grid>

                    {addUnitList.map((item, index) => (
                      <Grid item container direction='column' key={`unitList.${item.id}`}>
                        {index > 0 && (
                          <Grid item fullWidth justifyContent='end'>
                            <IconButton variant='outlined' size='xs' onClick={() => removeProductUnit(index)}>
                              <MinusLineIcon />
                            </IconButton>
                          </Grid>
                        )}
                        <Grid item container spacing={2}>
                          {/* Unit */}
                          <Grid item grow>
                            <Controller
                              name={`unitId.${item.id}`}
                              defaultValue={defaultValues.unitId[0]}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <UnitSelect
                                  inputId={`unitId.${item.id}`}
                                  label='Unit'
                                  placeholder='Select unit'
                                  severity={errors.unitId && errors.unitId[item.id]?.message ? 'error' : undefined}
                                  helperText={
                                    errors.unitId && errors.unitId[item.id] && errors.unitId[item.id]?.message
                                  }
                                  value={value}
                                  onSelect={(unit) => {
                                    onChange(unit);
                                  }}
                                />
                              )}
                            />
                          </Grid>

                          {/* Units Number */}
                          <Grid item className={styles['unit-amount']}>
                            <Controller
                              name={`unitsNumber.${item.id}`}
                              control={control}
                              defaultValue={defaultValues.unitsNumber[0]}
                              render={({ field: { onChange, value } }) => (
                                <Input
                                  inputId={`unitsNumber.${item.id}`}
                                  severity={
                                    errors.unitsNumber && errors.unitsNumber[item.id]?.message ? 'error' : undefined
                                  }
                                  helperText={
                                    errors.unitsNumber &&
                                    errors.unitsNumber[item.id] &&
                                    errors.unitsNumber[item.id]?.message
                                  }
                                  label={t(`label.unitsNumber.${item.id}`, 'Amount', 'Text for input label')}
                                  placeholder='Enter amount'
                                  onChange={(event) => onChange(event.target.value)}
                                  value={value}
                                  requiredLabel
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item>
                      <Button startIcon={<PlusLineIcon />} variant='link' size='sm' onClick={addUnit}>
                        Add Unit
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
                Add Product
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </>
  );
};
