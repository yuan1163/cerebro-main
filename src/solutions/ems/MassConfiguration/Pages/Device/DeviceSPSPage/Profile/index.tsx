import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

// type

import { SPSProps } from '@solutions/ems/MassConfiguration/data/devices';

// components

// import { Headline } from '@core/ui/components/Headline';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { Headline } from '@core/ui/components/Headline';
import { Icon } from '@core/ui/components/Icon';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons

import Building07LineIcon from '@assets/icons/line/building-07.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import Dataflow04LineIcon from '@assets/icons/line/dataflow-04.svg?component';
import Key01LineIcon from '@assets/icons/line/key-01.svg?component';
import Lightning01LineIcon from '@assets/icons/line/lightning-01.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';
import Server03LineIcon from '@assets/icons/line/server-03.svg?component';

type Props = {
  device: SPSProps;
  // locationColor?: string;
};

export const Profile: React.FC<Props> = ({ device }) => {
  const basicInfo = [
    {
      icon: <DashboardLineIcon />,
      kicker: t('asset.SPBType.label', 'SPB type', 'SPB type.'),
      title: device.SPBType ? `${device.SPBType}` : '-',
      show: true,
    },
    {
      icon: <Server01LineIcon />,
      kicker: t('asset.deviceID.label', 'Device ID', 'Device ID.'),
      title: device?.deviceId || '-',
      show: true,
    },
    {
      icon: <Key01LineIcon />,
      kicker: t(
        'general.localServerID.label',
        'Local server ID',
        'Refers to a unique identifier assigned to a server within a local network or environment. It helps distinguish one server from another in a localized setting.',
      ),
      title: device.localServerId ? `${device.localServerId}` : '-',
      show: true,
    },
    {
      icon: <Server03LineIcon />,
      kicker: t('asset.gatewayIP.label', 'Gateway IP', 'Gateway IP'),
      title: device.gatewayIP ? `${device.gatewayIP}` : '-',
      show: true,
    },
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
  ];

  const circuitInfo = [
    {
      icon: <Lightning01LineIcon />,
      kicker: t('asset.devicePhase.label', 'Phase', 'Device phase.'),
      title: device.phase ? `${device.phase}` : '-',
      show: true,
    },
    {
      icon: <Lightning01LineIcon />,
      kicker: t('asset.devicePTRatio.label', 'PT-Ratio', 'Device PT-Ratio.'),
      title: device.PTRatio ? `${device.PTRatio}` : '-',
      show: true,
    },
    {
      icon: <Lightning01LineIcon />,
      kicker: t('asset.deviceCTRatio.label', 'CT-Ratio', 'Device CT-Ratio.'),
      title: device.CTRatio ? `${device.CTRatio}` : '-',
      show: true,
    },
    {
      icon: <Lightning01LineIcon />,
      kicker: t('asset.deviceNFB.label', 'NFB', 'Device NFB.'),
      title: device.NFB ? `${device.NFB}` : '-',
      show: true,
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' color={'primary'} size='3xl' className={styles['icon']}>
              <Dataflow04LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline title={device.name} size='xxl' />
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
                    {t('solutions.basicInformation.label', 'Basic information', 'Basic information header.')}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {basicInfo.map((item) => {
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
            <Grid item>
              <Grid direction='column'>
                <Grid item>
                  <ListSubheader disableGutters>
                    {t(
                      'asset.circuitInformation.label',
                      'Circuit Information',
                      'Details about a particular electrical pathway.',
                    )}
                  </ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {circuitInfo.map((item) => {
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
