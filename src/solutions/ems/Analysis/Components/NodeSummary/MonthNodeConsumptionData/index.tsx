import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';
import React, { useEffect } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { Badge } from '@core/ui/components/Badge';
import { Dot } from '@core/ui/components/Dot';
import { Icon } from '@core/ui/components/Icon';
import { LinearProgress } from '@core/ui/components/LinearProgress';
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// icons

import PlugInLineIcon from '@assets/icons/line/plug-in.svg?component';

// types

import { Location, LocationType } from '@core/api/types';

import { useUI } from '@core/storages/ui';
import { consumptionFromLastMonth } from '@solutions/ems/storages/consumptionFromLastMonth';
import { getCarbonEmissionFactors } from '@solutions/ems/Analytics/data/getCarbonEmissionFactors';
import moment from 'moment';

const flat = (hierarchy: Location[] | undefined): Location[] => {
  if (!hierarchy) {
    return [];
  }
  const result = [...hierarchy];
  for (const item of hierarchy) {
    result.push(...flat(item.children));
  }
  return result;
};

const convertMonthValueList = (
  locationNames: string[],
  lastMonthConsumption: number[],
  lastMonthValue: number,
  thisMonthConsumption: number[],
  thisMonthValue: number,
) => {
  return locationNames.map((name, i) => {
    return {
      'locationName': name,
      'lastMonthValue': Number(((lastMonthConsumption[i] / lastMonthValue) * 100).toFixed(1)),
      'thisMonthValue': Number(((thisMonthConsumption[i] / thisMonthValue) * 100).toFixed(1)),
    };
  });
};

type Props<ItemType = any> = {
  searchLocations: Location[];
} & React.HTMLAttributes<HTMLElement>;

