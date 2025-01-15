import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// storages

import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// types

import { Solutions } from '@core/ui/types';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AppBar } from '@core/ui/components/AppBar';
import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { Decorator } from '@core/ui/components/Decorator';
import { Grid } from '@core/ui/components/Grid';
import { Heading } from '@core/ui/components/Heading';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Menu } from '@core/ui/components/Menu';
import { MenuList } from '@core/ui/components/MenuList';
import { Paper } from '@core/ui/components/Paper';
import { SolutionsSelector } from '@core/ui/components/SolutionsSelector';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { TimeInfo } from '@core/ui/components/TimeInfo';
import { Toolbar } from '@core/ui/components/Toolbar';
import { WeatherInfo } from '@core/ui/components/WeatherInfo';
import { LocationInfo } from './LocationInfo';
import { UserInfo } from './UserInfo';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';
import Bell02LineIcon from '@assets/icons/line/bell-02.svg?component';
import DotsGridRectanglesLineIcon from '@assets/icons/line/dots-grid-rectangles.svg?component';

type Props = {
  backLink?: boolean;
  className?: string;
  icon?: React.ReactNode;
  solutionSelector?: boolean;
  solutionsDomainLink?: boolean;
  title?: string;
  widgets?: boolean;
};

export const Header: React.FC<Props> = ({
  backLink,
  className,
  icon,
  solutionsDomainLink,
  solutionSelector = true,
  title,
  widgets = true,
}) => {
  let navigate = useNavigate();
  const location = useLocation();

  const ui = useUI();
  const locations = useLocations();

  const [openIssues, setOpenIssues] = useState(false);

  // BACK

  const authStore = useAuth();

  useEffect(() => {
    if (location.pathname !== '/solutions' || authStore.hasNavigatedPostLogin) {
      authStore.setNavigationPerformedPostLogin(true);
    }
  }, [location.pathname, authStore]);

  // LOCALSTORAGE

  const [activeSolution, setActiveSolution] = useState('');

  const handleBackNavigateClick = () => {
    navigate(`/${activeSolution}`);
  };

  useEffect(() => {
    const storedActiveSolution = localStorage.getItem('activeSolution') as Solutions;
    if (storedActiveSolution) {
      setActiveSolution(storedActiveSolution);
    }
  }, []);

  const handleBackLinkNavigateClick = () => {
    navigate(-1);
  };

  return (
    <AppBar className={cn(className)}>
      <Toolbar disableGutters>
        <div className={styles['title-content-container']}>
          <div className={styles['title-content']}>
            {!backLink && !solutionsDomainLink && (
              <Icon color='secondary' size='xl' variant='tint'>
                {icon}
              </Icon>
            )}
            {authStore.hasNavigatedPostLogin && backLink && (
              <Icon color='secondary' component='button' onClick={handleBackLinkNavigateClick} size='xl' variant='tint'>
                <ArrowLeftLineIcon />
              </Icon>
            )}
            {authStore.hasNavigatedPostLogin && solutionsDomainLink && (
              <Icon color='secondary' component='button' onClick={handleBackNavigateClick} size='xl' variant='tint'>
                <DotsGridRectanglesLineIcon />
              </Icon>
            )}
            <Text component='h1' variant='2xl' weight='semibold'>
              {title}
            </Text>
          </div>
        </div>

        <Stack className={styles['widgets-container']} direction='row' spacing={3}>
          {widgets && (
            <Grid alignItems='center' container spacing={5}>
              {locations.getElementById(ui.currentFormation)?.timezone && (
                <Grid item>
                  {/* <WeatherInfo /> */}
                  <TimeInfo timezone={locations.getElementById(ui.currentFormation)?.timezone} />
                </Grid>
              )}
              <Grid item>
                <LocationInfo />
              </Grid>
            </Grid>
          )}

          {solutionSelector && <SolutionsSelector />}
          <Menu
            disableGutters
            button={
              <IconButton
                ariaLabel={t('user.notifications.label', 'Notifications', 'Notifications.')}
                component='div'
                color='icon-secondary'
                decoratorSize='lg'
                onClick={() => setOpenIssues(true)}
                size='md'
                variant='ghost'
              >
                <Bell02LineIcon />
              </IconButton>
            }
            placement='bottom-end'
          >
            {/* DATA */}
            {ui.activeSolution !== 'ems' && (
              <MenuList>
                <Card width={29}>
                  <CardHeader borderBottom>
                    <Grid container alignItems='baseline' justifyContent='between' fullWidth spacing={2}>
                      <Grid item>
                        <Text component='span' variant='base' weight='semibold'>
                          {t('user.notifications.label', 'Notifications', 'Notifications.')}
                        </Text>
                      </Grid>
                      <Grid item>
                        <Button variant='link'>
                          {t(
                            'general.markAllIsRead.label',
                            'Mark all is read',
                            "Indicates the user's intention to mark all items as read.",
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardHeader>
                  <CardContent>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Avatar rounded size='xl' />
                      </Grid>
                      <Grid item grow>
                        <Grid container direction='column' spacing={2}>
                          {/* DATA */}

                          <Grid item>
                            <Grid container direction='column'>
                              {/* TIME */}

                              <Grid item>
                                <Grid container alignItems='center' justifyContent='between' spacing={2}>
                                  <Grid item grow>
                                    <Grid container spacing={2}>
                                      <Grid item>
                                        <Text
                                          component='span'
                                          overflow='hidden'
                                          textOverflow='ellipsis'
                                          variant='sm'
                                          weight='semibold'
                                          whiteSpace='nowrap'
                                        >
                                          Jenny Wilson commented on issue
                                        </Text>
                                      </Grid>
                                      <Grid item>
                                        <Text
                                          color='typography-tertiary'
                                          component='span'
                                          overflow='hidden'
                                          textOverflow='ellipsis'
                                          variant='sm'
                                          whiteSpace='nowrap'
                                        >
                                          5 min ago
                                        </Text>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <LegendMarker color='primary' disableGutters />
                                  </Grid>
                                </Grid>
                              </Grid>

                              {/* ISUUE */}

                              <Grid item>
                                <Text variant='sm'>Bring X-ray machine back from Admission room</Text>
                              </Grid>

                              {/* NUMBER */}

                              <Grid item>
                                <Text color='typography-tertiary' variant='xs'>
                                  CLR-1234 • {t('status.inProgressStatus.label', 'In Progress', 'In Progress status.')}
                                </Text>
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* CHIPS */}
                          <Grid item>
                            <Grid alignItems='center' container spacing={1}>
                              <Grid item>
                                <Chip color='violet' lineThrough uppercase>
                                  {t('status.inProgressStatus.label', 'In Progress', 'In Progress status.')}
                                </Chip>
                              </Grid>
                              <Grid item>
                                <Decorator color='icon-secondary'>
                                  <ArrowRightLineIcon />
                                </Decorator>
                              </Grid>
                              <Grid item>
                                <Chip color='teal' uppercase>
                                  {t('status.resolvedStatus.label', 'Resolved', 'Resolved status.')}
                                </Chip>
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* DESCRIPTION */}
                          <Grid item>
                            <Paper color='surface-02'>
                              <CardContent size='xs'>
                                <Text variant='sm'>
                                  {'@John Maxwell Create a ticketing system for the Cerebro which can be used w/ different DX solutions, and became the universal method to assign and track issues within'
                                    .substring(0, 88)
                                    .concat('...')}
                                </Text>
                              </CardContent>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </MenuList>
            )}
          </Menu>

          <UserInfo />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
