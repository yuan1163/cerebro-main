import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const ListDivider: React.FC<Props> = ({ children, className, ...props }) => {
  return <li className={styles['list-divider']} role='separator' tabIndex={-1} />;
};
