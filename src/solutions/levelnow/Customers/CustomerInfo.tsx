import React, { useState } from 'react';
// types
import { TankData } from '@core/api/types';
import { ClientData } from '@core/api/types';
// ui components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import DownloadButton from '@core/ui/levelnow/DownloadButton';

import { Scrollbar } from '@core/ui/components/Scrollbar';
import CustomerProfile from './CustomerProfile';
import CustomerTanks from './CustomerTanks';
// components
// import TankInfoDetails from './TankInfoDetails';
// import TankInfoCustomer from './TankInfoCustomer';
// import TankInfoGW from './TankInfoGW';
// import TankInfoLevel from './TankInfoLevel';
// import { useAuth } from '@core/storages/auth';
// import CustomerAssign from './CustomerAssign';

type CustomerInfoProps = {
  customer: ClientData | null;
};
export default function CustomerInfo({ customer }: CustomerInfoProps) {
  //   const [isEditCustomer, setIsEditCustomer] = useState(false);

  //   const onEditCustomer = () => {
  //     setIsEditCustomer(true);
  //   };

  //   const onCancelEdit = () => {
  //     setIsEditCustomer(false);
  //   };

  return (
    <div className='flex grow'>
      <Card className='flex flex-col flex-1'>
        <CardHeader borderBottom className=' min-h-[69px]'>
          <h1 className='text-lg font-medium tracking-36 text-neutral-900'>{customer?.clientName || '-'}</h1>
        </CardHeader>
        <CardContent className='p-5 grow'>
          <div className='grid h-full grid-cols-2 gap-5'>
            <CustomerProfile customer={customer} />
            <CustomerTanks clientTank={customer?.clientTank ?? []} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// {tank && isEditCustomer ? (
//   <CustomerAssign tank={tank} client={client} onCancelEdit={onCancelEdit} />
// ) : (
//   <Scrollbar>
//     <div className='grid grid-flow-row grid-cols-2 grid-rows-[auto,auto,auto] gap-5'>
//       {/* Info */}
//       <TankInfoDetails tank={tank} />
//       {/* Ievel & Location */}
//       <TankInfoLevel tank={tank} />
//       {/* Customer */}
//       <TankInfoCustomer client={client} onEditCustomer={onEditCustomer} />
//       {/* GW */}
//       <TankInfoGW client={client} />
//     </div>
//   </Scrollbar>
// )}
