import React from 'react';

// styles
import styles from './styles.module.scss';

// storages
import { useUI } from '@core/storages/ui';
import { useProduct } from '@solutions/ems/Reporting/storages/controllers/product';

// types
import { Product, ProductUnit } from '@solutions/ems/Reporting/data/product';

// components
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
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
import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';
import { Avatar } from '@core/ui/components/Avatar';

type Props = {
  handleEditProfile?: () => void;
  product: Product;
};

const Profile: React.FC<Props> = ({ product, handleEditProfile }) => {
  const productInfo = {
    icon: <DashboardLineIcon />,
    kicker: 'Name',
    title: product.name ? `${product?.name}` : '-',
    show: true,
  };

  const ui = useUI();
  const controller = useProduct({
    productId: product.productId,
    locationId: ui.currentFormation,
  });

  const queryUnit: Partial<ProductUnit> = {
    locationId: product.locationId,
    productId: product.productId,
  };

  const unitInfo = controller.getUnit(queryUnit);

  return (
    <>
      <CardHeader disablePaddingBottom>
        <Grid container direction='column' spacing={4}>
          <Grid item alignItems='center'>
            <Avatar className={styles['avatar']} size='4xl' stillLife src={controller.getImage(product.productId)} />
            <Grid direction='column' justifyContent='between'>
              <Headline title={product.name} size='xxl' />
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
                    <ListItem dense disablePaddingX key={productInfo.kicker}>
                      <ListItemIcon>
                        <Icon color='secondary' size='lg' variant='tint'>
                          {productInfo.icon}
                        </Icon>
                      </ListItemIcon>
                      <ListItemText disableGutters>
                        <Headline reverse size='sm' subtitle={productInfo.kicker} title={productInfo.title} />
                      </ListItemText>
                    </ListItem>

                    <List>
                      {!unitInfo ? (
                        <Grid alignItems='center' justifyContent='center' fullHeight>
                          <CircularProgress />
                        </Grid>
                      ) : (
                        unitInfo.map((unit) => (
                          <ListItem dense disablePaddingX key={unit.unitId}>
                            <ListItemText disableGutters>
                              <Chip color={'blue'} key={unit.unitId} size='md'>
                                {unit.name} x {unit.unitsNumber}
                              </Chip>
                            </ListItemText>
                          </ListItem>
                        ))
                      )}
                    </List>
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
