import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { cn } from '@core/utils/classnames';
// icon
import ChevronUpDownIcon from '@assets/icons/LevelNOW/chevrons-up-down.svg?component';
import { Scrollbar } from '../components/Scrollbar';
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import { log } from 'console';
import { set } from '@nodemodules/@types/lodash';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  activedFilter: string | null;
  handleSelect: (device: string) => void;
};
export default function Select({ options, activedFilter, handleSelect }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option: Option) => {
    console.log('Selected option:', option);
    setSelectedOption(option);
    handleSelect(option.value);
  };

  useEffect(() => {
    if (activedFilter) {
      const matchedOption = options.find((option) => option.value === activedFilter);
      if (matchedOption) {
        setSelectedOption(matchedOption);
      }
    } else {
      setSelectedOption(options[0]);
    }
  }, [activedFilter, options]);

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button
            className={cn(
              open ? 'border-primary-500' : 'hover:border-neutral-300',
              'w-full px-3 py-2 font-medium text-black border rounded-md text-md tracking-32 border-neutral-200 bg-white flex items-center justify-between',
            )}
          >
            <span>{selectedOption.label}</span>
            <ChevronUpDownIcon className='text-neutral-900' />
          </Listbox.Button>
          <Listbox.Options className='absolute z-10 w-full p-3 overflow-auto bg-white border rounded-lg max-h-64 shadow-select top-12 scrollbar-hide'>
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
