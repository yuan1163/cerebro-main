// @ts-ignore
import { useFormStatus } from 'react-dom';

// types

import { ButtonProps } from '@core/ui/components/Button/buttonProps';

// components

import { Button } from '@core/ui/components/Button';

type FormButtonProps = ButtonProps<'button'> & React.HTMLAttributes<HTMLElement>;

export const FormButton: React.FC<FormButtonProps> = (props) => {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} type='submit' {...props}>
      {props.children}
    </Button>
  );
};
