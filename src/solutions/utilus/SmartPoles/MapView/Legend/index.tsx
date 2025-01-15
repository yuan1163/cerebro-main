import { Box } from '@core/ui/components/Box';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { LegendMarker } from '@core/ui/components/LegendMarker';

type Props = {
  alerts?: number;
  className?: string;
  name: string;
  total?: number;
};

export const Legend: React.FC<Props> = ({ className, name, alerts, total }) => {
  return (
    <Box className={cn(styles.item, className)}>
      <Box className={styles.name}>{name}</Box>
      <Box className={styles.values}>
        <Box className={styles.alerts}>
          <LegendMarker color='error' />
          {alerts}
        </Box>
        <Box className={styles.devices}>{total}</Box>
      </Box>
    </Box>
  );
};
