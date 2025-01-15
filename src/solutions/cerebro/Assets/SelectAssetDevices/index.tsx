// types

import { Device } from '@core/api/types';

// storages

import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useDevices } from '@core/storages/controllers/devices';
import { useUI } from '@core/storages/ui';

// components

import { MultiSelect } from '@core/ui/components/MultiSelect';

type Props = {
  className?: string;
  disabled?: boolean;
  initial: Device[];
  inputId?: string;
  label?: string;
  name?: string;
  onAppend?: (item: Device) => void;
  onChange?: (item: Device[]) => void;
  onRemove?: (item: Device) => void;
  placeholder?: string;
};

export const SelectAssetDevices: React.FC<Props> = ({
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
  const devices = useDevices({
    locationId: ui.currentFormation,
  });

  const trackers = devices.hasData() ? devices.getData().filter((device) => device.deviceType === 102) : [];

  return (
    <MultiSelect
      className={className}
      equals={(item1: Device, item2: Device) => item1.deviceId === item2.deviceId}
      id={inputId}
      label={label}
      name={name}
      onAppend={onAppend}
      onItemsChange={onChange}
      onRemove={onRemove}
      placeholder={placeholder}
      present={(item: Device) => item.deviceId}
      searchable
      source={trackers}
      value={initial}
    />
  );
};
