import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles
import styles from './styles.module.scss';

// type
import { DevicePartProps, DeviceProps } from '@solutions/ems/MassConfiguration/data/devices';

// components
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
// import { Headline } from '@core/ui/components/Headline';
import { CardContent } from '@core/ui/components/CardContent';
import { Headline } from '@core/ui/components/Headline';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons
import Building07LineIcon from '@assets/icons/line/building-07.svg?component';
import Dataflow04LineIcon from '@assets/icons/line/dataflow-04.svg?component';
import Edit03LineIcon from '@assets/icons/line/edit-03.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';

type Props = {
  device: DevicePartProps;
};

export const Profile: React.FC<Props> = ({ device }) => {
  const deviceInfo = [
    {
      icon: <Building07LineIcon />,
      kicker: t('location.ownerLocation.label', 'Owner Location', 'Location associated with the legal owner.'),
      title: `${device?.ownerLocationName} (ID: ${device.ownerLocationId})` || '-',
      show: true,
    },
    {
      icon: <Building07LineIcon />,
      kicker: t(
        'location.partLocation.label',
        'Part Location',
        'Specific place within a larger structure where a component is situated.',
      ),
      title: `${device?.partLocationName} (ID: ${device.partLocationId})` || '-',
      show: true,
    },
    {
      icon: <Edit03LineIcon />,
      kicker: t('general.description.label', 'Description', 'Outline of a particular item or subject.'),
      title: device?.description || '-',
      show: true,
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' color={'primary'} size='3xl' className={styles['icon']}>
              <Server01LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={device.deviceId}
                subtitle={`Index: ${device.index ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}`}
                size='xxl'
              />
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
                    {deviceInfo.map((item) => {
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
