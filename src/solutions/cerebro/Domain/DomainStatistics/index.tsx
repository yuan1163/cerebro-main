import React, { useState } from 'react';

// storages
import { useLocations } from '@core/storages/controllers/locations';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { DataGrid } from '@core/ui/components/DataGrid';
import { DataGridBody } from '@core/ui/components/DataGridBody';
import { DataGridCell } from '@core/ui/components/DataGridCell';
import { DataGridRow } from '@core/ui/components/DataGridRow';
import { Datepicker } from '@core/ui/cerebro/Datepicker';
import { LinearProgress } from '@core/ui/components/LinearProgress';
import { Select } from '@core/ui/components/Select';
import { Stack } from '@core/ui/components/Stack';

type Props = {
  className?: string;
};

const assetsSet = [
  {
    value: 1,
    label: 'Total Assets Tracked',
  },
  {
    value: 2,
    label: 'Another filter value',
  },
  {
    value: 3,
    label: 'Another filter value',
  },
];

export const DomainStatistics: React.FC<Props> = ({ className }) => {
  const locations = useLocations();

  const formations = locations.getFormations();
  const [selectedOptions, setSelectedOptions] = useState(assetsSet[0]);

  return (
    <Card className={styles['container']}>
      <Stack direction='row' spacing={2}>
        <Datepicker />
        <Select
          id='assets-select'
          onChange={setSelectedOptions}
          options={assetsSet}
          placeholder='Assets'
          value={selectedOptions}
        />
      </Stack>
      <DataGrid className={styles['data-grid']} size='sm'>
        <DataGridBody>
          {formations.map((item, i) => {
            const left = Math.round(Math.random() * 10);
            const percent = Math.round(Math.random() * 100);
            const right = Math.round((left * percent) / 100);
            return (
              <DataGridRow className={styles['data-grid-row']} key={`formations-summaries-${i}`}>
                <DataGridCell>
                  <span className={styles['location-name']}>{item.name}</span>
                </DataGridCell>
                <DataGridCell>
                  <span className={styles.count}>{left}</span>
                </DataGridCell>
                <DataGridCell>
                  <Box className='w-full' />
                </DataGridCell>
                <DataGridCell>
                  <span className={styles.count}>{right}%</span>
                </DataGridCell>
              </DataGridRow>
            );
          })}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
};
