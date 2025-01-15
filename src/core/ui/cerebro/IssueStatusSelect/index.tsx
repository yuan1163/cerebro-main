// utils

import { t } from '@core/utils/translate';

import { IssueStatus } from '@core/api/types';
import { DataSelect } from '@core/ui/components/DataSelect';

type Props = {
  className?: string;
  placeholder?: string;
  value: IssueStatus | undefined;
  onSelect: (user: IssueStatus | undefined) => void;
};

export const IssueStatusSelect: React.FC<Props> = ({ className, placeholder = 'Select status', value, onSelect }) => {
  const options = [undefined, IssueStatus.Open, IssueStatus.InProgress, IssueStatus.Resolved, IssueStatus.Closed];

  const present = (value: IssueStatus | undefined) => {
    switch (value) {
      case IssueStatus.Open:
        return t('status.openStatus.label', 'Open', 'Open status.');
      case IssueStatus.InProgress:
        return t('status.inProgressStatus.label', 'In Progress', 'In Progress status.');
      case IssueStatus.Resolved:
        return t('status.resolvedStatus.label', 'Resolved', 'Resolved status.');
      case IssueStatus.Closed:
        return t('status.closedStatus.label', 'Closed', 'Closed status.');
      default:
        return placeholder;
    }
  };

  return (
    <DataSelect
      className={className}
      onChange={(value) => onSelect(value)}
      options={options}
      placeholder={placeholder}
      present={present}
      value={value}
    />
  );
};
