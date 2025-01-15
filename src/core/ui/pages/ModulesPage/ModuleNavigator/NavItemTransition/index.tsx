import React from 'react';

// utils

import { t } from '@core/utils/translate';

// utils

import { cn } from '@core/utils/classnames';

// styles

import styles from './styles.module.scss';

// components

import { Transition } from '@headlessui/react';

type Props = {
  title?: string;
  className?: string;
  collapseIcon?: React.ReactNode;
  expandeIcon?: React.ReactNode;
  show?: boolean;
  variant?: 'contained' | 'header' | 'footer';
} & React.HTMLAttributes<HTMLElement>;

export const NavItemTransition: React.FC<Props> = ({
  title,
  children,
  className,
  collapseIcon,
  expandeIcon,
  show,
  variant,
  ...props
}) => {
  return (
    <>
      <div
        aria-label={`${title} ${t('general.logo.label', 'Logo', 'Graphic symbol.')}`}
        className={cn(styles['logo-wrapper'], styles[`logo-wrapper-${variant}`])}
      >
        <span className={cn(styles['logo-expanded'], show && styles['logo-expanded-show'])}>{expandeIcon}</span>
        {!show && (
          <Transition
            aria-label={`${title} ${t('general.logo.label', 'Logo', 'Graphic symbol.')}`}
            enter='transition delay-short'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition ease-in-standard duration-shortest'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            show={!show}
            className={cn(styles['logo-collapsed-wrapper'])}
          >
            <span className={styles['logo-collapsed']}>{collapseIcon}</span>
          </Transition>
        )}
      </div>
    </>
  );
};

{
  /* <NavItemTransition
                  collapseIcon={<AppIcon />}
                  expandeIcon={<AppLogo />}
                  show={isShowing}
                  title={t('general.app.label', 'app', 'An app.')}
                  variant='header'
                /> */
}
