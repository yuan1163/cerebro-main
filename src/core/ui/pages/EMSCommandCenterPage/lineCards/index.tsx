// utils

import { t } from '@core/utils/translate';
import { getDeviceSeverity } from '@core/utils/getDeviceSeverity';
import { getLocationType } from '@core/utils/getLocationType';

// types

import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../styles.module.scss';

// components

import { CardBlock } from '../cardBlock';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  lineItem?: any;
  location?: string;
  singleRow?: boolean;
} & React.HTMLAttributes<HTMLElement>;

interface SchemeMachine extends Partial<DeviceParts> {
  riskLevel: number;
}

type ProcessItem = {
  name?: string;
  count?: number;
};

type Process = {
  name?: string;
  process?: ProcessItem[];
  machines?: SchemeMachine[];
};

export const LineCards: React.FC<Props> = ({ className, lineItem, location, singleRow, ...props }) => {
  return (
    <Grid direction='column' fullWidth className={styles['block-container']}>
      {/* LINE */}

      <Grid alignItems='center' justifyContent='between' gap={3} className={styles['block-title-container']}>
        <Grid alignItems='center' gap={3}>
          <Text variant='base' weight='semibold'>
            {lineItem.name}
          </Text>
          <Text color='typography-secondary' variant='sm' weight='medium'>
            {location}
          </Text>
        </Grid>
        {/* RISK LEVEL */}
        <Grid>
          <Grid alignItems='center' justifyContent='center' fullWidth gap={1}>
            <div className={styles['progress-label-container']}>
              <Text color='typography-secondary' variant='xs' weight='medium'>
                {t('ems.riskLevel.label', 'Risk level', 'Severity level.')}:
              </Text>
            </div>
            <div className={styles['progress-count-container']}>
              <Text align='right' color='typography-primary' variant='xs' weight='semibold'>
                {lineItem.riskLevel || 0}%
              </Text>
            </div>
            <Icon
              color={getDeviceSeverity(lineItem.riskLevel || 0).color}
              size='xs'
              variant='plain'
              className={styles['progress-icon-container']}
            >
              {getDeviceSeverity(lineItem.riskLevel || 0).icon}
            </Icon>
          </Grid>
        </Grid>
      </Grid>

      {/* CARD */}

      {lineItem.processes.map(
        (processItem: Process, processIndex: number) =>
          processItem.machines &&
          processItem.machines.length > 0 && <CardBlock key={processIndex} process={processItem} />,
      )}
    </Grid>
  );
};
