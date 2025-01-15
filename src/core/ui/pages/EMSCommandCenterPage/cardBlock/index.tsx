// types

import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';

// utils

import { t } from '@core/utils/translate';
import { getDeviceSeverity } from '@core/utils/getDeviceSeverity';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../styles.module.scss';

// components

import { AlertsLegend } from '@core/ui/components/AlertsLegend';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { ProcessCard } from '@core/ui/components/ProcessCard';
import { Text } from '@core/ui/components/Text';

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

type Props = {
  className?: string;
  lineItem?: any;
  process?: Process;
} & React.HTMLAttributes<HTMLElement>;

export const CardBlock: React.FC<Props> = ({ className, process, ...restProps }) => {
  return (
    <Card elevation='xs' className={styles['card']} fullHeight>
      <CardContent size='xxxs' className={styles['card-content']} fullHeight>
        <Grid direction='column' fullHeight>
          <Grid alignItems='center' gap={4} className={styles['title-container']}>
            {process && (
              <Text variant='sm' weight='semibold' className={styles['title']}>
                {process.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
              </Text>
            )}
            {(process?.machines || []).length === 0 ? '' : <AlertsLegend alerts={process?.machines || []} />}
          </Grid>
          {(process?.machines || []).length === 0 ? (
            ''
          ) : (
            <Grid fullWidth gap={1} fullHeight>
              {(process?.machines || []).map((item, index) => (
                <ProcessCard key={index} riskLevel={item.riskLevel} title={`${item.description}`} />
              ))}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
