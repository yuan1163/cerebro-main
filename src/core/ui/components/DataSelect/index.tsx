import React, { useState, useEffect, useRef } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import stylesInput from '@core/ui/components/Input/styles.module.scss';
import stylesMenu from '@core/ui/components/Menu/styles.module.scss';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Decorator } from '@core/ui/components/Decorator';
import { InputClearButton } from '@core/ui/components/InputClearButton';
import { InputHelperText } from '@core/ui/components/InputHelperText';
import { InputLabel } from '@core/ui/components/InputLabel';
import { Listbox, Transition } from '@headlessui/react';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';
import { SelectorToggleButton } from '@core/ui/components/SelectorToggleButton';
import { Text } from '@core/ui/components/Text';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';

type DataSelectProps<DataType = any> = {
  avatarOptions?: (item: DataType) => React.ReactNode;
  avatarPresent?: (item: DataType) => React.ReactNode;
  className?: string;
  clearButton?: boolean;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  onChange?: (item: DataType) => void;
  onClear?: () => void;
  options?: DataType[];
  placeholder?: string;
  present?: (item: DataType) => string;
  severity?: 'error' | 'success' | 'warning' | (string & {});
  size?: 'sm' | 'md';
  startIcon?: (item: DataType) => React.ReactNode;
  startIconColor?: (item: DataType) => string;
  value?: DataType;
  variant?: 'default' | 'avatar' | 'control';
  width?: number;
};