const MonthNodeConsumptionData: React.FC<Props> = ({ searchLocations }) => {
  // SEARCH LOCATIONS

  const searchLocationsArray = searchLocations.map((location) => {
    let childrenLocation = flat(location?.children);
    if (childrenLocation.length < 1) childrenLocation.push(location);

    return childrenLocation.map((location) => location.locationId);
  });

  // 記錄 searchLocationsArray 的內容
  console.log('[MonthNodeConsumption] searchLocationsArray:', searchLocationsArray);

  const ui = useUI();
  const consumption = consumptionFromLastMonth(ui.currentFormation);
  console.log('consumption', consumption);
  //)
  // CONSUMPTION

  const lastMonthConsumption = searchLocationsArray.map((locationIdArray) =>
    Number(consumption.getLastMonSum(locationIdArray).toFixed()),
  );
  const thisMonthConsumption = searchLocationsArray.map((locationIdArray) =>
    Number(consumption.getThisMonSum(locationIdArray).toFixed()),
  );

  // 記錄原始消耗數據
  console.log('[MonthNodeConsumption] 消耗數據:', {
    lastMonthConsumption,
    thisMonthConsumption,
    consumptionStorageData: consumption.consumptionFromLastMonth?.length,
    isFetching: consumption.IsFetching
  });

  // VALUE

  const lastMonthValue = lastMonthConsumption.reduce((partSum, x) => partSum + x, 0);
  const thisMonthValue = thisMonthConsumption.reduce((partSum, x) => partSum + x, 0);

  // 記錄總消耗值
  console.log('[MonthNodeConsumption] 總消耗值:', {
    lastMonthValue,
    thisMonthValue
  });

  // LIST

  const MonthValueList = convertMonthValueList(
    searchLocations.map((location) => location.name),
    lastMonthConsumption,
    lastMonthValue,
    thisMonthConsumption,
    thisMonthValue,
  );

  // 記錄轉換為百分比後的列表
  console.log('[MonthNodeConsumption] 百分比數據:', MonthValueList);

  // 使用 useEffect 來追蹤資料狀態的變化
  useEffect(() => {
    if (!consumption.IsFetching && consumption.consumptionFromLastMonth) {
      console.log('[MonthNodeConsumption] 資料載入完成:', {
        dataLength: consumption.consumptionFromLastMonth.length,
        firstItem: consumption.consumptionFromLastMonth[0],
        lastItem: consumption.consumptionFromLastMonth[consumption.consumptionFromLastMonth.length - 1]
      });

      // 記錄月份數據處理方式的示例
      const currentMonth = moment().format('YYYY-MM');
      const lastMonth = moment().subtract(1, 'month').format('YYYY-MM');

      const thisMonthData = consumption.consumptionFromLastMonth.filter(
        item => item.measureDateMs && moment(item.measureDateMs).format('YYYY-MM') === currentMonth
      );

      const lastMonthData = consumption.consumptionFromLastMonth.filter(
        item => item.measureDateMs && moment(item.measureDateMs).format('YYYY-MM') === lastMonth
      );

      console.log('[MonthNodeConsumption] 月份篩選示例:', {
        currentMonth,
        lastMonth,
        thisMonthDataCount: thisMonthData.length,
        lastMonthDataCount: lastMonthData.length
      });
    }
  }, [consumption.IsFetching, consumption.consumptionFromLastMonth]);

  return (
    <Grid fullWidth className={styles['data-container']} display='grid'>
      <Grid className={cn(styles['left-container'], 'bg-primary-tint-alpha')} direction='column'>
        <Grid alignItems='center'>
          <Icon color='primary' size='md' variant='tint' className='mr-2'>
            <PlugInLineIcon />
          </Icon>
          <Text variant={'md'} weight={'semibold'}>
            {t('ems.consumption.month', 'Consumption', 'Month Node Consumption Data left')}
          </Text>
        </Grid>
        <Grid justifyContent='between' alignItems='baseline'>
          <Text variant={'sm'}>{t('ems.thisMonth', 'This Month', 'Month Node Consumption Data left')}</Text>
          <Text variant={'sm'}>{t('ems.lastMonth', 'Last Month', 'Month Node Consumption Data left')}</Text>
        </Grid>

        <Grid justifyContent='between' alignItems='baseline'>
          <Text variant={'lg'} weight={'semibold'}>
            {thisMonthValue}
          </Text>
          <Text variant={'lg'} weight={'semibold'}>
            {lastMonthValue}
          </Text>
        </Grid>

        <Grid direction='column' spacing={1}>
          <Grid item>
            <LinearProgress color={'primary'} totalValue={lastMonthValue} value={thisMonthValue} size='md' />
          </Grid>
          <Grid item>
            <Badge color='surface-02' size='xl'>
              <Grid gap={3}>
                <Grid gap={2} alignItems='baseline'>
                  <Dot className={styles['dot-color-primary']} />
                  <Text variant='xs' color={'secondary'}>
                    {t('ems.thisMonth', 'This Month', 'Month Node Consumption Data left')}
                  </Text>
                </Grid>
                <Grid gap={2} alignItems='baseline'>
                  <Dot className={styles['dot-color-secondary-tint-alphay-active']} />
                  <Text variant='xs' color={'secondary'}>
                    {t('ems.lastMonth', 'Last Month', 'Month Node Consumption Data left')}
                  </Text>
                </Grid>
              </Grid>
            </Badge>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={cn(styles['left-container'], 'bg-secondary-tint-alpha', 'h-40')} direction='column' wrap='wrap'>
        {MonthValueList.map((item) => (
          <Grid className={styles['percent-item']} alignItems={'start'} gap={3} direction={'column'}>
            <Grid>
              <Badge size='md'>{item.locationName}</Badge>
              {/* <Text variant='xs' component='label' className='bg-white'>
                {item.circuit_name}
              </Text> */}
            </Grid>
            <Grid gap={1}>
              <Text variant='xs' color={'primary'} weight={'semibold'}>
                {item.thisMonthValue ? item.thisMonthValue : '-'}%
              </Text>
              <Text variant='xs' color={'secondary'} weight={'semibold'}>
                {item.lastMonthValue ? item.lastMonthValue : '-'}%
              </Text>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MonthNodeConsumptionData;
