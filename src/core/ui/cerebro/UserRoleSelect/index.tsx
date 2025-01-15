// types

import { UserRole } from '@core/api/types';

// storages

import { useUserRoles } from '@core/storages/controllers/userRoles';

// components

import { DataSelect } from '@core/ui/components/DataSelect';

// utils

import { t } from '@core/utils/translate';

type Props = {
  className?: string;
  disabled?: boolean;
  label?: string;
  onSelect: (user: UserRole | undefined) => void;
  placeholder?: string;
  value: UserRole | undefined;
};

export const UserRoleSelect: React.FC<Props> = ({
  className,
  placeholder = t(
    'general.selectCategory.label',
    'Select Category',
    'Prompt instructs users to choose a specific category from a list.',
  ),
  value,
  onSelect,
  label,
  disabled,
}) => {
  const roles = useUserRoles();
  const options: (UserRole | undefined)[] = roles.getData()?.filter((role) => role.roleId !== 1); // skip Unlimited role
  options.push(undefined);

  return (
    <DataSelect
      className={className}
      disabled={disabled}
      label={label}
      onChange={(value) => onSelect(value)}
      options={options}
      placeholder={placeholder}
      present={(item) => (item ? item.name : t('user.roles.viewer', 'Viewer', 'Predefined Viewer role name'))}
      value={value}
    />
  );
};
