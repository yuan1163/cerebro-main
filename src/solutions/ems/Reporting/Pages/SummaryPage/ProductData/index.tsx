import React from 'react';

// styles
import styles from './styles.module.scss';

// components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';
import QueryHistoryData from '@solutions/ems/Reporting/Components/QueryHistoryData';

// icons
import ClockIcon from '@assets/icons/line/clock.svg?component';
import CarbonEmission01SolidIcon from '@assets/icons/solid/carbon-emission-01.svg?component';
import PlugSolidIcon from '@assets/icons/solid/plug-in.svg?component';

type Props = {
  productId: number;
  locationId: number | undefined;
};

const ProductData: React.FC<Props> = ({ productId, locationId }) => {
  return (
    <Card fullWidth>
      <CardHeader disablePaddingBottom title='Product' />
      <CardContent>
        <Grid container>
          <Grid item container spacing={4}>
            <Grid item alignItems='center'>
              <Icon size='xl' variant='tint' color={'yellow'}>
                <PlugSolidIcon />
              </Icon>
            </Grid>
            <Grid item direction='column'>
              <Text weight={'bold'} variant='lg'>
                <QueryHistoryData
                  locationId={locationId}
                  key={`historyData.totalConsumption`}
                  parameter='productId'
                  parameterId={productId}
                ></QueryHistoryData>{' '}
                kWh
              </Text>
              <Text weight={'medium'} color={'typography-tertiary'}>
                Total Consumption
              </Text>
            </Grid>
            <Grid item>
              <Divider className={styles['divider']}></Divider>
            </Grid>
            <Grid item alignItems='center'>
              <Icon size='xl' variant='tint' color={'green'}>
                <CarbonEmission01SolidIcon />
              </Icon>
            </Grid>
            <Grid item direction='column'>
              <Text weight={'bold'} variant='lg'>
                <QueryHistoryData
                  locationId={locationId}
                  key={`historyData.totalConsumption`}
                  parameter='productId'
                  parameterId={productId}
                  showEmission
                ></QueryHistoryData>{' '}
                CO2e
              </Text>
              <Text weight={'medium'} color={'typography-tertiary'}>
                Total Carbon Emission
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductData;
