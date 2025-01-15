import React from 'react';
import { useForm } from 'react-hook-form';

// utils

import { t } from '@core/utils/translate';

// styles

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
import { DataSelect } from '@core/ui/components/DataSelect';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

// storage

import { useLocationProperty } from '@solutions/ems/api/storages/controllers/locationProperties';

// type

import { Properties } from '@solutions/ems/api/entities/locations';

type Props = {
  className?: string;
  onClose?: () => void;
  domainMapZoomInSize?: Partial<Properties>;
  companyLocationId: number;
};

export const ProfileEdit: React.FC<Props> = ({
  className,
  onClose,
  domainMapZoomInSize,
  companyLocationId,
  ...props
}) => {
  const controller = useLocationProperty();

  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    setFocus,
    getValues,
    setValue,
  } = useForm<Partial<Properties>>({ defaultValues: { value: domainMapZoomInSize?.value } });

  // dialogs

  const [openDialog, setDialogOpen] = React.useState(false);

  // selector

  const [selectedOption, setSelectedOption] = React.useState(
    getValues().value ? { value: getValues().value, label: getValues().value } : undefined,
  );

  const save = async (data: any) => {
    const input = { name: 'domainMapZoomInSize', value: data.value };
    controller.update(companyLocationId, input);
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
        title={t('map.editDomainMapZoom.label', 'Edit domain map zoom in size', 'Card header for Domain Map.')}
      />
      <form id='profile-edit-form' className={styles['form']} onSubmit={handleSubmit(save)}>
        <Scrollbar>
          <CardContent className={styles['card-content']}>
            <Grid direction='column'>
              <Grid item>
                <DataSelect
                  label={t('ems.valueInput.label', 'Value', 'Value field.')}
                  placeholder={t('map.selectSize.label', 'Select size', 'Select size label.')}
                  options={Array.from({ length: 10 }, (_, i) => i + 1).map((option) => {
                    return { value: option.toString(), label: option.toString() };
                  })}
                  present={(option) => option.label}
                  value={selectedOption}
                  onChange={(option) => {
                    setValue('value', option.value);
                    setSelectedOption({ value: getValues().value, label: getValues().value });
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Button fullWidth size='lg' type='submit' variant='solid'>
            Save
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
