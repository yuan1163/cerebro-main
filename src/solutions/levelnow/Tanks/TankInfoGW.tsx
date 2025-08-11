import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';

import { ClientData } from '@core/api/types';
type TankInfoGWProps = {
  client: ClientData | null;
};
export default function TankInfoGW({ client }: TankInfoGWProps) {
  if (!client) {
    return <DataBlock title='Customer' minHeight={94} />;
  }
  const customer = [
    { label: 'GW Sales Rep', value: client.salesRepUserId },
    { label: 'GW Customer Service Rep', value: client.customerServiceRepUserId },
  ];
  return <DataBlock data={customer} columns={1} rows={2} labelWidth='200px' className='col-span-2' />;
}
