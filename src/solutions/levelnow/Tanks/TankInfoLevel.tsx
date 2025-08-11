import React from 'react';
import DataBlock from '@core/ui/levelnow/DataBlock';

import TankHighIcon from '@assets/icons/levelnow/tank/tank-high.svg?component';

import { TankData } from '@core/api/types';
type TankInfoDetailsProps = {
  tank: TankData | null;
};
export default function TankInfoLevel({ tank }: TankInfoDetailsProps) {
  if (!tank) {
    return <DataBlock title='Oils' minHeight={255} />;
  }
  const level = [
    [
      {
        label: 'Device Reference',
        value: tank.deviceReference,
      },
      { label: 'Battery Level', value: tank.deviceBattery },
    ],
    [
      { label: 'Gateway Version', value: tank.gatewayVersion },
      { label: 'Gateway Status', value: tank.deviceConnection },
    ],
  ];

  return (
    <section className='flex flex-col gap-5'>
      <div className='flex items-center'>
        <h2 className='font-medium text-md tracking-32 text-neutral-900 w-[185px]'>Leveling</h2>
        <h2 className='font-medium text-md tracking-32 text-neutral-900'>Location</h2>
      </div>
      <div className='flex flex-col gap-6 p-5 rounded-lg bg-neutral-50' style={{ minHeight: '255px' }}>
        {/* image & map */}
        <div>
          <TankHighIcon className='w-[136px] h-[136px]' />
        </div>
        {/* grid */}
        <div className='grid grid-cols-2 mt-auto gap-x-20 gap-y-3'>
          {level.map((column, colIndex) => {
            return (
              <dl
                key={colIndex}
                className='grid gap-x-10 gap-y-3'
                style={{
                  gridTemplateColumns: `128px minmax(0, 1fr)`,
                }}
              >
                {column.map((item, rowIndex) => (
                  <React.Fragment key={`${colIndex}-${rowIndex}`}>
                    <>
                      <dt className='text-sm font-medium tracking-wide text-secondary-500'>{item.label}</dt>
                      <dd className='text-sm font-medium tracking-wide truncate text-neutral-900'>
                        {item.value || '-'}
                      </dd>
                    </>
                  </React.Fragment>
                ))}
              </dl>
            );
          })}
        </div>
      </div>
    </section>
  );
}
