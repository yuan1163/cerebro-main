import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Icon } from '@core/ui/components/Icon';

// icons

import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

type Props = {
  className?: string;
  separator?: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>;

export const Breadcrumbs: React.FC<Props> = ({ children, className, separator }) => {
  const childrenArray = React.Children.toArray(children as React.ReactNode);
  return (
    <nav className={styles['breadcrumbs']}>
      <ol className={styles['breadcrumbs-ol']}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            <li className={styles['breadcrumbs-li']}>{child}</li>
            {index < childrenArray.length - 1 && (
              <li aria-hidden='true' className={styles['breadcrumbs-separator']}>
                <Icon color='icon-quaternary' size='sm' variant='plain'>
                  {separator || <ChevronRightLineIcon />}
                </Icon>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
