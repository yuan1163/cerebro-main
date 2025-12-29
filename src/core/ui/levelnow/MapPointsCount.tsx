import React from 'react';

// styles
import { cn } from '@core/utils/classnames';

// types
import { AlertPriority } from '@core/api/types';

// components
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

export type PointsCountData = {
  critical: number;
  warning: number;
  info: number;
  total: number;
};

type MapPointsCountProps = {
  data: PointsCountData;
  className?: string;
};

export const MapPointsCount: React.FC<MapPointsCountProps> = ({ data, className }) => {
  return (
    <div
      className={cn(
        'backdrop-blur-[10px] bg-white/25 flex items-center p-3 rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <Grid gap={5} alignItems='center'>
        {/* Total Security incidents */}
        <div className='flex gap-1.5 items-center shrink-0'>
          <Text variant='sm' color='typography-primary' className='text-right whitespace-nowrap'>
            Security incidents
          </Text>
          <Text variant='sm' color='typography-primary' weight='bold' className='w-5 text-center'>
            {data.total}
          </Text>
        </div>

        {/* Critical */}
        <div className='flex gap-1.5 items-center shrink-0'>
          <div className='rounded-full shrink-0 size-2 bg-[#ff4545]' />
          <Text variant='sm' color='typography-primary' className='text-right whitespace-nowrap'>
            Critical
          </Text>
          <Text variant='sm' color='typography-primary' weight='bold' className='w-5 text-center'>
            {data.critical}
          </Text>
        </div>

        {/* Warning */}
        <div className='flex gap-1.5 items-center shrink-0'>
          <div className='rounded-full shrink-0 size-2 bg-[#f4ab00]' />
          <Text variant='sm' color='typography-primary' className='text-right whitespace-nowrap'>
            Warning
          </Text>
          <Text variant='sm' color='typography-primary' weight='bold' className='w-5 text-center'>
            {data.warning}
          </Text>
        </div>

        {/* Info */}
        <div className='flex gap-1.5 items-center shrink-0'>
          <div className='rounded-full shrink-0 size-2 bg-[#00aaf3]' />
          <Text variant='sm' color='typography-primary' className='text-right whitespace-nowrap'>
            Info
          </Text>
          <Text variant='sm' color='typography-primary' weight='bold' className='w-5 text-center'>
            {data.info}
          </Text>
        </div>
      </Grid>
    </div>
  );
};
