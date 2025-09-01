import DataBlock from '@core/ui/levelnow/DataBlock';
import { getCustomerGWFields } from '@constants/fieldSettings';

import { ClientData } from '@core/api/types';
type TankInfoGWProps = {
  client: ClientData | null;
};
export default function TankInfoGW({ client }: TankInfoGWProps) {
  const ownerFields = getCustomerGWFields(client);

  return <DataBlock data={ownerFields} columns={1} rows={2} labelWidth='200px' className='col-span-2' />;
}
