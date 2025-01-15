import { UserGroup } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { useUserGroups } from '@core/storages/controllers/userGroups';

// utils

import { t } from '@core/utils/translate';

// components

import { MultiSelect } from '@core/ui/components/MultiSelect';

type Props = {
  className?: string;
  disabled?: boolean;
  initial: UserGroup[];
  inputId?: string;
  label?: string;
  name?: string;
  onAppend?: (item: UserGroup) => void;
  onChange?: (groups: UserGroup[]) => void;
  onRemove?: (item: UserGroup) => void;
  placeholder?: string;
};

export const SelectUserGroups: React.FC<Props> = ({
  className,
  disabled,
  initial,
  inputId,
  label,
  name,
  onAppend,
  onChange,
  onRemove,
  placeholder,
}) => {
  const locations = useLocations();
  const groups = useUserGroups({
    locationId: locations.getCompany()?.locationId,
  });

  return (
    <MultiSelect
      className={className}
      disabled={disabled}
      equals={(item1: UserGroup, item2: UserGroup): boolean => item1.groupId === item2.groupId}
      id={inputId}
      label={label}
      name={name}
      onAppend={onAppend}
      onItemsChange={onChange}
      onRemove={onRemove}
      placeholder={placeholder}
      present={(item: UserGroup) => item.name}
      searchable
      source={groups.getData()}
      value={initial}
    />
  );
};
