import moment from 'moment';
import React, { useEffect, useState } from 'react';

// Type
import { CompareDataOutput } from '../data/getCompareData';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// COMPONENTS
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// ICON
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';

type HasValue = {
  currentValue: number | string | null;
  historyValue: number | string | null;
  compareFun?: never;
};

type HasFun = {
  currentValue?: never;
  historyValue?: never;
  compareFun: (dataType?: string) => CompareDataOutput;
};

type Props = {
  iconColor: 'primary' | 'warning' | 'error' | string;
  icon: React.ReactNode;
  historyText?: string;
  unit: string;
  interval: number;
  dataType?: string;
} & (HasValue | HasFun);

export const CompareInfoBox: React.FC<Props> = ({
  iconColor = 'default',
  icon,
  historyText,
  compareFun,
  currentValue,
  historyValue,
  unit,
  interval,
  dataType,
}) => {
  let compareValue: number | string | undefined,
    valueColor: 'success' | 'error' | string | undefined,
    arrowIcon: React.ReactNode | undefined;

  const [queryInterval, setQueryInterval] = useState(interval);
  if (compareFun) {
    const compareData = compareFun(dataType);
    currentValue = compareData.currentValue ? compareData.currentValue : undefined;
    historyValue = compareData.historyValue ? compareData.historyValue : undefined;
  }

  // in order to re-render
  useEffect(() => {
    const timer = setInterval(() => {
      setQueryInterval(queryInterval + interval);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, queryInterval]);

  compareValue =
    currentValue === undefined || historyValue === undefined ? undefined : Number(currentValue) - Number(historyValue);

  valueColor = compareValue ? (compareValue > 0 ? 'success' : 'error') : undefined;
  arrowIcon = compareValue ? compareValue > 0 ? <ChevronUpLineIcon /> : <ChevronDownLineIcon /> : undefined;

  return (
    <Card className={cn(styles['card'])} fullWidth>
      <CardContent size='sm'>
        <Grid container>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Grid container justifyContent='between' alignItems='center'>
                <Grid item>
                  <Grid container spacing={4} alignItems='center'>
                    {/* ICON */}
                    {/* <Grid item>
                      <Icon size='lg' variant='soft' color={iconColor}>
                        {icon}
                      </Icon>
                    </Grid> */}
                    {/* VALUE */}
                    <Grid item>
                      <Text weight='bold'>
                        {currentValue ? Number(currentValue).toFixed(2) : '-'} {unit}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} alignItems='center'>
                    {arrowIcon && (
                      <Grid item>
                        <Icon variant='plain' className={cn(styles[`value-color-${valueColor}`])}>
                          {arrowIcon}
                        </Icon>
                      </Grid>
                    )}

                    <Grid item>
                      <Text className={cn(styles[`value-color-${valueColor}`])} component='span' weight='semibold'>
                        {compareValue ? Number(compareValue).toFixed(2) : '-'}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Text color='typography-tertiary' variant='sm'>
                {historyText} {historyValue ? Number(historyValue).toFixed(2) : '-'} {unit}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
