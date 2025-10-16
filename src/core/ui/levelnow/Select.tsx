import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { cn } from '@core/utils/classnames';
// icon
import ChevronUpDownIcon from '@assets/icons/LevelNOW/chevrons-up-down.svg?component';
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string | null;
  hasEmpty?: boolean;
  handleSelect: (optionValue: string) => void;
  className?: string;
  optionsMaxHeight?: string;
};
export default function Select({
  options,
  value,
  hasEmpty,
  handleSelect,
  className,
  optionsMaxHeight = 'max-h-64',
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option: Option) => {
    console.log('Selected option:', option);
    setSelectedOption(option);
    handleSelect(option.value);
  };

  useEffect(() => {
    if (value) {
      const matchedOption = options.find((option) => option.value === value);
      if (matchedOption) {
        setSelectedOption(matchedOption);
      } else {
        setSelectedOption({ label: '', value });
      }
    } else if (hasEmpty) {
      setSelectedOption({ label: '', value: '' });
    } else {
      setSelectedOption(options[0]);
    }
  }, [value, options]);

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button
            className={cn(
              'w-full px-3 py-2 font-medium text-black border rounded-md text-md tracking-32 border-neutral-200 bg-white flex items-center justify-between',
              open ? 'border-primary-500' : 'hover:border-neutral-300',
              className,
            )}
          >
            <span>{selectedOption.label}</span>
            <ChevronUpDownIcon className='text-neutral-900' />
          </Listbox.Button>
          <Listbox.Options
            className={cn(
              'absolute z-10 w-full p-3 overflow-auto bg-white border rounded-lg shadow-select top-12 scrollbar-hide',
              optionsMaxHeight,
            )}
          >
            <div className='flex flex-col gap-3'>
              {options.map((option) => (
                <Listbox.Option key={option.value} value={option}>
                  {({ active, selected }) => (
                    <div
                      className={cn(
                        'flex items-center justify-between p-3 rounded text-neutral-900 cursor-pointer',
                        active && 'bg-hover',
                        selected && 'bg-primary-50 text-primary-500',
                      )}
                    >
                      <span className='font-medium text-md tracking-32'>{option.label}</span>
                      {selected && <CheckIcon className='text-primary-500' />}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}
