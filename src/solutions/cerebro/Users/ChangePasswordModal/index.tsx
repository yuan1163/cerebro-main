import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@core/storages/auth';

// utils

import { t } from '@core/utils/translate';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { IconButton } from '@core/ui/components/IconButton';
import { Modal } from '@core/ui/components/Modal';
import { User } from '@core/api/types';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Form = {
  oldPassword: string;
  newPassword: string;
};

export const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const auth = useAuth();
  const { register, handleSubmit } = useForm<Form>();

  const close = () => {
    onClose();
  };

  const send = (data: Form) => {
    auth.resetPassword({ ...data, brand: 'default' });
  };

  return (
    <Modal open={open} onClose={close}>
      <Card>
        <CardHeader
          title={t('general.changePassword.label', 'Change Password', 'Change Password button.')}
          action={
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              color='icon-secondary'
              onClick={close}
              size='lg'
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          }
          className='card-header'
          disablePaddingBottom
          size='sm'
        />
        <CardContent>
          <form onSubmit={handleSubmit(send)}>
            <input {...register('oldPassword')} />
            <input {...register('newPassword')} />
            <button type='submit'>{t('general.submitButton.label', 'Submit', 'Submit button.')}</button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};
