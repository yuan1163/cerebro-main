import React from 'react';

// styles

import cn from 'classnames';
import styles from './styles.module.scss';

// types

import { ColorPalette, PaletteString } from '@core/api/typesDesignSystem';

// components

import AvatarFallback from '@core/ui/components/AvatarFallback';

// icons

import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';
import User02SolidIcon from '@assets/icons/solid/user-02.svg?component';

type Props = {
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | ColorPalette | PaletteString;
  disabled?: boolean;
  firstName?: string;
  lastName?: string;
  name?: string;
  rounded?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  src?: string;
  stillLife?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'color'>;

export const Avatar: React.FC<Props> = ({
  children,
  className,
  color = 'default',
  disabled = false,
  firstName,
  lastName,
  name,
  rounded = false,
  size = 'md',
  src,
  stillLife = false,
  ...props
}) => {
  let firstLetter = firstName?.charAt(0);
  let secondLetter = lastName?.charAt(0);
  let nameFirstLetter = name?.charAt(0);
  let altContent;

  if (firstLetter && secondLetter && size !== 'xxs' && size !== 'xs') {
    altContent = firstLetter + secondLetter;
  } else if (firstLetter && secondLetter && (size === 'xxs' || size === 'xs')) {
    altContent = firstLetter;
  } else if (firstLetter && !secondLetter) {
    altContent = firstLetter;
  } else if (!firstLetter && !secondLetter) {
    altContent = '';
  } else if (secondLetter && !firstLetter) {
    altContent = secondLetter;
  } else if (name) {
    altContent = nameFirstLetter;
  }

  let avatarContent;

  // !src

  if (src) {
    avatarContent = (
      <AvatarFallback alt={altContent ?? ''} className={styles['avatar-image']} src={src} stillLife={stillLife} />
    );
  } else if (!src && altContent) {
    avatarContent = altContent;
  } else if (!src && stillLife) {
    avatarContent = <Image05SolidIcon />;
  } else {
    avatarContent = <User02SolidIcon className={styles['avatar-icon']} />;
  }

  return (
    <div
      className={cn(
        disabled && styles['avatar-disabled'],
        styles['avatar'],
        styles[`avatar-color-${color}`],
        rounded && styles['avatar-rounded'],
        styles[`avatar-size-${size}`],
        className,
      )}
      {...props}
    >
      {avatarContent}
    </div>
  );
};
