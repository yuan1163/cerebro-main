// types

import { IssuePriority } from '@core/api/types';

// components

import { DataSelect } from '@core/ui/components/DataSelect';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpDoubleLineIcon from '@assets/icons/line/chevron-up-double.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import EqualLineIcon from '@assets/icons/line/equal.svg?component';

type Props = {
  className?: string;
  inputId?: string;
  label?: string;
  onSelect: (user: IssuePriority | undefined) => void;
  placeholder?: string;
  value: IssuePriority | undefined;
};

export const IssuePrioritySelect: React.FC<Props> = ({
  className,
  inputId,
  label,
  onSelect,
  placeholder = 'Select priority',
  value,
}) => {
  const options = [undefined, IssuePriority.Low, IssuePriority.Medium, IssuePriority.High, IssuePriority.Critical];

  const present = (value: IssuePriority | undefined) => {
    switch (value) {
      case IssuePriority.Low:
        return 'Low';
      case IssuePriority.Medium:
        return 'Medium';
      case IssuePriority.High:
        return 'High';
      case IssuePriority.Critical:
        return 'Critical';
      default:
        return placeholder;
    }
  };

  function getPriority(priority: IssuePriority) {
    switch (priority) {
      case IssuePriority.Critical:
        return { label: 'Critical', color: 'red', icon: <ChevronUpDoubleLineIcon /> };
      case IssuePriority.High:
        return { label: 'High', color: 'orange', icon: <ChevronUpLineIcon /> };
      case IssuePriority.Medium:
        return { label: 'Medium', color: 'amber', icon: <EqualLineIcon /> };
      case IssuePriority.Low:
        return { label: 'Low', color: 'blue', icon: <ChevronDownLineIcon /> };
    }
  }

  return (
    <DataSelect
      id={inputId}
      className={className}
      label={label}
      onChange={(value) => onSelect(value)}
      options={options}
      placeholder={placeholder}
      present={present}
      startIcon={(item) => getPriority(item)?.icon}
      startIconColor={(item) => getPriority(item)?.color}
      value={value}
    />
  );
};
