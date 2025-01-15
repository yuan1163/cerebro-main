import { User } from '@core/api/types';
import { Avatar } from '@core/ui/components/Avatar';

// types

import { ColorPalette, PaletteString } from '@core/api/typesDesignSystem';
import { useAvatar } from '@core/storages/controllers/users';

type Props = {
  user?: Partial<User>;
  className?: string;
  color?: 'default' | ColorPalette | PaletteString;
  disabled?: boolean;
  rounded?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  stillLife?: boolean;
};

export const UserAvatar: React.FC<Props> = ({ user, className, color, disabled, rounded, size, stillLife }) => {
  const avatar = useAvatar(user);

  return (
    <Avatar
      className={className}
      color={color}
      disabled={disabled}
      firstName={user?.firstName}
      lastName={user?.lastName}
      name={`${user?.firstName} ${user?.lastName}`}
      rounded={rounded}
      size={size}
      src={avatar.getUrl()}
      stillLife={stillLife}
    />
  );
};
