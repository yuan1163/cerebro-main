import React, { useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { OutsideClickHandler } from '@core/ui/components/OutsideClickHandler';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import selectStyles from '@core/ui/components/Inputs/SelectGroup/styles.module.scss';
import stylesDataSelect from '@core/ui/components/DataSelect/styles.module.scss';
import stylesInput from '@core/ui/components/Input/styles.module.scss';
import stylesMenu from '@core/ui/components/Menu/styles.module.scss';
import stylesMultiselect from './styles.module.scss';

// components

import { CheckboxMarker } from '@core/ui/components/CheckboxMarker';
import { Chip } from '@core/ui/components/Chip';
import { Decorator } from '@core/ui/components/Decorator';
import { InputClearButton } from '@core/ui/components/InputClearButton';
import { InputHelperText } from '@core/ui/components/InputHelperText';
import { InputLabel } from '@core/ui/components/InputLabel';
import { Listbox, Transition } from '@headlessui/react';
import { ListDivider } from '@core/ui/components/ListDivider';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuList } from '@core/ui/components/MenuList';
import { Search } from '@core/ui/components/Search';
import { SelectorToggleButton } from '@core/ui/components/SelectorToggleButton';
import { Text } from '@core/ui/components/Text';

// icons

import CheckLineIcon from '@assets/icons/line/check.svg?component';

type Props<ItemType = any> = {
  active?: boolean;
  className?: string;
  clearButton?: boolean;
  disabled?: boolean;
  equals: (item1: ItemType, item2: ItemType) => boolean;
  helperText?: string;
  id?: string;
  label?: string;
  name?: string;
  onAppend?: (item: ItemType) => void;
  onClear?: () => void;
  onItemsChange?: (groups: ItemType[]) => void;
  onRemove?: (item: ItemType) => void;
  onSelectAllToggle?: () => void;
  placeholder?: string;
  present: (item: ItemType) => string;
  searchable?: boolean;
  severity?: 'error' | 'success' | 'warning' | (string & {});
  showSelectAll?: boolean;
  size?: 'sm' | 'md';
  source: ItemType[];
  value: ItemType[];
  width?: number;
} & React.HTMLAttributes<HTMLElement>;

interface ItemType {
  name: string;
  onClear?: () => void;
}

type OnChangeType = (value: ItemType[] | 'selectAll') => void;

