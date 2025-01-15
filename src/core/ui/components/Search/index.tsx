import React from 'react';
import { ChangeHandler } from 'react-hook-form';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';

// icons

import SearchMdLineIcon from '@assets/icons/line/search-md.svg?component';
import { Icon } from '../Icon';

type Props = {
  id?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputId?: string;
  onBlur?: ChangeHandler;
  onChange?: (text: any) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  placeholder?: string;
  value?: string;
};

export const Search = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      className,
      defaultValue,
      disabled = false,
      inputId,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      placeholder = t('general.search.label', 'Search', 'Exploration of a specific item.'),
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <Input
        aria-label='search'
        aria-autocomplete='both'
        aria-labelledby={inputId}
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
        className={className}
        clearButton
        disabled={disabled}
        defaultValue=''
        startButton={
          <Icon color='icon-tertiary' disabled={disabled} variant='plain'>
            <SearchMdLineIcon />
          </Icon>
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)}
        placeholder={placeholder}
        spellCheck='false'
        value={value}
        ref={ref}
        {...props}
      />
    );
  },
);
