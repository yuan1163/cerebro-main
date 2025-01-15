import { useIsFetching, useIsMutating } from '@tanstack/react-query';

// types

import { ButtonProps } from '@core/ui/components/Button/buttonProps';

// components

import { Button } from '@core/ui/components/Button';

const LoadingIcon = () => <>...</>; // TODO import LoadingIcon from ...

export type ActionButtonProps = ButtonProps<'button'>;

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  const isLoading = useIsMutating() || useIsFetching();
  return isLoading ? (
    <Button startIcon={<LoadingIcon />} disabled {...props}>
      {children}
    </Button>
  ) : (
    <Button {...props}>{children}</Button>
  );
};
