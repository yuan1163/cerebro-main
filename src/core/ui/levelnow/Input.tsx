import React, { forwardRef } from 'react';
import { cn } from '@core/utils/classnames';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type='text'
      className={cn(
        'px-4 py-2 w-full text-md font-medium tracking-32 border rounded-md h-9 border-neutral-200 text-neutral-900   hover:border-neutral-300 focus:border-primary-500 focus:outline-none',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
