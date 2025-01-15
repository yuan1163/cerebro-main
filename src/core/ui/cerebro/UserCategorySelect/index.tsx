// utils

import { t } from '@core/utils/translate';

// storage

import { useUI } from '@core/storages/ui';

// types

import { Solutions } from '@core/ui/types';
import { UserCategory } from '@core/api/types';

// components

import { DataSelect } from '@core/ui/components/DataSelect';

type Props = {
  className?: string;
  disabled?: boolean;
  label?: string;
  onSelect: (user: UserCategory) => void;
  placeholder?: string;
  value: UserCategory;
};

export const UserCategorySelect: React.FC<Props> = ({
  className,
  disabled,
  label,
  onSelect,
  placeholder = t(
    'general.selectCategory.label',
    'Select Category',
    'Prompt instructs users to choose a specific category from a list.',
  ),
  value,
}) => {
  let options = [UserCategory.Administrator, UserCategory.Contact];
  const ui = useUI();
  if (ui.activeSolution === Solutions.cerebro) {
    options.push(UserCategory.Trackable);
  }

  const present = (value: UserCategory) => {
    switch (value) {
      case UserCategory.Administrator:
        return t('user.admin.label', 'Administrator', 'The main controller & manager.');
      case UserCategory.Contact:
        return t('user.contact.label', 'Contact', 'User contact.');
      case UserCategory.Trackable:
        return t(
          'asset.trackablePerson.label',
          'Trackable Person',
          'An individual whose movements or activities can be monitored or followed.',
        );
    }
  };

  return (
    <DataSelect
      className={className}
      disabled={disabled}
      label={label}
      onChange={(value) => onSelect(value)}
      options={options}
      placeholder={placeholder}
      present={present}
      value={value}
    />
  );
};
