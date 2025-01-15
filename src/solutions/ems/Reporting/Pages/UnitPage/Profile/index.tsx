import React from 'react';

// styles
import styles from './styles.module.scss';

// components
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircularProgress } from '@core/ui/components/CircularProgress';
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
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

// storages
import { useUI } from '@core/storages/ui';
import { Unit, UnitProcess } from '@solutions/ems/Reporting/data/unit';
import { useUnit } from '@solutions/ems/Reporting/storages/controllers/unit';

type Props = {
  handleEditProfile?: () => void;
  unit: Unit;
};

const Profile: React.FC<Props> = ({ handleEditProfile, unit }) => {
  const ui = useUI();
  const controller = useUnit({
    locationId: ui.currentFormation,
  });

  const queryProcess: Partial<UnitProcess> = {
    locationId: unit.locationId,
    unitId: unit.unitId,
  };

  const process = controller.getProcess(queryProcess);

  const unitInfos = process
    ? process.map((p) => {
        return {
          icon: <Settings01LineIcon />,
          title: p.name,
          show: true,
          id: p.processId,
        };
      })
    : [];

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' size='3xl' className={styles['icon']}>
              <DashboardLineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline title={unit.name} size='xxl' />
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
                  <ListSubheader disableGutters>Details</ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {!unitInfos.length ? (
                      <Grid alignItems='center' justifyContent='center' fullHeight>
                        <CircularProgress />
                      </Grid>
                    ) : (
                      unitInfos.map((unit) => (
                        <ListItem dense disablePaddingX key={unit.id}>
                          <ListItemIcon>
                            <Icon color='secondary' size='lg' variant='tint'>
                              {unit.icon}
                            </Icon>
                          </ListItemIcon>
                          <ListItemText disableGutters>
                            <Headline size='sm' title={unit.title} />
                          </ListItemText>
                        </ListItem>
                      ))
                    )}
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

export default Profile;
