import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

// utils

import { t } from '@core/utils/translate';

// storages
import { useUI } from '@core/storages/ui';
import { useProduct } from '@solutions/ems/Reporting/storages/controllers/product';

// types
import { EditProductPropos, Product, ProductUnit } from '@solutions/ems/Reporting/data/product';
import { Unit } from '@solutions/ems/Reporting/data/unit';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Avatar } from '@core/ui/components/Avatar';
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
import { UnitSelect } from '../UnitSelect';

// icons
import AlertCircleLineIcon from '@assets/icons/line/alert-circle.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  onClose?: () => void;
  product: Product;
};

declare module 'yup' {
  interface NumberSchema {
    unitId_unique(message?: string): this;
  }
}

export const ProductEdit: React.FC<Props> = ({ className, onClose, product, ...props }) => {
  const navigate = useNavigate();
  const ui = useUI();
  const controller = useProduct({
    productId: product.productId,
    locationId: ui.currentFormation,
  });

  const queryUnit: Partial<ProductUnit> = {
    locationId: product.locationId,
    productId: product.productId,
  };

  const unit = controller.getUnit(queryUnit);
  const [addUnitList, setAddUnitList] = React.useState([{ id: 0 }]);
  const [unitMaxId, setUnitMaxId] = React.useState<number>(0);

  React.useEffect(() => {
    const newAddUnitList = unit?.map((u, index) => {
      return { id: index };
    });

    if (newAddUnitList?.length) {
      setAddUnitList(newAddUnitList);
    }

    if (unit) {
      setUnitMaxId(unit.length);
      setValue(
        'unitId',
        unit.map((u) => u.unitId),
      );
      setValue(
        'unitsNumber',
        unit.map((u) => u.unitsNumber),
      );
    }
  }, [unit]);

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

  type EditProductFormValues = {
    name: string;
    unitId: number[];
    unitsNumber: number[];
  };

  const defaultValues: EditProductFormValues = {
    name: '',
    unitId: [0],
    unitsNumber: [1],
  };

  const productUnit: EditProductFormValues = {
    name: product.name,
    unitId: unit ? unit.map((u) => u.unitId) : [],
    unitsNumber: unit ? unit.map((u) => u.unitsNumber) : [],
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
  } = useForm<EditProductFormValues, any, EditProductFormValues>({
    defaultValues: productUnit,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const save: SubmitHandler<EditProductFormValues> = async (data) => {
    const unitData: { unitId: number; unitsNumber: number }[] | any[] = [];
    const oldUnitData: { unitId: number; unitsNumber: number }[] | any[] = [];

    addUnitList.map((u) => {
      unitData.push({ unitId: data.unitId[u.id], unitsNumber: data.unitsNumber[u.id] });
    });

    productUnit.unitId.map((unitId, index) => {
      oldUnitData.push({ unitId: unitId, unitsNumber: productUnit.unitsNumber[index] });
    });

    await controller.update(
      {
        locationId: ui.currentFormation,
        productId: product.productId,
        name: data.name,
      },
      {
        old: oldUnitData,
        new: unitData,
      },
    );

    onClose?.();
  };

  const remove = async (item: Partial<Product>) => {
    await controller.remove(item);
    navigate('..');
  };

  // dialogs
  const [openDialog, setDialogOpen] = React.useState(false);

  // product image

  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // // user role

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
        title='Edit Product'
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
                {!unit ? (
                  <Grid alignItems='center' justifyContent='center' fullHeight>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <Grid direction='column'>
                    <Grid container direction='column' spacing={2}>
                      {/* IMAGE */}

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
                          {/* <Button onClick={() => imageInputRef.current?.click()} variant='outlined'>
                            Upload
                          </Button> */}
                          <Avatar
                            className={styles['avatar']}
                            size='4xl'
                            // src={user?.avatar ?? ''}
                            src={controller.getImage(product.productId)}
                            stillLife
                          />
                        </Grid>
                      </Grid>

                      {/* NAME */}
                      <Grid item>
                        <Controller
                          name={'name'}
                          control={control}
                          defaultValue={defaultValues.name}
                          render={({ field: { onChange, value } }) => (
                            <Input
                              inputId='product_name'
                              severity={errors.name?.message ? 'error' : undefined}
                              helperText={errors.name && errors?.name?.message}
                              label={t('general.name.label', 'Name', 'Name.')}
                              placeholder='Enter product name'
                              onChange={onChange}
                              value={value}
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

                          {/* UNIT */}
                          <Grid item container spacing={2}>
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

                            {/* UNITS NUMBER*/}
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
                )}
              </Accordion>

              {/* DELETE */}
              <Accordion disableSummaryGutters disableGutters title='Delete Product'>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      Careful! This will permanently delete the product. After this, unit has link with it will be
                      released.
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      Delete product
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
            // TODO:
            // content={`Are you sure you want to remove user ${user.firstName} ${user.lastName} from Cerebro App?`}
            content={`Are you sure you want to remove product ${product.name}?`}
            open={openDialog}
            title='Delete product'
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove(product);
              onClose?.();
            }}
          />
        </CardContent>
      </form>
    </>
  );
};
