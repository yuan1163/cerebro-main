import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

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
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons

import CalendarLineIcon from '@assets/icons/line/calendar.svg?component';
import Carbonemission01LineIcon from '@assets/icons/line/carbon-emission-01.svg?component';
import Carbonemission02LineIcon from '@assets/icons/line/carbon-emission-02.svg?component';

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  emissionFactor?: { [key: string]: string } | undefined;
} & React.HTMLAttributes<HTMLElement>;

export const Profile: React.FC<Props> = ({ className, handleEditProfile, emissionFactor, ...props }) => {
  const factorYear: string | undefined = emissionFactor && Object.keys(emissionFactor)[0];
  const factorValue: string | undefined = emissionFactor && Object.values(emissionFactor)[0];

  const emissionFactoryInfo = [
    {
      icon: <CalendarLineIcon />,
      kicker: t('solutions.yearInput.label', 'Year', 'Year.'),
      title: factorYear || '-',
    },
    {
      icon: <Carbonemission02LineIcon />,
      kicker: t('solutions.factorInput.label', 'Factor', 'Factor.'),
      title: factorValue || '-',
    },
  ];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon className={styles['icon']} variant='tint' color={'primary'} size='3xl'>
              <Carbonemission01LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={t('solutions.carbonEmissionFactor.label', 'Carbon emission factor', 'Carbon output rate.')}
                size='xxl'
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item grow>
                <Button fullWidth onClick={handleEditProfile} variant='outlined'>
                  {t('general.edit.label', 'Edit', 'Function that allows to make changes to content or data.')}
                </Button>
              </Grid>
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
                  <List>
                    {emissionFactoryInfo.map((item) => (
                      <ListItem dense disablePaddingX key={item.kicker}>
                        <ListItemIcon>
                          <Icon color='secondary' size='lg' variant='tint'>
                            {item.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText disableGutters>
                          <Headline reverse size='sm' subtitle={item.kicker} title={item.title ?? '–'} />
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
