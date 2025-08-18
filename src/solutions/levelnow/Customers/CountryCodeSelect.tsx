import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { cn } from '@core/utils/classnames';
// icon
import ChevronUpDownIcon from '@assets/icons/LevelNOW/chevrons-up-down.svg?component';
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

type Option = {
  name: string;
  code: number;
  icon: JSX.Element;
};

type FormValues = {
  customerName?: string;
  customerNo?: string;
  primaryContact?: string;
  mobileNo?: string;
  countryCode?: string;
  postcode?: string;
  country?: string;
  state?: string;
  city?: string;
  gwsalesrep?: string;
  gwcustomerservicerep?: string;
};

type SelectProps = {
  options: Option[];
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

export default function CountryCodeSelect({ options, setValue, watch }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const mobileNo = watch('mobileNo') || '';

  const handleCountryChange = (option: Option) => {
    setSelectedOption(option);
    setValue('countryCode', option.code.toString());
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('mobileNo', e.target.value);
  };

  useEffect(() => {
    const foundOption = options.find((option) => option.name === 'US') || options[0];
    setSelectedOption(foundOption);
  }, []);

  return (
    <Listbox value={selectedOption} onChange={handleCountryChange}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button
            className={cn(
              open ? 'border-primary-500' : 'hover:border-neutral-300',
              'w-full h-9 px-3 py-2 gap-2 border rounded-md border-neutral-200 bg-white flex items-center justify-between',
            )}
          >
            <span className='text-sm font-semibold text-secondary-500'>{selectedOption.name}</span>
            <ChevronUpDownIcon className='text-neutral-900' />
            <span className='text-sm font-semibold text-secondary-500'>+{selectedOption.code}</span>

            <input
              type='text'
              value={mobileNo}
              onChange={handlePhoneNumberChange}
              onClick={(e) => e.stopPropagation()}
              className='flex-1 px-2 text-sm font-medium text-neutral-900 focus:outline-none'
              placeholder='Enter phone number'
            />
          </Listbox.Button>
          <Listbox.Options className='absolute z-10 w-full p-3 overflow-auto bg-white border rounded-lg max-h-64 shadow-select top-12 scrollbar-hide'>
            <div className='flex flex-col gap-3'>
              {options.map((option) => (
                <Listbox.Option key={`${option.name}-${option.code}`} value={option}>
                  {({ active, selected }) => (
                    <div
                      className={cn(
                        'flex items-center justify-between p-3 rounded text-neutral-900 cursor-pointer',
                        active && 'bg-hover',
                        selected && 'bg-primary-50 text-primary-500',
                      )}
                    >
                      <div className='flex items-center gap-2'>
                        {option.icon}
                        <span className='font-medium text-md tracking-32'>{option.name}</span>
                        <span className='font-medium text-md tracking-32'>+{option.code}</span>
                      </div>
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
