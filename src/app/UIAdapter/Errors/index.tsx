import React, { useState } from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useErrors } from '@core/storages/errors';

// components

import { IconButton } from '@core/ui/components/IconButton';
import { Snackbar } from '@core/ui/components/Snackbar';
import { SnackbarContainer } from '@core/ui/components/SnackbarContainer';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

export const Errors = observer(() => {
  const snackbar = useErrors();

  // if (snackbar.length === 0) return null;
  if (!snackbar) return null;

  return (
    <SnackbarContainer>
      {snackbar.errors.map((error, key) => (
        <Snackbar
          action={
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              color='icon-inverse'
              onClick={() => snackbar.removeError(key)}
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          }
          autoHideDuration={snackbar.timeout}
          key={`errors:${key}`}
          message={error}
        />
      ))}
    </SnackbarContainer>
  );
  return null;
});
