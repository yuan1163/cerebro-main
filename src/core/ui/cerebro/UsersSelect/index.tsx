// controllers

import { useUsers } from '@core/storages/controllers/users';

// types

import { User } from '@core/api/types';

// styles

import styles from './styles.module.scss';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { DataSelect } from '@core/ui/components/DataSelect';
import { UserAvatar } from '../UserAvatar';

type Props = {
  className?: string;
  inputId?: string;
  label?: string;
  locationId?: number /* IT IS REQUIRED!!! */;
  onSelect: (user: User | undefined) => void;
  placeholder?: string;
  required?: boolean /* true if we show users with no 'All users' option */;
  value: User | undefined;
};

export const UsersSelect: React.FC<Props> = ({
  className,
  inputId,
  label,
  locationId,
  onSelect,
  placeholder = 'Select user',
  required,
  value,
}) => {
  const users = useUsers({ locationId, fileName: 'avatar' });
  const data = users.getData()?.filter((user) => user.firstName && user.lastName) ?? [];
  const options = required ? data : [undefined, ...data];
  return (
    <DataSelect
      avatarOptions={(user) =>
        user?.files && <Avatar className={styles['avatar']} rounded size='xs' src={user?.files?.[0]?.url} />
      }
      avatarPresent={(user) => <UserAvatar user={user} className={styles['avatar']} rounded size='xs' />}
      className={className}
      id={inputId}
      label={label}
      onChange={(value) => onSelect(value)}
      options={options}
      placeholder={placeholder}
      present={(user) => (user ? `${user.firstName} ${user.lastName}` : placeholder)}
      value={value}
      variant='avatar'
    />
  );
};
