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
    <Modal open={open} onClose={close}>
      {/* <Modal open={open} onClose={close} className='max-w-[41rem]'> */}
      {/* <Modal open={open} onClose={close} className='max-w-[28.5rem]'> */}
      <Card className='p-11 h-[320px] justify-between flex flex-col'>
        <div className='flex flex-col items-center gap-5 p-5 mb-15'>
          <CardHeader
            // action={
            //   <IconButton
            //     ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            //     color='icon-secondary'
            //     onClick={close}
            //     size='lg'
            //     variant='text'
            //   >
            //     <XCloseLineIcon />
            //   </IconButton>
            // }
            className='flex items-center text-center justify-center p-0 card-header text-[24px] font-semibold text-neutral-900'
            disablePaddingBottom
            // size='sm'
            // title={title}
          >
            <div>{title}</div>
          </CardHeader>
          <CardContent size='sm' className='p-0'>
            <Text color='typography-secondary' variant='sm' className='text-[22px] font-medium text-secondary-500'>
              {content}
            </Text>
          </CardContent>
        </div>
        <CardActions className='p-0'>
          {/* <CardActions borderTop> */}
          <Grid container justifyContent='center' gap={3} className='p-0'>
            {/* <Grid container justifyContent='center' spacing={2}> */}
            {/* <Grid container justifyContent='end' spacing={2}> */}
            <Grid fullWidth>
              {/* <Grid item> */}
              <Button color='secondary' onClick={cancel} variant='outlined' fullWidth>
                {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
              </Button>
            </Grid>
            <Grid fullWidth>
              {/* <Grid item> */}
              <Button color='error' onClick={confirm} variant='solid' fullWidth>
                {t('general.confirmButton.label', 'Confirm', 'Confirm button.')}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  );
};
