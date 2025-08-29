import React from 'react';
import DataBlock from '@core/ui/levelnow/DataBlock';

import TankHighIcon from '@assets/icons/levelnow/tank/tank-high.svg?component';
import Map, { Point } from '@core/ui/levelnow/Map';

import { getDeviceLevelIcon } from '@core/utils/levelnow/deviceStatus';

import { TankData } from '@core/api/types';
import { getTankLevelFields } from '@constants/fieldSettings';

// utils
import { t } from '@core/utils/translate';

type TankInfoDetailsProps = {
  tank: TankData | null;
};
export default function TankInfoLevel({ tank }: TankInfoDetailsProps) {
  if (!tank) {
    return <DataBlock title='Oils' minHeight={255} />;
  }

  const levelFields = getTankLevelFields(tank);
  const level = [levelFields.slice(0, 2), levelFields.slice(2, 4)];

  // Map Properties
  const points: Point[] =
    tank.deviceLatitude && tank.deviceLongitude
      ? [
          {
            latitude: tank.deviceLatitude,
            longitude: tank.deviceLongitude,
          },
        ]
      : [];
  const zoom = points.length > 0 ? 16 : 1;

  return (
    <section className='flex flex-col gap-5'>
      <div className='flex items-center gap-5 px-5'>
        <h2 className='font-medium text-md tracking-32 text-neutral-900 w-[145px]'>
          {t('tank.level.label', 'Leveling', 'Tank level title.')}
        </h2>
        <h2 className='font-medium text-md tracking-32 text-neutral-900'>
          {t('tank.location.label', 'Location', 'Tank location title.')}
        </h2>
      </div>
      <div className='flex flex-col gap-6 p-5 rounded-lg grow bg-neutral-50' style={{ minHeight: '255px' }}>
        {/* image & map */}
        <div className='flex items-center gap-5'>
          <div className='w-36'>{getDeviceLevelIcon(tank.deviceLevel, 'lg')}</div>
          <div className='w-full h-40'>
            <Map points={points} zoom={zoom} className='rounded-[10px]' />
          </div>
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
