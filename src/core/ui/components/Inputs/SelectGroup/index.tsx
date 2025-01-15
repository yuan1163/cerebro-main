import React from 'react';
import { usePopper } from 'react-popper';

// api

import { UserGroupsQuery } from '@solutions/utilus/api/generated';
import { UsersQuery } from '@solutions/utilus/api/generated';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import selectStyles from './styles.module.scss';
import stylesInputBase from '@core/ui/components/InputBase/styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { CardContent } from '@core/ui/components/CardContent';
import { Checkbox } from '@core/ui/components/Checkbox';
import { Chip } from '@core/ui/components/Chip';
import { FormControl } from '@core/ui/components/FormControl';
import { IconBase } from '@core/ui/components/IconBase';
import { IconButton } from '@core/ui/components/IconButton';
import { InputAdornment } from '@core/ui/components/InputAdornment';
import { Listbox, Transition } from '@headlessui/react';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { Stack } from '@core/ui/components/Stack';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  user?: ElementOf<UsersQuery['users']>;
  className?: string;
  groupList?: UserGroupsQuery['userGroups'];
  id?: string;
  name?: string;
  value?: any;
} & React.HTMLAttributes<HTMLElement>;

export const SelectGroup: React.FC<Props> = ({ className, groupList, id, name, value, user, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState(user?.groups || []);

  function isSelected(value: string | number) {
    // TODO any
    return selectedGroups.find((element: any) => element.name === value) ? true : false;
  }

  function handleSelect(value: string | number) {
    if (!isSelected(value)) {
      const selectedGroupsUpdated = [...selectedGroups, groupList?.find((element: any) => element.name === value)];
      // TODO any
      setSelectedGroups(selectedGroupsUpdated as any);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value: string | number) {
    // TODO any
    const selectedGroupsUpdated = selectedGroups.filter((element: any) => element.name !== value);
    setSelectedGroups(selectedGroupsUpdated);
    setIsOpen(true);
  }

  // popper

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

  // search

  const [searchTerm, setSearchTerm] = React.useState<string | undefined>('');
  const filteredOptions = searchTerm
    ? groupList?.filter((item) => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : groupList;

  return (
    <div className={cn(selectStyles['container'], className)} onMouseLeave={() => setIsOpen(false)}>
      {/* TODO any */}
      <Listbox onChange={(value: any) => handleSelect(value)} value={selectedGroups}>
        <Listbox.Button
          className={cn(
            selectStyles['button'],
            stylesInputBase['input-base'],
            stylesInputBase['input-base-wrapper'],
            stylesInputBase['input-base-filled'],
          )}
          onClick={() => setIsOpen(!isOpen)}
          ref={setTargetElement}
        >
          <Stack direction='row' className={selectStyles['chips-container']}>
            {selectedGroups.length > 0
              ? selectedGroups?.slice(0, 2).map((groupItem: any) => (
                  <Chip
                    color={groupItem.color ?? 'primary'}
                    component='button'
                    deletable
                    key={groupItem.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.stopPropagation();
                      handleDeselect(groupItem.name);
                      setIsOpen(false);
                    }}
                  >
                    {groupItem.name}
                  </Chip>
                ))
              : `${t(
                  'general.selectGroupFromList.label',
                  'Select group',
                  'Prompt used to instruct users to choose a specific group from a list.',
                )}:`}
            {/* {selectedGroups.length > 2 && <Chip>...</Chip>} */}
          </Stack>
          {selectedGroups.length > 0 && (
            <Chip className={selectStyles['chip-count']}>{`${selectedGroups.length}`}</Chip>
          )}
          {selectedGroups.length > 0 && (
            <IconButton
              ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
              className={selectStyles['icon-button-close']}
              size='lg'
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                setSelectedGroups([]);
                setIsOpen(false);
              }}
              variant='text'
            >
              <XCloseLineIcon />
            </IconButton>
          )}
          <InputAdornment position='end'>
            <IconBase className={selectStyles['icon-container']}>
              <ChevronDownLineIcon aria-hidden='true' className={cn(isOpen && selectStyles['expanded'])} />
            </IconBase>
          </InputAdornment>
        </Listbox.Button>
        <div ref={popperElRef} onMouseEnter={() => setIsOpen(true)}>
          <Transition
            afterLeave={() => setPopperElement(null)}
            beforeEnter={() => setPopperElement(popperElRef.current)}
            leave='transition ease-out-standard duration-shorter'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            show={isOpen}
          >
            <Listbox.Options static className={selectStyles['options']}>
              <Box className={selectStyles['search-container']}>
                <Search
                  onChange={(text) => setSearchTerm(text)}
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.stopPropagation();
                    }
                  }}
                />
              </Box>
              <Scrollbar className={selectStyles['scrollbar']}>
                <CardContent className={selectStyles['card-container']}>
                  <Stack spacing={3}>
                    {/* TODO any */}
                    {filteredOptions?.map((groupItem: any) => {
                      const selected = isSelected(groupItem.name);
                      return (
                        <Listbox.Option
                          key={groupItem.id}
                          className={selectStyles['listbox-option']}
                          value={groupItem.name}
                        >
                          {({ active }) => (
                            <FormControl fullWidth size='sm' variant='checkbox'>
                              <Checkbox
                                inputId={groupItem.name}
                                isChecked={selected}
                                label={groupItem.name ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                                size='sm'
                              />
                            </FormControl>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Scrollbar>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
