import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

// type

import { LocationsProp } from '@solutions/ems/MassConfiguration/data/locations';
import { SolutionsMasks } from '@core/ui/types';

// components

import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@solutions/ems/MassConfiguration/Components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons

import ClockLineIcon from '@assets/icons/line/clock.svg?component';
import Compass03LineIcon from '@assets/icons/line/compass-03.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import Map01LineIcon from '@assets/icons/line/map-01.svg?component';
import Map02LineIcon from '@assets/icons/line/map-02.svg?component';
import MarkerPin01SolidIcon from '@assets/icons/solid/marker-pin-01.svg?component';

type Props = {
  location: LocationsProp;
  locationColor?: string;
};

export const Profile: React.FC<Props> = ({ location, locationColor = 'default' }) => {
  const locationInfo = [
    {
      icon: <DashboardLineIcon />,
      kicker: t('location.type.label', 'Type', 'Type of location.'),
      title: location.type ? `${location?.type}` : '-',
      show: true,
    },
    {
      icon: <Map01LineIcon />,
      kicker: t('location.street.label', 'Street', 'Street.'),
      title: location?.street || '-',
      show: location.type < 4,
    },
    {
      icon: <Map01LineIcon />,
      kicker: t('location.city.label', 'City', 'City.'),
      title: location?.city || '-',
      show: location.type < 4,
    },
    {
      icon: <Map01LineIcon />,
      kicker: t('location.country.label', 'Country', 'Country.'),
      title: location?.country || '-',
      show: location.type < 4,
    },
    {
      icon: <Map01LineIcon />,
      kicker: t('location.zip.label', 'Zip', 'Zip.'),
      title: location?.zip || '-',
      show: location.type < 4,
    },
    {
      icon: <Compass03LineIcon />,
      kicker: t('location.latitude.label', 'Latitude', 'Latitude.'),
      title: location?.latitude ? `${location?.latitude}` : '-',
      show: location.type < 4,
    },
    {
      icon: <Compass03LineIcon />,
      kicker: t('location.latitude.label', 'Latitude', 'Latitude.'),
      title: location?.longitude ? `${location?.longitude}` : '-',
      show: location.type < 4,
    },
    {
      icon: <ClockLineIcon />,
      kicker: t('location.timeZone.label', 'Time Zone', 'Time Zone.'),
      title: location?.timezone || '-',
      show: location.type < 4,
    },
    {
      icon: <Map02LineIcon />,
      kicker: t(
        'location.parentLocation.label',
        'Parent Location',
        'Higher-level geographical area that contains a subordinate or more specific location.',
      ),
      title: `${location?.parentName} (ID: ${location?.parentId})` || '-',
      show: true,
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' color={locationColor} size='3xl' className={styles['icon']}>
              <MarkerPin01SolidIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline title={location.name} subtitle={`ID: ${location?.locationId}`} size='xxl' />
            </Grid>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t(
                      'general.details.label',
                      'Details',
                      'Details provide in-depth information about a particular subject or topic.',
                    )}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {locationInfo.map((item) => {
                      if (item.show)
                        return (
                          <ListItem dense disablePaddingX key={item.kicker}>
                            <ListItemIcon>
                              <Icon color='secondary' size='lg' variant='tint'>
                                {item.icon}
                              </Icon>
                            </ListItemIcon>
                            <ListItemText disableGutters>
                              <Headline reverse size='sm' subtitle={item.kicker} title={item.title} />
                            </ListItemText>
                          </ListItem>
                        );
                    })}

                    <ListItem dense disablePaddingX key={'Solution'}>
                      <ListItemIcon>
                        <Icon color='secondary' size='lg' variant='tint'>
                          <DashboardLineIcon />
                        </Icon>
                      </ListItemIcon>
                      <ListItemText disableGutters>
                        <Headline
                          reverse
                          size='sm'
                          subtitle={t('solutions.solution.label', 'Solution', 'Solution.')}
                          chip={
                            <Chip color={'primary'} key={location.branchSolutions}>
                              {(location.branchSolutions & SolutionsMasks.cerebro) !== 0 &&
                                t('solutions.pinPoint.label', 'PinPoint', 'Title of PinPoint Solution.')}
                              {(location.branchSolutions & SolutionsMasks.utilus) !== 0 &&
                                t('solutions.utilus.label', 'Utilus', 'Title of Utilus Solution.')}
                              {(location.branchSolutions & SolutionsMasks.ai) !== 0 &&
                                t('solutions.ai.label', 'AI', 'Title of AI Solution.')}
                              {(location.branchSolutions & SolutionsMasks.connect) !== 0 &&
                                t('solutions.connects.label', 'Connects', 'Title of Connects Solution.')}
                              {(location.branchSolutions & SolutionsMasks.ems) !== 0 &&
                                t('solutions.ems.label', 'EMS', 'Title of EMS Solution.')}
                            </Chip>
                          }
                        />
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
    </>
  );
};
