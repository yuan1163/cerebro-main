import React from 'react';
import { cn } from '@core/utils/classnames';
import { ClientTank } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { getCustomerTankFields } from '@constants/fieldSettings';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { getDeviceLevelIcon } from '@core/utils/levelnow/deviceStatus';
import { Link } from '@core/ui/components/Link';

type Item = {
  label: string;
  value: string | null;
};

type CustomerTanks = {
  clientTank: ClientTank[];
};

const fakeClientTank: ClientTank[] = [
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1214,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1215,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1216,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1217,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1218,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
  {
    tankNo: 'Demo1122',
    deviceFillingDate: '2024-08-07T00:00:00',
    deviceDescription: 'this is a demo this is a demo',
    deviceOilType: 'Oil 1',
    deviceOilViscosity: '',
    tankId: 1219,
    deviceLevel: 1,
    deviceLevelLabel: '100~205L',
    deviceConnection: 1,
  },
];

export default function CustomerTanks({ clientTank }: CustomerTanks) {
  return (
    <section className='flex flex-col gap-5'>
      <div className='flex items-center gap-2'>
        <h2 className='font-medium text-md tracking-32 text-neutral-900'>Tanks</h2>
        <NumberBadge number={clientTank.length} variant='gray' />
      </div>
      <div className='h-4 pt-2 pb-5 rounded-lg bg-neutral-50 grow'>
        <Scrollbar>
          <div className='flex flex-col gap-3'>
            {clientTank.map((tank) => (
              <CustomerTankItem key={tank.tankId} clientTank={tank} />
            ))}
          </div>
        </Scrollbar>
      </div>
    </section>
  );
}

function CustomerTankItem({ clientTank }: { clientTank: ClientTank }) {
  const tankFields = getCustomerTankFields(clientTank);
  return (
    <Link
      to={`/levelnow/tanks/tank/${clientTank.tankId}`}
      className='flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-primary-50'
    >
      <dl className='grid gap-x-10 gap-y-3' style={{ gridTemplateColumns: 'auto minmax(0, 1fr)' }}>
        {tankFields.map((field) => (
          <React.Fragment key={field.name}>
            <dt className='text-sm font-medium tracking-wide text-secondary-500'>{field.label}</dt>
            <dd className='text-sm font-medium tracking-wide truncate text-neutral-900'>{field.value || '-'}</dd>
          </React.Fragment>
        ))}
      </dl>
      {getDeviceLevelIcon(clientTank.deviceLevel, 'lg')}
    </Link>
  );
}
