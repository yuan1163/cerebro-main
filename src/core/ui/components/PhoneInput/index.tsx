import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// google libphonenumber

import {
  AsYouType,
  CountryCode,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
  validatePhoneNumberLength,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

// hooks

import useInputFocus from '@core/hooks/useInputFocusHandler';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Input } from '@core/ui/components/Input';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';

// images

const flags = import.meta.globEager('@assets/images/flags/*.png');

// icons

import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';

type Props = {
  className?: string;
  currentCountry?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  severity?: string;
  value?: string;
} & React.HTMLAttributes<HTMLElement>;

export const PhoneInput: React.FC<Props> = observer(({ children, className, disabled, onChange, severity, value, ...props }) => {
  const [currentCountry, setCurrentCountry] = useState<CountryCode | ''>('US');
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  // VALIDATION

  const validatePhoneNumber = (inputValue: string, currentCountryCode: CountryCode | '') => {
    if (!inputValue || !currentCountryCode) return false;
    const fullNumber = `+${getCountryCallingCode(currentCountryCode)}${inputValue}`;
    return isValidPhoneNumber(fullNumber, currentCountryCode);
  };

  const isValid = inputValue && validatePhoneNumber(inputValue, currentCountry || 'US');
  const updatedSeverity = isValid ? undefined : 'error';

  useEffect(() => {
    if (value) {
      const formattedValue = value.startsWith('+') ? value : `+${value}`;
      const phoneNumber = parsePhoneNumberFromString(formattedValue);
      if (phoneNumber) {
        setCurrentCountry(phoneNumber.country || 'US');
        setInputValue(phoneNumber.nationalNumber.toString());
      }
    }
  }, [value]);

  useEffect(() => {
    if (currentCountry) {
      const exampleNumber = getExampleNumber(currentCountry, examples);
      if (exampleNumber) {
        setPlaceholder(exampleNumber.formatNational());
      } else {
        setPlaceholder('');
      }
    }
  }, [currentCountry]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const fullNumber = `+${getCountryCallingCode(currentCountry || 'US')}${newValue}`;
    onChange(fullNumber);
  };

  const handleSelectCountry = (countryCode: CountryCode) => {
    setCurrentCountry(countryCode);
    setInputValue('');
  };

  // FOCUS

  const disabledElement = disabled;
  const { isFocused, handleFocus, handleBlur } = useInputFocus();

  // TEST

  // const countries = getCountries();

  // countries.forEach((countryCode) => {
  //   try {
  //     const exampleNumber = getExampleNumber(countryCode, examples);
  //     if (exampleNumber) {
  //       console.log(`${countryCode}, +${getCountryCallingCode(countryCode)}, ${exampleNumber.number}`);
  //     } else {
  //       console.log(`${countryCode}, No example number available`);
  //     }
  //   } catch (error) {
  //     console.log(`${countryCode}, Error retrieving example number`);
  //   }
  // });

  return (
    <Input
      inputId='phone'
      startMenu={
        <Menu
          button={
            <Button
              align='start'
              className={cn(styles['country-code-button'])}
              component='div'
              disabled={disabledElement}
              endIcon={<ChevronSelectorVerticalLineIcon />}
              onBlur={() => handleBlur(disabledElement)}
              onFocus={() => handleFocus(disabledElement)}
              variant='text'
              tabIndex={disabledElement ? -1 : 0}
            >
              {currentCountry}
            </Button>
          }
          placement='bottom-start'
        >
          <MenuList height={32}>
            {getCountries().map((countryCode) => {
              const flagKey = `../../../../assets/images/flags/${countryCode.toLowerCase()}.png`;
              const flagImage = flags[flagKey]?.default;
              return (
                <MenuItem key={countryCode}>
                  <MenuItemButton
                    active={countryCode === currentCountry}
                    type='button'
                    onClick={() => handleSelectCountry(countryCode as CountryCode)}
                  >
                    <img alt='' className={styles['flag-image']} loading='lazy' src={flagImage} width={16} />
                    <MenuItemText title={`${countryCode} +${getCountryCallingCode(countryCode)}`} />
                  </MenuItemButton>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      }
      disabled={disabledElement}
      externalFocus={isFocused}
      // helperText={
      //   severity !== 'undefined'
      //     ? t(
      //         'user.phoneValidation.label',
      //         'Please enter a phone number with both the country calling code and the national number.',
      //         'Input phone for field verification.',
      //       )
      //     : ''
      // }
      helperText={
        inputValue && !isValid
          ? t(
              'user.phoneValidation.label',
              'Please enter a phone number with both the country calling code and the national number.',
              'Input phone for field verification.',
            )
          : ''
      }
      label={t('user.phoneInput.label', 'Phone', 'User phone input label.')}
      onChange={handleInputChange}
      // placeholder={placeholder}
      // requiredLabel
      // severity={severity !== 'undefined' ? 'error' : ''}
      severity={inputValue && !isValid ? updatedSeverity : undefined}
      startCaption={`+${getCountryCallingCode(currentCountry || 'US')}`}
      type='tel'
      value={inputValue}
    />
  );
});
