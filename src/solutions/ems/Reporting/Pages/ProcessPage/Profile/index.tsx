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
import { IconButton } from '@core/ui/components/IconButton';
import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { ListItemIcon } from '@core/ui/components/ListItemIcon';
import { ListItemText } from '@core/ui/components/ListItemText';
import { ListSubheader } from '@core/ui/components/ListSubheader';
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

// data type
import { Process } from '@solutions/ems/Reporting/data/process';

type Props = {
  handleEditProfile?: () => void;
  process: Process;
};

export const Profile: React.FC<Props> = ({ process, handleEditProfile }) => {
  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Icon variant='tint' size='3xl' className={styles['icon']}>
              <Settings01LineIcon />
            </Icon>
            <Grid direction='column' justifyContent='between'>
              <Headline title={process.name} size='xxl' />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item grow>
              <Button fullWidth onClick={handleEditProfile} variant='outlined'>
                {t('general.edit.label', 'Edit', 'Function that allows to make changes to content or data.')}
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
                {/* <Grid item>
                  <ListSubheader disableGutters>Details</ListSubheader>
                </Grid>
                <Grid item>
                  <List>
                    {productInfo.map((product) => (
                      <ListItem dense disablePaddingX key={product.kicker}>
                        <ListItemIcon>
                          <Icon color='secondary' size='lg' variant='tint'>
                            {product.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText disableGutters>
                          <Headline reverse size='sm' subtitle={product.kicker} title={product.title} />
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Scrollbar>
      </CardContent>
    </>
  );
};
