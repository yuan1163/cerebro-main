import React from 'react';
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

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

// storage

import { useLocationProperty } from '@solutions/ems/api/storages/controllers/locationProperties';

// type

import { Properties } from '@solutions/ems/api/entities/locations';

type Props = {
  className?: string;
  onClose?: () => void;
  emissionFactor?: Partial<Properties>;
  formationLocationId?: number;
};

export const ProfileEdit: React.FC<Props> = ({ className, onClose, emissionFactor, formationLocationId, ...props }) => {
  const controller = useLocationProperty();

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

  const save = async (data: any) => {
    let yearFactor: { [key: string]: string } | string = {};
    let input: Partial<Properties>;
    if (data.year && data.factor) {
      yearFactor[data.year] = data.factor;
      input = { name: 'emissionFactor', value: JSON.stringify(yearFactor) };
    } else {
      input = { name: 'emissionFactor', value: '' };
    }
    controller.update(formationLocationId, input);
    onClose?.();
  };

  return (
    <>
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
