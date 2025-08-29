import { useState, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { cn } from '@core/utils/classnames';
// icon
import ChevronUpDownIcon from '@assets/icons/LevelNOW/chevrons-up-down.svg?component';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import Checkbox from '@core/ui/levelnow/Checkbox';
import CrossIcon from '@assets/icons/LevelNOW/cross.svg?component';
import { Button } from '@core/ui/components/Button';
import { DeviceLevelLabel } from '@core/api/types';
import { set } from '@nodemodules/@types/lodash';
import { t } from '@core/utils/translate';

type CheckSelectProps = {
  options: DeviceLevelLabel[];
  activedFilter: DeviceLevelLabel[];
  handleSelect: (levels: DeviceLevelLabel[]) => void;
};
export default function CheckSelect({ options, activedFilter, handleSelect }: CheckSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<DeviceLevelLabel[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (newSelectedOptions: DeviceLevelLabel[]) => {
    const sortedSelection = newSelectedOptions.sort((a, b) => {
      const indexA = options.findIndex((opt) => opt === a);
      const indexB = options.findIndex((opt) => opt === b);
      return indexA - indexB;
    });

    setSelectedOptions(sortedSelection);
  };

  const handleCancel = () => {
    setSelectedOptions([]);
    buttonRef.current?.click();
  };

  const handleConfirm = () => {
    const selectedLabels = selectedOptions.map((option) => option) as DeviceLevelLabel[];
    handleSelect(selectedLabels);
    buttonRef.current?.click();
  };

  const handleRemoveFilterByCross = (e: React.MouseEvent, label: DeviceLevelLabel): void => {
    e.stopPropagation();
    const updatedFilter = activedFilter.filter((item) => item !== label);
    handleSelect(updatedFilter);
    setSelectedOptions(updatedFilter);
  };

  return (
    <>
      <Listbox value={selectedOptions} onChange={handleChange} multiple>
        {({ open }) => (
          <div className='relative'>
            <Listbox.Button
              onClick={() => {
                setSelectedOptions([...activedFilter]);
              }}
              ref={buttonRef}
              className={cn(
                open ? 'border-primary-500' : 'hover:border-neutral-300',
                'w-full px-3 py-2 font-medium text-black border rounded-md text-md tracking-32 border-neutral-200 bg-white flex items-center justify-between',
              )}
            >
              <div className='flex items-center gap-2'>
                <span>{t('filter.level.label', 'Leveling:', 'Label for level filter')}</span>
                <div className='flex items-center gap-2'>
                  {activedFilter?.map((label) => (
                    <div key={label} className='flex items-center gap-2 px-2 py-0.5 rounded-sm bg-neutral-100'>
                      <span className='text-sm font-semibold tracking-28 text-secondary-500 '>{label}</span>
                      <button
                        type='button'
                        onClick={(e) => handleRemoveFilterByCross(e, label)}
                        className='flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer'
                      >
                        <CrossIcon className='text-tertiary-500 hover:text-tertiary-600' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <ChevronUpDownIcon className='text-neutral-900' />
            </Listbox.Button>
            <Listbox.Options className='absolute z-10 w-full p-3 bg-white border rounded-lg shadow-select top-12'>
              <div className='flex flex-col gap-3'>
                {options.map((option) => (
                  <Listbox.Option key={option} value={option}>
                    {({ active, selected }) => (
                      <div
                        className={cn(
                          'flex items-center justify-between p-3 rounded text-neutral-900 cursor-pointer',
                          active && 'bg-hover',
                          selected && 'bg-opacity-0',
                        )}
                      >
                        <Checkbox isChecked={selected} label={option} />
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </div>
              <div className='flex items-center w-full gap-3 mt-3'>
                <Button variant='outlined' fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant='solid' fullWidth onClick={handleConfirm}>
                  Confirm
                </Button>
              </div>
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </>
  );
}
