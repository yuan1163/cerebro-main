import React from 'react';

// utils

import { t } from '@core/utils/translate';

// hooks

import useInputFocus from '@core/hooks/useInputFocusHandler';

// styles

import cn from 'classnames';
import styles from './styles.module.scss';

// components

import { Input } from '@core/ui/components/Input';
import { InputShowPasswordButton } from '@core/ui/components/InputShowPasswordButton';

type Props = {
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  severity?: string;
  value?: string;
} & React.HTMLAttributes<HTMLElement>;

export const PasswordInput: React.FC<Props> = ({
  autoComplete,
  children,
  className,
  disabled,
  helperText,
  id,
  label,
  name,
  onChange,
  onKeyDown,
  placeholder,
  severity,
  value,
}) => {
  // INPUT TYPE

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // FOCUS

  const disabledElement = disabled;
  const { isFocused, handleFocus, handleBlur } = useInputFocus();
  return (
    <Input
      autoComplete={autoComplete || 'current-password'}
      disabled={disabledElement}
      externalFocus={isFocused}
      name={name}
      helperText={helperText}
      inputId={id}
      label={label || t('login.form.password.label', 'Password', "User's password.")}
      maxLength={60}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={
        placeholder || t('login.form.password.placeholder.label', 'Enter password', 'Placeholder for password.')
      }
      // requiredLabel
      severity={severity ? 'error' : undefined}
      type={values.showPassword ? 'text' : 'password'}
      value={value}
      endButton={
        <InputShowPasswordButton
          disabled={disabledElement}
          onBlur={() => handleBlur(disabledElement)}
          onClick={handleClickShowPassword}
          onFocus={() => handleFocus(disabledElement)}
          toggleVisibility={values.showPassword}
        />
      }
    />
  );
};