export const DataSelect: React.FC<DataSelectProps> = ({
  avatarOptions,
  avatarPresent,
  className,
  clearButton,
  disabled,
  helperText,
  id,
  label,
  onChange,
  onClear,
  options,
  placeholder,
  present,
  severity,
  size = 'sm',
  startIcon,
  startIconColor,
  value,
  variant = 'default',
  width,
}) => {
  // CLEAR BUTTON
  const [itemSelected, setItemSelected] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>(value);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);
  const [transitionFinished, setTransitionFinished] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  let blurTimeout: ReturnType<typeof setTimeout>;

  // 使用 useEffect 跟踪 Listbox 的 open 狀態而不是在渲染函數中直接設置
  const openRef = useRef(false);
  
  // CLEAR BUTTON

  const handleClearValue = () => {
    if (onChange) {
      onChange(null);
    }
    setShowClearButton(false);
  };

  const handleClearButtonClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation();
    handleClearValue();
    if (onClear) {
      onClear();
    }
  };

  const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClearValue();
      if (onClear) {
        onClear();
      }
    }
  };

  // LISTBOX BUTTON

  const handleFocus = () => {
    if (!itemSelected) {
      clearTimeout(blurTimeout);
      if (!menuOpen) {
        setShowClearButton(true);
      }
    }
  };

  const handleBlur = () => {
    blurTimeout = setTimeout(() => {
      if (!menuOpen) {
        setShowClearButton(false);
      }
    }, 50);
  };

  const handleMouseEnter = () => {
    if (!itemSelected) {
      clearTimeout(blurTimeout);
      setShowClearButton(true);
    }
  };

  const handleMouseLeave = () => {
    blurTimeout = setTimeout(() => {
      setShowClearButton(false);
    }, 50);
  };

  const handleTouchEnd = () => {
    if (menuOpen) {
      setShowClearButton(false);
    }
  };

  // LISTBOX

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
    setSelectedValue(newValue);
    setItemSelected(true);
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
      setItemSelected(false);
      if (!menuOpen) {
        setShowClearButton(false);
      }
    }, 50);
  };

  useEffect(() => {
    setShowClearButton(false);
  }, [selectedValue]);

  return (
    <div className={cn(stylesInput['form-control'], stylesInput[`form-control-severity-${severity}`])}>
      {/* LABEL */}

      {label ? <InputLabel disabled={disabled} inputId={id} label={label} /> : null}

      <div className={styles['select-wrapper']}>
        <Listbox defaultValue={''} disabled={disabled} onChange={handleChange} value={value}>
          {({ open }) => {
            // 在渲染期間不直接調用 setState，而是存儲 open 狀態，稍後處理
            if (open !== openRef.current) {
              openRef.current = open;
              // 使用 setTimeout 將狀態更新推遲到渲染後
              setTimeout(() => {
                setMenuOpen(open);
              }, 0);
            }
            return (
              <>
                <Listbox.Button
                  id={id}
                  ref={buttonRef}
                  className={cn(
                    disabled && stylesInput['input-base-wrapper-disabled'],
                    open && stylesInput['input-base-wrapper-focus-visible'],
                    stylesInput['input-base-wrapper'],
                    stylesInput['input-base-wrapper-cursor-default'],
                    stylesInput[`input-base-wrapper-size-${size}`],
                    styles[`input-variant-${variant}`],
                    styles[`width-${width}`],
                  )}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={cn(
                      /* [WEB-109] !value && stylesInput['input-base-placeholder'], */ stylesInput['input-base'],
                    )}
                  >
                    {value && startIcon ? (
                      <Decorator
                        className={styles['start-icon']}
                        color={startIconColor?.(value) || ''}
                        disabled={disabled}
                      >
                        {startIcon?.(value)}
                      </Decorator>
                    ) : null}
                    {/* {value && avatar?.(value) ? (
                    <Avatar
                      className={styles['avatar']}
                      disabled={disabled}
                      src={value.icon && value.icon.src}
                      rounded
                      size="xs"
                    />
                  ) : null} */}
                    {variant === 'avatar' &&
                      (avatarPresent?.(value) ? (
                        avatarPresent?.(value)
                      ) : (
                        <Avatar className={styles['avatar']} disabled={disabled} rounded size='xs' />
                      ))}
                    {value ? (
                      present?.(value)
                    ) : (
                      <Text color='typography-placeholder' variant='sm'>
                        {placeholder}
                      </Text>
                    )}
                  </div>
                  {/* INPUT CLEAR BUTTON */}
                  {value && showClearButton && !menuOpen && transitionFinished && clearButton && (
                    <Decorator className={styles['decorator']} disabled={disabled}>
                      <InputClearButton
                        component='div'
                        disabled={disabled}
                        onClick={handleClearButtonClick}
                        onKeyDown={handleClearButtonKeyDown}
                      />
                    </Decorator>
                  )}
                  {/* SELECTOR TOGGLE BUTTON */}
                  <Decorator className={styles['decorator']} disabled={disabled}>
                    <SelectorToggleButton component='div' disabled={disabled} />
                  </Decorator>
                </Listbox.Button>
                {/* OPTIONS */}
                <Transition
                  show={open}
                  leave='transition ease-out-standard duration-shorter'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  beforeEnter={() => {
                    setTransitionFinished(false);
                  }}
                  afterLeave={() => {
                    setTransitionFinished(true);
                  }}
                >
                  <Listbox.Options as='div' className={cn(stylesMenu['popover-panel'], styles['options'])}>
                    <MenuList>
                      {options && options?.length > 0 ? (
                        options?.map((option, index) => (
                          <Listbox.Option key={index} value={option}>
                            {({ active, selected }) => (
                              <MenuItem component='div'>
                                <MenuItemButton
                                  active={active}
                                  endIcon={selected ? <CheckLineIcon /> : null}
                                  type='button'
                                  // startIcon={startIcon?.(option) || ''}
                                  // startIconColor={startIconColor?.(option)}
                                >
                                  {/* {avatar?.(option) ? (
                              <Avatar
                                className={styles['avatar']}
                                disabled={disabled}
                                rounded
                                size="xs"
                                src={option.icon.src}
                              />
                            ) : null} */}
                                  {variant === 'avatar' &&
                                    (avatarOptions?.(option) ? (
                                      avatarOptions?.(option)
                                    ) : (
                                      <Avatar className={styles['avatar']} disabled={disabled} rounded size='xs' />
                                    ))}
                                  <MenuItemText title={present?.(option)} />
                                </MenuItemButton>
                              </MenuItem>
                            )}
                          </Listbox.Option>
                        ))
                      ) : (
                        <MenuItem component='div'>
                          <div className={styles['empty-list-container']}>
                            <Text color='typography-placeholder' variant='sm'>
                              {t('general.nothingFound.label', 'Nothing found', 'Description for an empty list.')}
                            </Text>
                          </div>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Listbox.Options>
                </Transition>
              </>
            );
          }}
        </Listbox>
      </div>

      {/* HELPER TEXT */}

      <InputHelperText disabled={disabled} helperText={helperText} inputId={id} severity={severity} />
    </div>
  );
};
