import React, { useState } from 'react';

// context

import { DrawerContext } from '@core/context/DrawerContext';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Container } from '@core/ui/components/Container';
import { Grid } from '@core/ui/components/Grid';

type Props = {
  children?: React.ReactNode;
  navigator: React.ReactNode;
};

export const ModulePageLayout: React.FC<Props> = ({ navigator, children }) => {
  // DRAWER

  let [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const toggleDrawerState = (newMode: boolean) => {
    setIsDrawerExpanded(newMode);
  };

  return (
    <DrawerContext.Provider value={{ isDrawerExpanded: isDrawerExpanded, toggleDrawerState }}>
      <div
        className={cn(
          styles['container'],
          isDrawerExpanded ? styles['container-drawer-expanded'] : styles['container-drawer-collapsed'],
          'scrollbar-none',
        )}
      >
        {navigator}
        <Grid id='content' component='main' className={cn(styles['main'], 'scrollbar-none')}>
          {/* <Grid id='content' component='main' className={styles['main']} style={{ height: '100vh' }}> */}
          <Container maxWidth={false} fixed>
            <Grid direction='column' className={cn(styles['wrapper'], 'scrollbar-none overflow-auto')}>
              {children}
            </Grid>
          </Container>
        </Grid>
      </div>
    </DrawerContext.Provider>
  );
};
