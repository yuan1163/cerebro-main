import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { CardContent } from '@core/ui/components/CardContent';
import { Text } from '@core/ui/components/Text';
import { CircularProgress } from '@core/ui/components/CircularProgress';

type Props = {
  action?: React.ReactNode;
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  avatar?: React.ReactNode;
  borderBottom?: boolean;
  children?: React.ReactNode;
  className?: string;
  disablePaddingBottom?: boolean;
  headerContentSize?: 'sm' | 'md';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  titleCaption?: string | number;
} & React.HTMLAttributes<HTMLElement>;

export const CardHeader: React.FC<Props> = ({
  action,
  alignItems,
  avatar,
  borderBottom = false,
  children,
  className,
  disablePaddingBottom = false,
  headerContentSize = 'md',
  justifyContent,
  size = 'sm',
  title,
  titleCaption,
  ...props
}) => {
  const renderTitle = (title?: string, titleCaption?: string | number) => {
    if (!title) return null;

    return (
      <div className={styles['card-header-content']}>
        <div className={styles['card-header-title-container']}>
          <Text
            className={styles['card-header-title']}
            component='h3'
            variant={headerContentSize === 'sm' ? 'base' : 'lg'}
            weight='semibold'
          >
            {title}
          </Text>
          {titleCaption !== null && titleCaption !== undefined ? (
            <Badge className={styles['card-header-title-caption']} color='secondary' size='md' variant='tint'>
              {titleCaption}
            </Badge>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  };

  return (
    <CardContent
      alignItems={alignItems}
      borderBottom={borderBottom}
      className={cn(styles['card-header'], className)}
      disablePaddingBottom={disablePaddingBottom}
      justifyContent={justifyContent}
      size={size}
    >
      {avatar && <div className={styles['card-header-avatar']}>{avatar}</div>}
      {renderTitle(title, titleCaption)}
      {children && (
        <div
          className={cn(
            styles['card-header-middle'],
            alignItems && `items-${alignItems}`,
            justifyContent && `justify-${justifyContent}`,
          )}
        >
          {children}
        </div>
      )}
      {action}
    </CardContent>
  );
};
