import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// data

import { commands } from '../commands';
import { useRegions } from '@solutions/utilus/api/data/useRegions';
import { useUI } from '@core/storages/ui';
import { useFormation } from '@solutions/utilus/api/data/useFormation';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Autocomplete } from '@core/ui/components/Autocomplete';
import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListItemButton } from '@core/ui/components/ListItemButton';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { NavLink } from 'react-router-dom';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Search } from '@core/ui/components/Search';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import Settings01Icon from '@assets/icons/line/settings-01.svg?component';
import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  className?: string;
  solution: string;
  close?: () => void;
} & React.HTMLAttributes<HTMLElement>;

export const MapNav: React.FC<Props> = ({ children, className, solution, close, ...props }) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(true);
  const handleDrawerShow = () => {
    setShow(true);
  };
  const handleDrawerHide = () => {
    setShow(false);
  };

  const regions = useRegions();
  const ui = useUI();
  const current = useFormation(ui.currentFormation);
  return (
    <Grid direction='column' className={cn(styles['aside-container'], !show && 'hidden')}>
      <Box className={styles['widgets-container']}>
        <Box className={styles['content-container']}>
          <Box component='header' className={styles['header']}>
            <Grid justifyContent='between' alignItems='center'>
              <Text variant='lg' weight='bold'>
                {t(
                  'solutions.commandCenter.label',
                  'Command Center',
                  'A hub for overseeing and controlling operations.',
                )}
              </Text>
              <IconButton
                ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
                color='default'
                onClick={close}
                size='lg'
                variant='text'
              >
                <XCloseLineIcon />
              </IconButton>
            </Grid>
          </Box>
          <CardContent className={styles['card-content']}>
            <Grid container direction='column' spacing={4}>
              <Grid item>
                <Grid container spacing={2} wrap='wrap'>
                  {[
                    commands.map((item) => (
                      <Grid item lg={6} key={item.id}>
                        <Button
                          className={styles['widget-button']}
                          component={item.url !== 'null' ? NavLink : Button}
                          disabled={item.url === 'null' && true}
                          fullWidth
                          size='lg'
                          to={`/${solution}/${item.url}`}
                          variant='outlined'
                        >
                          <Grid direction='column' alignItems='center' justifyContent='center'>
                            {item.icon}
                            <span className={styles['widget-button-label']}>{item.title}</span>
                          </Grid>
                        </Button>
                      </Grid>
                    )),
                  ]}
                </Grid>
              </Grid>
              <Grid item>
                <Autocomplete
                  placeholder={
                    current?.name ??
                    t('location.selectLocationFromList.label', 'Select location', 'Select location from the list.')
                  }
                >
                  <Box className={styles['search-container']}>
                    <Search />
                  </Box>
                  <Scrollbar className={styles['scrollbar']}>
                    <List dense className={styles['list']}>
                      <ListSubheader variant='menu'>{t('location.regions.label', 'Regions', 'Regions.')}</ListSubheader>
                      {regions?.map((region) => (
                        <React.Fragment key={region.id}>
                          <ListItemButton dense justifyContent='between'>
                            <ListItemText>
                              <Text component='span' weight='bold'>
                                {region.name}
                              </Text>
                            </ListItemText>
                          </ListItemButton>
                          {region.formations.map((formation) => (
                            <ListItemButton key={formation.id} dense justifyContent='between'>
                              <Grid container spacing={2}>
                                <Grid item lg={6}>
                                  <ListItemText>
                                    <Text component='span' weight='bold'>
                                      {formation.name}
                                    </Text>
                                  </ListItemText>
                                </Grid>
                                <Grid item lg={6}>
                                  <ListItemText shrink>
                                    <Text component='span'>{formation.address}</Text>
                                  </ListItemText>
                                </Grid>
                              </Grid>
                            </ListItemButton>
                          ))}
                        </React.Fragment>
                      ))}
                    </List>
                  </Scrollbar>
                </Autocomplete>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Box>
      <Box className={styles['footer']}>
        <CardContent>
          <Button variant='outlined' fullWidth size='lg' startIcon={<Settings01Icon />}>
            {t('solutions.configureScreens.label', 'Configure Screens', 'Screen configuration.')}
          </Button>
        </CardContent>
        <CardContent className={styles['card-content']}>
          <Button
            onClick={() => navigate(`/${solution}`)}
            size='lg'
            startIcon={<ArrowLeftLineIcon className={styles['button']} />}
            variant='text'
          >
            {t('solutions.backToDashboard.label', 'Back to Dashboard', 'Back to Dashboard button or link.')}
          </Button>
        </CardContent>
      </Box>
    </Grid>
  );
};
