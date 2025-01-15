import React from 'react';
import { Command } from '@core/ui/types';

// storages
import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Link } from '@core/ui/components/Link';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';

// icons
import LinkExternal01LineIcon from '@assets/icons/line/link-external-01.svg?component';

type Props = {
  command: Command;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const CommandCenterCard: React.FC<Props> = ({ children, command, ...props }) => {
  const ui = useUI();
  return (
    <Card color='surface-02' fullWidth {...props}>
      <CardContent className={styles['header']}>
        <Grid alignItems='center'>
          <Icon className={styles['icon']} color='secondary' size='xl' variant='soft'>
            {command.icon}
          </Icon>
          <Grid direction='column'>
            <Text component='h3' variant='base' weight='bold'>
              {command.title}
            </Text>
            <Text color='typography-secondary' variant='xs'>
              {command.subtitle}
            </Text>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent className={styles['action']}>
        <Stack direction='row' spacing={2}>
          <Button component={Link} fullWidth to={command.url} variant='outlined' disabled={command.url === 'null'}>
            {t('general.view.label', 'View', 'Button or link that allows to access additional information.')}
          </Button>
          <IconButton
            component={Link}
            target='_blank'
            to={command.url}
            variant='outlined'
            disabled={command.url === 'null'}
          >
            <LinkExternal01LineIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
