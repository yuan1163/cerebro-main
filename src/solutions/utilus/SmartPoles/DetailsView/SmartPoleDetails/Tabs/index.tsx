import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Button } from '@core/ui/components/Button';
import { Stack } from '@core/ui/components/Stack';
import { CardContent } from '@core/ui/components/CardContent';
import { Box } from '@core/ui/components/Box';

type Props = {
  className?: string;
  tabs: {
    title?: string | null;
  }[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
};

export const Tabs: React.FC<Props> = ({ tabs, currentTab, setCurrentTab, className }) => {
  return (
    <Box className={cn(styles['tab'], className)}>
      <CardContent className={styles['card-content']}>
        <Stack direction='row' spacing={6}>
          {tabs.map((tab, index) => (
            <Grid item key={index}>
              <Button
                className={cn(styles['button'], index === currentTab ? styles['active'] : styles['inactive'])}
                onClick={() => setCurrentTab(index)}
                size='lg'
                variant='ghost'
              >
                {tab.title}
              </Button>
              <span className={index === currentTab ? styles.active : undefined} />
            </Grid>
          ))}
        </Stack>
      </CardContent>
    </Box>
  );
};
