import React from 'react';

// styles
import styles from './styles.module.scss';
import { cn } from '@core/utils/classnames';

// Components
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

type Props = {
  title?: string;
  subTitle?: string | null;
  icon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ItemButton: React.FC<Props> = ({ title, icon, subTitle, disabled = false, selected = false, onClick }) => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      className={cn(styles['item-button-container'], disabled && styles['disabled'], selected && styles['selected'])}
      // spacing={3}
      onClick={onClick}
    >
      <Grid item>
        <Icon size={'3xl'} className={styles['icon']}>
          {icon}
        </Icon>
      </Grid>
      {title && (
        <Grid item>
          <Text weight='semibold' className={styles['title-text']}>
            {title}
          </Text>
        </Grid>
      )}
      {subTitle && (
        <Grid item>
          <Text component='time' variant='xs' color={'typography-tertiary'} className={styles['subTitle-text']}>
            {subTitle}
          </Text>
        </Grid>
      )}
    </Grid>
  );
};
