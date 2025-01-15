import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Link } from '@core/ui/components/Link';
import { NavLink } from 'react-router-dom';

// icons

import BullSolidIcon from '@assets/icons/solid/bull.svg?component';

type Props = {
  categories?: { title?: string; url: string }[];
  disabled?: boolean;
};
export const DrawerButtonMenu: React.FC<Props> = ({ disabled, categories }) => {
  return (
    <div className={styles['container']}>
      {categories?.map((item) => {
        const url = item.url;
        return (
          <NavLink key={item.title} to={url}>
            {({ isActive }) => (
              <Button
                align='start'
                className={styles['button']}
                component='div'
                disabled={item.url === ''}
                fontSize='sm'
                fontWeight={isActive ? 'semibold' : 'medium'}
                fullWidth
                iconColor={isActive ? 'primary' : 'secondary-tint-active'}
                key={item.title}
                size='lg'
                startIcon={<BullSolidIcon />}
                textColor={isActive ? 'primary' : 'typography-secondary'}
                variant='ghost'
              >
                {item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : ''}
              </Button>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
