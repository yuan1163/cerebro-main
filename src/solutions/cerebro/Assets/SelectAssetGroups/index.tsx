// types

import { AssetGroup } from '@core/api/types';

// storages

import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useUI } from '@core/storages/ui';

// components

import { MultiSelect } from '@core/ui/components/MultiSelect';

type Props = {
  className?: string;
  initial: AssetGroup[];
  inputId?: string;
  label?: string;
  name?: string;
  onAppend?: (item: AssetGroup) => void;
  onChange?: (item: AssetGroup[]) => void;
  onRemove?: (item: AssetGroup) => void;
  placeholder?: string;
};

export const SelectAssetGroups: React.FC<Props> = ({
  className,
  initial,
  inputId,
  label,
  name,
  onAppend,
  onChange,
  onRemove,
  placeholder,
}) => {
  const ui = useUI();
  const groups = useAssetGroups({
    locationId: ui.currentFormation,
  });

  return (
    <MultiSelect
      className={className}
      equals={(item1: AssetGroup, item2: AssetGroup) => item1.groupId === item2.groupId}
      id={inputId}
      label={label}
      name={name}
      onAppend={onAppend}
      onItemsChange={onChange}
      onRemove={onRemove}
      placeholder={placeholder}
      present={(item: AssetGroup) => item.name}
      searchable
      source={groups.getData()}
      value={initial}
    />
  );
};
