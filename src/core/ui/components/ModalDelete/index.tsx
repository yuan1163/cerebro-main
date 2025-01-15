import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Modal } from '@core/ui/components/Modal';
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { IconButton } from '@core/ui/components/IconButton';
import { CardContent } from '@core/ui/components/CardContent';
import { Text } from '@core/ui/components/Text';
import { CardActions } from '@core/ui/components/CardActions';
import { Grid } from '@core/ui/components/Grid';
import { Button } from '@core/ui/components/Button';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  cancel?: () => void;
  className?: string;
  close?: () => void;
  confirm?: () => void;
  content?: string;
  title?: string;
  open?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const ModalDelete: React.FC<Props> = ({ children, className, content, open, close, confirm, cancel, title }) => {
  return (
    <Modal open={open} onClose={close} className='max-w-[28.5rem]'>
      <Card>
        <CardHeader
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
          title={title}
        />
        <CardContent size='sm'>
          <Text color='typography-secondary' variant='sm'>
            {content}
          </Text>
        </CardContent>
        <CardActions borderTop>
          <Grid container justifyContent='end' spacing={2}>
            <Grid item>
              <Button color='secondary' onClick={cancel} variant='outlined'>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
            </Grid>
            <Grid item>
              <Button color='error' onClick={confirm} variant='solid'>
                {t('general.confirmButton.label', 'Confirm', 'Confirm button.')}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  );
};
