import { DeviceParameter } from '@core/api/types';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { DataGrid } from '@core/ui/components/DataGrid';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { Text } from '@core/ui/components/Text';

type Props = {
  parameter: DeviceParameter;
};

export const MeteringCard: React.FC<Props> = ({ parameter }) => (
  <DataGrid size='sm'>
    <DataGridRow className={styles['data-grid-row']}>
      <DataGridCell>
        <Text variant='sm' color='typography-secondary'>
          {parameter.name}
        </Text>
      </DataGridCell>
      <DataGridCell>
        <Text variant='sm' color='typography-primary' weight='bold'>
          {parameter.index}
        </Text>
      </DataGridCell>
      <DataGridCell>
        <Text variant='sm' color='typography-primary' weight='bold'>
          {parameter.value}
        </Text>
      </DataGridCell>
    </DataGridRow>
  </DataGrid>
);
