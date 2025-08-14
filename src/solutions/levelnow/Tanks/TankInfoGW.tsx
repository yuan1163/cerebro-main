import DataBlock from '@core/ui/levelnow/DataBlock';

import { ClientData } from '@core/api/types';
type TankInfoGWProps = {
  client: ClientData | null;
};
export default function TankInfoGW({ client }: TankInfoGWProps) {
  const customer = [
    { label: 'GW Sales Rep', value: client?.salesRepUserId || '-' },
    { label: 'GW Customer Service Rep', value: client?.customerServiceRepUserId || '-' },
  ];
  return <DataBlock data={customer} columns={1} rows={2} labelWidth='200px' className='col-span-2' />;
}
