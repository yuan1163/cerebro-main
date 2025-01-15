import React, { useEffect, useRef, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';

// styles

import styles from '@core/ui/components/Input/styles.module.scss';
import { cn } from '@core/utils/classnames';

import { IconPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// components

import { Button } from '@core/ui/components/Button';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Decorator } from '@core/ui/components/Decorator';
import { InputClearButton } from '@core/ui/components/InputClearButton';
import { InputHelperText } from '@core/ui/components/InputHelperText';
import { InputLabel } from '@core/ui/components/InputLabel';
import { OutsideClickHandler } from '@core/ui/components/OutsideClickHandler';
import { SeverityIcon } from '@core/ui/components/SeverityIcon';
import { Text } from '@core/ui/components/Text';

type InputProps = {
  className?: string;
  clearButton?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  endButton?: React.ReactNode;
  endCaption?: string;
  endIcon?: React.ReactNode;
  endIconColor?: IconPalette | SeverityPalette | PaletteString;
  externalFocus?: boolean;
  helperText?: string;
  inputId?: string;
  label?: string;
  loading?: boolean;
  name?: string;
  noLabel?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: boolean;
  severity?: SeverityPalette;
  size?: 'sm' | 'md';
  startButton?: React.ReactNode;
  startCaption?: string;
  startIcon?: React.ReactNode;
  startIconColor?: IconPalette | SeverityPalette | PaletteString;
  startMenu?: React.ReactNode;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | (string & {});
  value?: any;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

// BUTTONS

const StartButton = ({ disabled, startButton }: InputProps) => {
  return <span className={cn(styles['start-icon'], disabled && styles['icon-disabled'])}>{startButton}</span>;
};

const EndButton = ({ disabled, endButton }: InputProps) => {
  return <span className={cn(styles['end-icon'], disabled && styles['icon-disabled'])}>{endButton}</span>;
};

const FileButton = ({ inputId }: InputProps) => {
  return (
    <Button className={styles['button-type-file']} component='label' htmlFor={inputId} size='md' variant='ghost'>
      Browse
    </Button>
  );
};

// ICONS

const StartIcon = ({ disabled, startIconColor, startIcon }: InputProps) => {
  return (
    <Decorator className={styles['start-icon']} color={startIconColor} disabled={disabled} size='sm'>
      {startIcon}
    </Decorator>
  );
};

const EndIcon = ({ disabled, endIconColor, endIcon }: InputProps) => {
  return (
    <Decorator className={styles['end-icon']} color={endIconColor} disabled={disabled} size='sm'>
      {endIcon}
    </Decorator>
  );
};

const LoadingIcon = ({ disabled, severity }: InputProps) => {
  return <CircularProgress className={styles['loading-icon']} color={severity} disabled={disabled} />;
};

// CAPTIONS

const StartCaption = ({ disabled, startCaption }: InputProps) => {
  return (
    <Text
      color='typography-secondary'
      className={styles['input-base-caption-start']}
      component='span'
      disabled={disabled}
      variant='sm'
    >
      {startCaption}
    </Text>
  );
};

const EndCaption = ({ disabled, endCaption }: InputProps) => {
  return (
    <Text
      align='right'
      color='typography-secondary'
      className={styles['input-base-caption-end']}
      component='span'
      disabled={disabled}
      variant='sm'
    >
      {endCaption}
    </Text>
  );
};

// PROTOCOL PREFIX

const ProtocolPrefix = () => {
  return (
    <Text className={styles['url-placeholder-prefix']} color='typography-secondary' component='span' variant='sm'>
      http://
    </Text>
  );
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      clearButton,
      defaultValue,
      disabled,
      endButton,
      endCaption,
      endIcon,
      endIconColor = 'icon-tertiary',
      externalFocus,
      helperText,
      inputId,
      label,
      loading,
      name,
      noLabel,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      placeholder,
      required,
      requiredLabel,
      severity,
      size = 'sm',
      startButton,
      startCaption,
      startIcon,
      startIconColor = 'icon-tertiary',
      startMenu,
      type = 'text',
      value,
      ...props
    },
    ref,
  ) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState(value || '');
    const [isHovered, setIsHovered] = useState(false);
    const [showClearButton, setShowClearButton] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const componentRef = useRef<HTMLDivElement | null>(null);

    // INPUT

    const handleInputFocus = () => {
      setInputFocus(true);
      setShowClearButton(true);
    };

    const handleInputBlur = () => {
      blurTimeoutRef.current = setTimeout(() => {
        if (!componentRef.current?.contains(document.activeElement)) {
          setInputFocus(false);
          setShowClearButton(false);
        }
      }, 50);
    };

    const handleInputMouseEnter = () => {
      setIsHovered(true);
      setShowClearButton(true);
    };

    const handleInputMouseLeave = () => {
      if (!inputFocus) {
        setIsHovered(false);
        setShowClearButton(false);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      setShowClearButton(!!newValue);
      if (onChange) {
        onChange(event);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onKeyDown?.(event);
      }
    };

    // CLEAR

    const handleClearButtonClick = () => {
      setInputValue('');
      const currentInput = inputRef.current;
      if (currentInput) {
        currentInput.value = '';
        currentInput.focus();
      }
      if (onChange) {
        onChange({
          target: { value: '', name: (currentInput as HTMLInputElement).name },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleClearButtonClick();
      }
    };

    const handleClearButtonFocus = () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
      setShowClearButton(true);
    };

    const handleClearButtonBlur = () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
      blurTimeoutRef.current = setTimeout(() => {
        if (
          !inputRef.current?.contains(document.activeElement) &&
          !componentRef.current?.contains(document.activeElement)
        ) {
          setShowClearButton(false);
        }
      }, 50);
    };

    useEffect(() => {
      return () => {
        if (blurTimeoutRef.current !== null) {
          clearTimeout(blurTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    return (
      <div className={cn(styles['form-control'], styles[`form-control-severity-${severity}`])}>
        {/* LABEL */}

        {label ? <InputLabel disabled={disabled} inputId={inputId} label={label} required={requiredLabel} /> : null}

        {/* INPUT */}

        <div className={cn(styles['input-wrapper'], type === 'file' && styles['input-wrapper-type-file'])}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setInputFocus(false);
            }}
          >
            <div
              className={cn(
                styles['input-base-wrapper'],
                styles[`input-base-wrapper-size-${size}`],
                disabled && styles['input-base-wrapper-disabled'],
                inputFocus && styles['input-base-wrapper-focus-visible'],
                externalFocus && styles['input-base-wrapper-focus-visible'],
                (Boolean(startIcon) || Boolean(startButton)) && styles['input-base-wrapper-start-icon'],
              )}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onMouseEnter={handleInputMouseEnter}
              onMouseLeave={handleInputMouseLeave}
              ref={componentRef}
            >
              {startMenu ? <span className='mr-1'>{startMenu}</span> : null}
              {startIcon ? (
                <StartIcon disabled={disabled} startIconColor={startIconColor} startIcon={startIcon} />
              ) : null}

              {startCaption ? <StartCaption disabled={disabled} startCaption={startCaption} /> : null}

              {startButton ? <StartButton disabled={disabled} startButton={startButton} /> : null}

              {type === 'url' ? <ProtocolPrefix /> : null}

              <input
                id={inputId}
                className={cn(styles['input-base'], type === 'file' && styles['input-base-type-file'], className)}
                // defaultValue={defaultValue}
                disabled={disabled}
                name={name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                ref={inputRef}
                required={required}
                type={type}
                value={inputValue}
                {...props}
              />

              {/* CLEAR BUTTON */}

              {inputValue && showClearButton && (inputFocus || isHovered) && clearButton && (
                <Decorator className={styles['icon-clear-button-decorator']} disabled={disabled}>
                  <InputClearButton
                    disabled={disabled}
                    onClick={handleClearButtonClick}
                    onKeyDown={handleClearButtonKeyDown}
                    onFocus={handleClearButtonFocus}
                    onBlur={handleClearButtonBlur}
                  />
                </Decorator>
              )}

              {endCaption ? <EndCaption disabled={disabled} endCaption={endCaption} /> : null}

              {endIcon ? <EndIcon endIconColor={endIconColor} disabled={disabled} endIcon={endIcon} /> : null}

              {loading && <LoadingIcon disabled={disabled} severity={severity} />}

              {endButton ? <EndButton disabled={disabled} endButton={endButton} /> : null}

              {severity ? (
                <SeverityIcon className={styles['severity-icon']} disabled={disabled} severity={severity} />
              ) : null}
            </div>
          </OutsideClickHandler>
          {type === 'file' ? <FileButton /> : null}
        </div>

        {/* HELPER TEXT */}
        {!noLabel && (
          <InputHelperText disabled={disabled} helperText={helperText} inputId={inputId} severity={severity} />
        )}
      </div>
    );
  },
);