export const MultiSelect: React.FC<Props> = ({
  active,
  className,
  clearButton,
  disabled,
  equals,
  helperText,
  id,
  label,
  name,
  onAppend,
  onItemsChange,
  onClear,
  onRemove,
  onSelectAllToggle,
  placeholder,
  present,
  searchable,
  severity,
  showSelectAll,
  size = 'sm',
  source,
  value,
  width,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(value);
  const [transitionFinished, setTransitionFinished] = useState(true);

  function isSelected(item: any) {
    return selectedItems.find((element: any) => equals(element, item)) ? true : false;
  }
  // SELECT

  const handleChange: OnChangeType = (value) => {
    let newSelectedItems: ItemType[] = [];

    if (value === 'selectAll') {
      const isEveryOptionSelected = filteredOptions.every((option) =>
        selectedItems.some((selectedItem) => equals(selectedItem, option)),
      );
      const newSelectedItems = isEveryOptionSelected
        ? selectedItems.filter((item) => !filteredOptions.some((option) => equals(option, item)))
        : Array.from(new Set([...selectedItems, ...filteredOptions]));

      setSelectedItems(newSelectedItems);
    } else {
      const isSelected = selectedItems.some((item) => equals(item, value));
      const newSelectedItems = isSelected
        ? selectedItems.filter((item) => !equals(item, value))
        : [...selectedItems, value];
      setSelectedItems(newSelectedItems);
      onItemsChange?.(newSelectedItems);
    }
  };

  // LISTBOX BUTTON CLICK

  const handleListboxButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      if (transitionFinished) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    },
    [transitionFinished],
  );

  const handleListboxButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  }, []);

  function handleDeselect(item: any) {
    const selectedGroupsUpdated = selectedItems.filter((element) => !equals(element, item));
    setSelectedItems(selectedGroupsUpdated);
    onRemove && onRemove(item);
    setIsOpen(true);
  }

  // CHIP DELETE

  const handleChipDelete = (item: ItemType) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDeselect(item);
    setIsOpen(false);
  };

  const handleDeleteChipOnKeyPress = (item: ItemType) => (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChipDelete(item)(event as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  // CLEAR BUTTON

  const handleClearValue = () => {
    setSelectedItems([]);
    setSearchTerm('');
    setIsOpen(false);
    if (onClear) onClear();
  };

  const handleClearButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClearValue();
  };

  const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClearValue();
    }
  };

  // POPPER

  const popperElRef = React.useRef<HTMLDivElement>(null);
  let [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null);
  let [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  let { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'flip',
        enabled: false,
        options: {
          altBoundary: true,
          rootBoundary: 'document',
        },
      },
    ],
  });

  // SEARCH

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const filteredOptions = React.useMemo(() => {
    if (searchable && searchTerm) {
      return source.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return source;
  }, [searchable, searchTerm, source]);

  // SELECT ALL

  const handleSelectAll = useCallback(() => {
    if (filteredOptions.every((option) => selectedItems.includes(option))) {
      setSelectedItems(selectedItems.filter((item) => !filteredOptions.includes(item)));
    } else {
      const newSelection = Array.from(new Set([...selectedItems, ...filteredOptions]));
      setSelectedItems(newSelection);
    }
  }, [filteredOptions, selectedItems]);

  // const isAllFilteredOptionsSelected = useCallback(() => {
  //   return filteredOptions.length > 0 && filteredOptions.every((option) => selectedItems.includes(option));
  // }, [filteredOptions, selectedItems]);

  const handleCheckboxSelectAllChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!onSelectAllToggle) {
      handleSelectAll();
    } else {
      onSelectAllToggle();
    }
  };

  // INDETERMINATE

  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  useEffect(() => {
    const allSelected = source.every((option) => selectedItems.some((selectedItem) => selectedItem.id === option.id));
    const someSelected =
      source.some((option) => selectedItems.some((selectedItem) => selectedItem.id === option.id)) && !allSelected;
    setIsCheckedAll(allSelected);
    setIsIndeterminate(someSelected);
  }, [source, selectedItems]);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  return (
    <div className={cn(stylesInput['form-control'])}>
      {/* LABEL */}
      {label ? <InputLabel disabled={disabled} inputId={id} label={label} /> : null}

      <div className={stylesDataSelect['select-wrapper']}>
        <Listbox disabled={disabled} onChange={handleChange} value={selectedItems}>
          {({ open }) => (
            <>
              <Listbox.Button
                id={id}
                className={cn(
                  disabled && stylesInput['input-base-wrapper-disabled'],
                  open && stylesInput['input-base-wrapper-focus-visible'],
                  stylesInput['input-base-wrapper'],
                  stylesInput['input-base-wrapper-cursor-default'],
                  stylesInput[`input-base-wrapper-size-${size}`],
                  stylesDataSelect[`width-${width}`],
                  selectedItems.length > 0 && stylesInput['input-base-wrapper-chips'],
                )}
                onClick={handleListboxButtonClick}
                onKeyDown={handleListboxButtonKeyDown}
                ref={setTargetElement}
              >
                <div className={cn(!value && stylesInput['input-base-placeholder'], stylesInput['input-base'])}>
                  <div className={selectStyles['chips-container']}>
                    {selectedItems.length > 0
                      ? selectedItems?.slice(0, 2).map((item, index) => (
                          <Chip
                            key={index}
                            component='div'
                            color='secondary'
                            deletable
                            disabled={disabled}
                            onDelete={handleChipDelete(item)}
                            onKeyDown={handleDeleteChipOnKeyPress(item)}
                            size='sm'
                          >
                            {present(item)}
                          </Chip>
                        ))
                      : placeholder}
                    {selectedItems.length > 2 && (
                      <Chip
                        className={cn(selectStyles['chip-count'])}
                        color='secondary'
                        component='div'
                        disabled={disabled}
                      >{`+${selectedItems.length - 2}`}</Chip>
                    )}
                  </div>
                </div>
                {/* CLEAR BUTTON */}

                {selectedItems.length > 0 && clearButton && (
                  <Decorator className={stylesDataSelect['decorator']} disabled={disabled}>
                    <InputClearButton
                      component='div'
                      disabled={disabled}
                      onClick={handleClearButtonClick}
                      onKeyDown={handleClearButtonKeyDown}
                    />
                  </Decorator>
                )}

                {/* SELECTOR TOGGLE BUTTON */}
                <Decorator className={stylesDataSelect['decorator']} disabled={disabled}>
                  <SelectorToggleButton component='div' disabled={disabled} />
                </Decorator>
              </Listbox.Button>

              <OutsideClickHandler
                onOutsideClick={() => {
                  setIsOpen(false);
                }}
              >
                <div ref={popperElRef}>
                  <Transition
                    show={isOpen}
                    leave='transition ease-out-standard duration-shorter'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    beforeEnter={() => {
                      setTransitionFinished(false);
                      setPopperElement(popperElRef.current);
                    }}
                    afterLeave={() => {
                      setTransitionFinished(true);
                      setPopperElement(null);
                    }}
                  >
                    <Listbox.Options
                      as='div'
                      className={cn(stylesMenu['popover-panel'], stylesDataSelect['options'])}
                      ref={setPopperElement}
                      style={styles.popper}
                      {...attributes.popper}
                    >
                      {/* SEARCH */}
                      <MenuList>
                        {searchable && (
                          <MenuItem>
                            <Search onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
                          </MenuItem>
                        )}
                        {(!searchable || searchTerm.length === 0) && showSelectAll && (
                          <>
                            <Listbox.Option value='selectAll'>
                              {({ active }) => (
                                <MenuItem component='div'>
                                  <MenuItemButton
                                    active={active}
                                    onClick={handleCheckboxSelectAllChange}
                                    className={stylesMultiselect['menu-item-button']}
                                    control={
                                      <>
                                        <CheckboxMarker
                                          isChecked={isCheckedAll}
                                          isIndeterminate={isIndeterminate}
                                          size='sm'
                                        />
                                        <Text
                                          className={stylesMultiselect['checkbox-label']}
                                          variant='sm'
                                          weight='medium'
                                        >
                                          {t('general.selectAll.label', 'Select all', 'Toggle all options.')}
                                        </Text>
                                      </>
                                    }
                                  />
                                </MenuItem>
                              )}
                            </Listbox.Option>
                            <ListDivider />
                          </>
                        )}
                        {filteredOptions?.map((option, index) => {
                          const selectedOption = isSelected(option);
                          const handleMenuItemClick = (event: React.MouseEvent) => {
                            event.preventDefault();
                            const newCheckedState = !isSelected(option);
                            if (newCheckedState) {
                              onAppend?.(option);
                            } else {
                              onRemove?.(option);
                            }
                            handleChange(option);
                          };
                          return (
                            <Listbox.Option key={index} value={option}>
                              {({ active, selected }) => (
                                <MenuItem component='div'>
                                  <MenuItemButton
                                    active={active}
                                    endIcon={selectedOption ? <CheckLineIcon /> : null}
                                    onClick={handleMenuItemClick}
                                    className={stylesMultiselect['menu-item-button']}
                                    control={
                                      <>
                                        <CheckboxMarker isChecked={selectedOption} size='sm' />
                                        <Text
                                          className={stylesMultiselect['checkbox-label']}
                                          variant='sm'
                                          weight='medium'
                                        >
                                          {present(option)}
                                        </Text>
                                      </>
                                    }
                                  />
                                </MenuItem>
                              )}
                            </Listbox.Option>
                          );
                        })}
                      </MenuList>
                    </Listbox.Options>
                  </Transition>
                </div>
              </OutsideClickHandler>
            </>
          )}
        </Listbox>
      </div>
      {/* HELPER TEXT */}
      <InputHelperText disabled={disabled} helperText={helperText} inputId={id} severity={severity} />
    </div>
  );
};
