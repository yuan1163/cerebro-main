import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { cn } from '@core/utils/classnames';

// icons
import ChevronDownIcon from '@assets/icons/LevelNOW/chevrons-down.svg?component';
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';

export type DropdownOption<ValueType = string> = {
  label: string;
  value: ValueType;
};

type DropdownProps<ValueType = string> = {
  className?: string;
  options: DropdownOption<ValueType>[];
  value?: DropdownOption<ValueType>;
  onChange: (option: DropdownOption<ValueType>) => void;
  placeholder?: string;
};

export function Dropdown<ValueType = string>({
  className,
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: DropdownProps<ValueType>) {
  return (
    <div className={cn('w-[280px]', className)}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {/* Dropdown Button */}
            <Listbox.Button className='flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold rounded bg-neutral-100 text-secondary-500'>
              <span className='flex-1 text-left'>{value?.label || options[0]?.label || placeholder}</span>
              <ChevronDownIcon className={cn('w-6 h-6', open && 'rotate-180')} />
            </Listbox.Button>

            {/* Dropdown List */}
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition ease-in duration-75'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute w-[280px] left-5 z-10 p-3 bg-white rounded shadow-dropdown-options focus:outline-none'>
                <div className='flex flex-col gap-3'>
                  {options.map((option, index) => (
                    <Listbox.Option key={index} value={option} as={Fragment}>
                      {({ active, selected }) => (
                        <li
                          className={cn(
                            'flex items-center justify-between gap-5 px-3 py-2 rounded cursor-pointer',
                            selected && 'bg-neutral-100',
                            active && !selected && 'hover:bg-neutral-50',
                          )}
                        >
                          <span
                            className={cn(
                              'flex-1 text-sm text-secondary-500',
                              selected ? 'font-medium' : 'font-normal',
                            )}
                          >
                            {option.label}
                          </span>
                          {selected && <CheckIcon className='w-6 h-6 text-primary-500' />}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
