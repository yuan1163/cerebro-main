import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  title?: string;
} & React.HTMLAttributes<HTMLUListElement>;

export const ListItemIconHeadline: React.FC<Props> = ({ children, className, icon, subtitle, title, ...props }) => {
  return (
    <ListItem dense disablePaddingX>
      <ListItemIcon>
        <Icon color='secondary' size='lg' variant='tint'>
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText disableGutters>
        <Grid direction='column'>
          <Text variant='sm' weight='medium'>
            {title}
          </Text>
          <Text color='typography-secondary' variant='sm'>
            {subtitle}
          </Text>
        </Grid>
      </ListItemText>
    </ListItem>
  );
};
