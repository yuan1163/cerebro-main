import React from 'react';
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import { cn } from '@core/utils/classnames';

type CheckboxProps = {
  isChecked?: boolean;
  label?: string;
};

export default function Checkbox({ isChecked, label }: CheckboxProps) {
  return (
    <div className='flex items-center flex-1'>
      <div className='relative flex items-center justify-center'>
        <input
          type='checkbox'
          id='myCheckbox'
          checked={isChecked}
          readOnly
          className={cn(
            isChecked ? 'bg-primary-500' : 'bg-white border border-black/10 shadow-checkbox',
            'w-5 h-5 rounded appearance-none peer',
          )}
        />
        <CheckIcon className='absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100' />
      </div>
      {label && (
        <div
          className={cn(
            isChecked ? 'text-primary-500 bg-primary-50' : 'text-gray-700',
            'ml-3 grow font-medium cursor-pointer text-md tracking-32 px-3 py-2 rounded',
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
