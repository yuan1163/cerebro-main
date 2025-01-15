import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AppBar } from '@core/ui/components/AppBar';
import { Grid } from '@core/ui/components/Grid';
import { Heading } from '@core/ui/components/Heading';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LocationInfo } from './LocationInfo';
import { SolutionsSelector } from '@core/ui/components/SolutionsSelector';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { TimeInfo } from '@core/ui/components/TimeInfo';
import { Toolbar } from '@core/ui/components/Toolbar';
import { UserInfo } from '@core/ui/cerebro/Header/UserInfo';
import { WeatherInfo } from '@core/ui/components/WeatherInfo';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import Bell02LineIcon from '@assets/icons/line/bell-02.svg?component';

type Props = {
  backLink?: boolean;
  className?: string;
  disableGutters?: boolean;
  icon?: React.ReactNode;
  title?: string;
  widget?: boolean;
};

export const Header: React.FC<Props> = ({
  backLink = false,
  className,
  disableGutters = false,
  icon,
  title,
  widget = true,
}) => {
  // route
  let navigate = useNavigate();

  const ui = useUI();
  const locations = useLocations();

  return (
    <AppBar className={className}>
      <Toolbar disableGutters>
        <div className={styles['title-content-container']}>
          <div className={styles['title-content']}>
            {!backLink ? (
              <Icon color='secondary' size='xl' variant='tint'>
                {icon}
              </Icon>
            ) : (
              <IconButton color='icon-secondary' onClick={() => navigate(-1)} size='lg' variant='tint'>
                <ArrowLeftLineIcon />
              </IconButton>
            )}
            <Text component='h1' variant='2xl' weight='semibold'>
              {title}
            </Text>
          </div>
        </div>
        <Stack className={styles['widgets-container']} direction='row' spacing={3}>
          {widget && (
            <Grid alignItems='center' container spacing={5}>
              {locations.getElementById(ui.currentFormation)?.timezone && (
                <Grid item>
                  <TimeInfo />
                  {/* <WeatherInfo /> */}
                </Grid>
              )}
              <Grid item>
                <LocationInfo />
              </Grid>
            </Grid>
          )}
          <SolutionsSelector />
          <IconButton ariaLabel='Notifications' decoratorSize='lg' color='icon-secondary' size='md' variant='ghost'>
            <Bell02LineIcon />
          </IconButton>
          <UserInfo />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
