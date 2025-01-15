import moment from 'moment';
import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles
import styles from './styles.module.scss';

// type
import { Process } from '@solutions/ems/Reporting/data/process';
import { ProcessHistory } from '@solutions/ems/Reporting/data/processHistory';
import { Unit } from '@solutions/ems/Reporting/data/unit';

// components
import { Button } from '@core/ui/components/Button';
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
import { Text } from '@core/ui/components/Text';

// icons
import ClockLineIcon from '@assets/icons/line/clock.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

type Props = {
  handleEditProfile?: () => void;
  processHistory: ProcessHistory;
  unit: Unit | undefined;
  process: Process | undefined;
};

export const Profile: React.FC<Props> = ({ processHistory, unit, process, handleEditProfile }) => {
  const processHistoryInfos = [
    {
      icon: <Server01LineIcon />,
      kicker: t('asset.deviceID.label', 'Device ID', 'Device ID.'),
      title: processHistory ? `${processHistory.deviceId}` : '-',
      show: true,
    },
    {
      icon: <Server01LineIcon />,
      kicker: t('asset.partIndex.label', 'Part Index', 'Part Index.'),
      title: processHistory ? `${processHistory.partIndex}` : '-',
      show: true,
    },
    {
      icon: <LayersThree01LineIcon />,
      kicker: t('general.amount.label', 'Amount', 'Amount.'),
      title: processHistory ? `${processHistory.unitsNumber}` : '-',
      show: true,
    },
    {
      icon: <ClockLineIcon />,
      kicker: t('general.startDate.label', 'Start date', 'Start date.'),
      title: processHistory ? `${moment(processHistory.startDateMs).format('YYYY-MM-DD HH:mm:ss')}` : '-',
      show: true,
    },
    {
      icon: <ClockLineIcon />,
      kicker: t('general.endDate.label', 'End date', 'End date.'),
      title: processHistory ? `${moment(processHistory.endDateMs).format('YYYY-MM-DD HH:mm:ss')}` : '-',
      show: true,
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' size='3xl' className={styles['icon']}>
              <Settings01LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={unit && unit?.name ? unit.name : 'n/a'}
                subtitle={process && process?.name ? process.name : 'n/a'}
                size='xxl'
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item grow>
              <Button fullWidth onClick={handleEditProfile} variant='outlined'>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent scrollable>
        <Scrollbar>
          <Grid container direction='column' spacing={2}>
            <Grid item grow>
              <Grid direction='column'>
                <Grid item>
                  <Text variant={'2xl'} weight='semibold'>
                    {processHistory.energy ? Number.parseFloat(String(processHistory.energy)).toFixed(2) : '-'}{' '}
                    {t('ems.kWh.label', 'kWh', 'A unit measuring energy consumption over time.')}
                  </Text>
                </Grid>
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
                    {processHistoryInfos.map((info) => (
                      <ListItem dense disablePaddingX key={info.kicker}>
                        <ListItemIcon>
                          <Icon color='secondary' size='lg' variant='tint'>
                            {info.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText disableGutters>
                          <Headline reverse size='sm' subtitle={info.kicker} title={info.title} />
                        </ListItemText>
                      </ListItem>
                    ))}
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
