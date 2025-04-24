import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { t } from '@core/utils/translate';

// styles
import styles from './styles.module.scss';

// storages
import { useUI } from '@core/storages/ui';
import { useProcessHistory } from '@solutions/ems/Reporting/storages/controllers/processHistory';
import { useProduct } from '@solutions/ems/Reporting/storages/controllers/product';

// data
import { getCarbonEmissionFactors } from '@solutions/ems/Analytics/data/getCarbonEmissionFactors';

// components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';
import QueryHistoryData from '@solutions/ems/Reporting/Components/QueryHistoryData';

// icons
import ClockIcon from '@assets/icons/line/clock.svg?component';
import CarbonEmission01SolidIcon from '@assets/icons/solid/carbon-emission-01.svg?component';
import LayersThree01SolidIcon from '@assets/icons/solid/layers-three-01.svg?component';
import PlugSolidIcon from '@assets/icons/solid/plug-in.svg?component';
import { useProcess } from '@solutions/ems/Reporting/storages/controllers/process';

type Props = {
  productId: number;
};

export const UnitList: React.FC<Props> = ({ productId }) => {
  const [selectedOptions, setSelectedOptions] = useState<number>();

  const ui = useUI();
  const productController = useProduct({
    locationId: ui.currentFormation,
  });

  const processController = useProcess({
    locationId: ui.currentFormation,
  });

  const processInfo = processController.get({
    locationId: ui.currentFormation,
    unitId: selectedOptions ? selectedOptions : 0,
  });

  const unitInfo = productController.getUnit({
    locationId: ui.currentFormation,
    productId: productId,
  });

  const unitList: number[] | undefined = unitInfo?.map((u) => {
    return u.unitId;
  });

  useEffect(() => {
    if (unitInfo) {
      const option: number = unitInfo.map((u) => {
        return Number(u.unitId);
      })[0];

      setSelectedOptions(option);
    }
  }, [unitInfo]);

  const processHistoryController = useProcessHistory({
    locationId: ui.currentFormation,
  });

  const processHistory = processHistoryController.get({
    locationId: ui.currentFormation,
    unitId: selectedOptions ? selectedOptions : 0,
  });

  const emissionFactor = getCarbonEmissionFactors({ locationId: ui.currentFormation, year: moment().year() });

  return (
    <Card className={styles['card']} fullHeight fullWidth scrollable>
      <CardHeader title={t('ems.unit.label', '', '')} disablePaddingBottom>
        {!unitInfo ? (
          <CircularProgress />
        ) : (
          <Grid className={'w-56'}>
            <DataSelect
              id={'unitList-select'}
              onChange={(value) => {
                setSelectedOptions(value);
              }}
              placeholder={'No Unit'}
              options={unitList}
              present={(item) => {
                const filter = unitInfo.filter((u) => u.unitId === item);
                return filter.length ? filter[0].name : 'No Unit';
              }}
              value={selectedOptions}
            />
          </Grid>
        )}
      </CardHeader>

      <CardContent>
        {!processHistory || !processInfo ? (
          <CircularProgress />
        ) : (
          <Grid container direction='column' spacing={3}>
            <Grid container item direction='column' spacing={3}>
              <Grid item container spacing={4}>
                <Grid item alignItems='center'>
                  <Icon size='xl' variant='tint' color={'yellow'}>
                    <PlugSolidIcon />
                  </Icon>
                </Grid>
                <Grid item direction='column'>
                  <Text weight={'bold'} variant='lg'>
                    <QueryHistoryData
                      key={`historyData.totalConsumption`}
                      locationId={ui.currentFormation}
                      parameter='unitId'
                      parameterId={selectedOptions ? selectedOptions : 0}
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
                      key={`historyData.totalConsumption`}
                      locationId={ui.currentFormation}
                      parameter='unitId'
                      parameterId={selectedOptions ? selectedOptions : 0}
                      showEmission
                    />{' '}
                    CO2e
                  </Text>
                  <Text weight={'medium'} color={'typography-tertiary'}>
                    Total Carbon Emission
                  </Text>
                </Grid>
                <Grid item>
                  <Divider className={styles['divider']}></Divider>
                </Grid>
                <Grid item alignItems='center'>
                  <Icon size='xl' variant='tint' color={'icon-secondary'}>
                    <LayersThree01SolidIcon />
                  </Icon>
                </Grid>
                <Grid item direction='column'>
                  <Text weight={'bold'} variant='lg'>
                    {unitInfo?.filter((u) => u.unitId === selectedOptions).length
                      ? unitInfo?.filter((u) => u.unitId === selectedOptions)[0].unitsNumber
                      : '-'}
                  </Text>
                  <Text weight={'medium'} color={'typography-tertiary'}>
                    Amount
                  </Text>
                </Grid>
              </Grid>
              <Grid item>
                <Text weight={'semibold'} variant={'lg'}>
                  {/* Process History */}
                  {t('ems.processHistory.label', '', '')}
                </Text>
                {processHistory.length === 0 ? (
                  <span className='flex items-center'>
                    <CircularProgress className='ml-4' />
                  </span>
                ) : null}
              </Grid>
            </Grid>
            {processHistory.map((ph) => {
              const historyKWH = Number(ph.energy) / Number(ph.unitsNumber);
              const processName = processInfo.filter((p) => p.processId === ph.processId);

              return (
                <Grid container item direction='column' spacing={3} key={`processHistory-${ph.historyId}`}>
                  <Grid container item fullWidth justifyContent='between'>
                    <Text weight={'semibold'} color={'primary'}>
                      {/* Circuit: {ph.deviceId} - {ph.partIndex} */}
                      {processName.length ? processName[0].name : 'n/a'}
                    </Text>
                    <Grid item alignItems='center'>
                      <Icon size='sm' variant='plain' color={'icon-secondary'} className={'mr-2'}>
                        <ClockIcon />
                      </Icon>
                      <Text weight={'semibold'} variant='paragraph-md' color='typography-tertiary'>
                        {moment(ph.startDateMs).format('MM/DD/YYYY HH:mm')} ~{' '}
                        {moment(ph.endDateMs).format('MM/DD/YYYY HH:mm')}
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid item key={`history.${ph.historyId}`}>
                    <Grid item>
                      <div className={'w-2 bg-primary rounded-l-lg'}></div>
                    </Grid>
                    <Grid item container className={styles['progress-item']}>
                      <Grid
                        item
                        fullWidth
                        justifyContent='center'
                        alignItems='center'
                        className={styles['grid-right-divider']}
                      >
                        <Text weight={'semibold'}>
                          {historyKWH.toFixed(2)}
                          kWh
                        </Text>
                      </Grid>

                      <Grid
                        item
                        fullWidth
                        justifyContent='center'
                        alignItems='center'
                        className={styles['grid-right-divider']}
                      >
                        <Text weight={'semibold'}>
                          {emissionFactor ? (historyKWH * emissionFactor).toFixed(2) : '-'}
                          CO2e
                        </Text>
                      </Grid>

                      <Grid item fullWidth justifyContent='center' alignItems='center'>
                        <Text weight={'semibold'}>Amount: {ph.unitsNumber}</Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
