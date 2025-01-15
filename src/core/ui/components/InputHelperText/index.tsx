import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  disabled?: boolean;
  helperText?: string;
  inputId?: string;
  severity?: 'error' | 'success' | 'warning' | (string & {});
};

export const InputHelperText: React.FC<Props> = ({ className, disabled = false, helperText, inputId, severity }) => {
  return (
    <div id={inputId} className={cn(styles['form-helper-text'], className)}>
      <Text color={severity || 'typography-secondary'} component='span' disabled={disabled} variant='xs'>
        {helperText}
      </Text>
    </div>
  );
};
