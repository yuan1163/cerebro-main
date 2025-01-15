import { Asset } from '@core/api/types';
import { Avatar } from '@core/ui/components/Avatar';

// types

import { ColorPalette, PaletteString } from '@core/api/typesDesignSystem';
import { useImage } from '@core/storages/controllers/assets';

type Props = {
  asset?: Partial<Asset>;
  className?: string;
  color?: 'default' | ColorPalette | PaletteString;
  disabled?: boolean;
  rounded?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  stillLife?: boolean;
};

export const AssetImage: React.FC<Props> = ({ asset, className, color, disabled, rounded, size, stillLife }) => {
  const avatar = useImage(asset);

  return (
    <Avatar
      src={avatar.getUrl()}
      name={asset?.name}
      className={className}
      color={color}
      disabled={disabled}
      rounded={rounded}
      size={size}
      stillLife={stillLife}
    />
  );
};
