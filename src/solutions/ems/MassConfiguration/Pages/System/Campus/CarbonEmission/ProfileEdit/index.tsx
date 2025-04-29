import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChangeHandler } from 'react-hook-form';

// utils

import { t } from '@core/utils/translate';

// styles

// import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardActions } from '@core/ui/components/CardActions';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Modal } from '@core/ui/components/Modal';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
import { DataGridHead } from '@core/ui/components/DataGridHead';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { Chip } from '@core/ui/components/Chip';
import { Stack } from '@core/ui/components/Stack';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

// storage

import { useLocationProperty } from '@solutions/ems/api/storages/controllers/locationProperties';

// type

import { Properties } from '@solutions/ems/api/entities/locations';
import { DataGridCellContent } from '@core/ui/components/DataGridCellContent';

type Props = {
  className?: string;
  onClose?: () => void;
  emissionFactor: any;
  formationLocationId?: number;
};

export const ProfileEdit: React.FC<Props> = ({ className, onClose, emissionFactor, formationLocationId, ...props }) => {
  const [emissionFactorState, setEmissionFactorState] = React.useState<{ [key: string]: string }[]>([]);
  const controller = useLocationProperty();
  useEffect(() => {
    const getEmissionFactor = async () => {
      if (!formationLocationId) return;
      const emissionFactor = await controller.get(formationLocationId, 'emissionFactor');
      console.log('emissionFactor', emissionFactor);
      if (emissionFactor?.value) {
        setEmissionFactorState(JSON.parse(emissionFactor.value));
      }
    };
    getEmissionFactor();
  }, [formationLocationId]);

  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    setFocus,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      year: emissionFactor && Object.keys(emissionFactor)[0],
      factor: emissionFactor && Object.values(emissionFactor)[0],
    },
  });

  // dialogs

  const [openDialog, setDialogOpen] = React.useState(false);

  const save = async (data: { year: number; factor: string }) => {
    if (!formationLocationId) return;

    let yearFactor: {
      [key: string]: string;
    }[] = [];
    let input: Partial<Properties>;

    const existingData = await controller.get(formationLocationId, 'emissionFactor');
    if (existingData?.value) {
      const parsedExisting = JSON.parse(existingData.value);
      yearFactor = [...parsedExisting];
    }

    if (data.year && data.factor) {
      const yearExists = yearFactor.some((item) => Object.keys(item)[0] === data.year.toString());
      if (yearExists) {
        yearFactor = yearFactor.map((item) => {
          if (Object.keys(item)[0] === data.year.toString()) {
            return { [data.year]: data.factor };
          }
          return item;
        });
      } else {
        yearFactor.push({ [data.year]: data.factor });
        yearFactor.sort((a, b) => {
          const yearA = parseInt(Object.keys(a)[0]);
          const yearB = parseInt(Object.keys(b)[0]);
          return yearB - yearA;
        });
      }
      input = { name: 'emissionFactor', value: JSON.stringify(yearFactor) };
    } else {
      input = { name: 'emissionFactor', value: '' };
    }
    await controller.update(formationLocationId, input);
    onClose?.();
  };

  return (
    <>
      <div>
        <CardHeader
          action={
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              size='lg'
              onClick={() => setDialogOpen(true)}
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          }
          title={t('solutions.editCarbonEmissionFactor.label', 'Edit carbon emission factor', 'Edit factor.')}
        />
        <div className='px-4'>
          <DataGridHead>
            <DataGridRow className={styles['data-grid-row']}>
              <DataGridCell variant='head'>
                <DataGridCellContent className={styles['data-grid-cell-content']}>Year</DataGridCellContent>
              </DataGridCell>
              <DataGridCell variant='head'>
                <DataGridCellContent className={styles['data-grid-cell-content']}>Factor</DataGridCellContent>
              </DataGridCell>
            </DataGridRow>
          </DataGridHead>
          <DataGridBody>
            {emissionFactorState.length !== 0 &&
              emissionFactorState.slice(0, 20).map((item: { [key: string]: string }) => {
                const year = Object.keys(item)[0];
                const factor = Object.values(item)[0];
                return (
                  <DataGridRow key={year} className={styles['data-grid-row']}>
                    <DataGridCell>
                      <DataGridCellContent>
                        <Stack direction='row'>
                          <Chip key={year} color='primary' size='md'>
                            {year}
                          </Chip>
                        </Stack>
                      </DataGridCellContent>
                    </DataGridCell>
                    <DataGridCell>
                      <DataGridCellContent>
                        <Stack direction='row'>
                          <Chip key={year} color='primary' size='md'>
                            {factor}
                          </Chip>
                        </Stack>
                      </DataGridCellContent>
                    </DataGridCell>
                  </DataGridRow>
                );
              })}
            {emissionFactorState.length > 20 && (
              <Text variant='sm' weight='bold' className='mt-4'>
                Showing 20 of {emissionFactorState.length} years of factor data.
              </Text>
            )}
          </DataGridBody>
        </div>
      </div>
      <form id='profile-edit-form' className={styles['form']} onSubmit={handleSubmit(save)}>
        <Scrollbar>
          <CardContent className={styles['card-content']}>
            <Grid direction='column'>
              <Grid item>
                <Input
                  label={t('solutions.yearInput.label', 'Year', 'Year.')}
                  placeholder={t('solutions.yearInputPlaceholder.label', 'Enter year', 'Enter year input field.')}
                  {...(register('year', {
                    valueAsNumber: true,
                    min: 1970,
                    max: new Date().getFullYear(),
                  }) as unknown as ChangeHandler)}
                  type='number'
                />
              </Grid>
            </Grid>
            <Grid direction='column'>
              <Grid item>
                <Input
                  label={t('solutions.factorInput.label', 'Factor', 'Factor.')}
                  placeholder={t('solutions.factorInputPlaceholder.label', 'Enter factor', 'Enter factor.')}
                  {...(register('factor') as unknown as ChangeHandler)}
                  // type='number'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Button fullWidth size='lg' type='submit' variant='solid'>
            {t('general.saveButton.label', 'Save', 'Save button.')}
          </Button>
          <Modal
            open={openDialog}
            onClose={() => {
              setDialogOpen(false);
              onClose?.();
            }}
          >
            <Card>
              <CardHeader
                action={
                  <IconButton
                    ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
                    color='icon-secondary'
                    onClick={() => {
                      setDialogOpen(false);
                      onClose?.();
                    }}
                    size='lg'
                    variant='text'
                  >
                    <XCloseLineIcon />
                  </IconButton>
                }
                className='card-header'
                disablePaddingBottom
                size='sm'
                title={t(
                  'general.unsavedChanges.label',
                  'Unsaved changes',
                  'Modifications made by the user that have not yet been saved or confirmed.',
                )}
              />
              <CardContent size='sm'>
                <Text color='typography-secondary' variant='sm'>
                  {t(
                    'general.unsavedChangesCaption.label',
                    'Are you sure you want to close without saving? Any unsaved changes will be lost.',
                    'This message seeks user confirmation when attempting to close a document or application without saving changes.',
                  )}
                </Text>
              </CardContent>
              <CardActions borderTop>
                <Grid container justifyContent='end' spacing={2}>
                  <Grid item>
                    <Button
                      color='error'
                      onClick={() => {
                        setDialogOpen(false);
                        onClose?.();
                      }}
                      variant='outlined'
                    >
                      {t(
                        'general.closeWithoutSavingButton.label',
                        'Close without Saving.',
                        'Action that allows to exit an application without preserving any unsaved changes.',
                      )}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        save(getValues());
                        setDialogOpen(false);
                      }}
                      variant='solid'
                    >
                      {t(
                        'general.saveAndCloseButton.label',
                        'Save and Close',
                        'Action that enables to save any changes and close the application.',
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Modal>
        </CardContent>
      </form>
    </>
  );
};
