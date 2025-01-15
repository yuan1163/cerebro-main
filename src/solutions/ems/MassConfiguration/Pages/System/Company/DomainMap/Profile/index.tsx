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
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons

import SearchMdLineIcon from '@assets/icons/line/search-md.svg?component';
import Map01LineIcon from '@assets/icons/line/map-01.svg?component';

// type

import { Properties } from '@solutions/ems/api/entities/locations';

type Props = {
  className?: string;
  handleEditProfile?: () => void;
  domainMapZoomInSize?: Partial<Properties>;
} & React.HTMLAttributes<HTMLElement>;

export const Profile: React.FC<Props> = ({ className, handleEditProfile, domainMapZoomInSize, ...props }) => {
  const domainMapInfo = [
    {
      icon: <SearchMdLineIcon />,
      kicker: t('ems.valueInput.label', 'Value', 'Value field.'),
      title: domainMapZoomInSize?.value || '-',
    },
  ];

  // snackbar

  //   const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  //   const handleShowSnackbar = () => {
  //     setSnackOpen(true);
  //     setTimeout(() => {
  //       setSnackOpen(false);
  //     }, 2500);
  //   };

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon className={styles['icon']} variant='tint' color={'primary'} size='3xl'>
              <Map01LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline
                title={t('map.editDomainMapZoom.label', 'Edit domain map zoom in size', 'Card header for Domain Map.')}
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
                    {domainMapInfo.map((item) => (
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
      {/* <Toast isShowing={snackOpen} message='Copied to clipboard!' /> */}
    </>
  );
};
