import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';

import { ClientData } from '@core/api/types';
import { getCustomerProfileFields } from '@constants/fieldSettings';
type TankInfoCustomerProps = {
  client: ClientData | null;
  onEditCustomer: () => void;
};
export default function TankInfoCustomer({ client, onEditCustomer }: TankInfoCustomerProps) {
  // Get customer fields from centralized configuration
  const customerFields = getCustomerProfileFields(client);

  // Convert to the format expected by DataBlock (add address field)
  const customer = [
    ...customerFields.slice(0, 4), // customerName, customerNo, primaryContact, mobileNo
    customerFields[4], // postcode
    { label: 'Address', value: client?.clientAddress || '-' }, // Add address field
    ...customerFields.slice(5), // country, state, city
  ];

  const handleDelete = () => {
    // Handle delete logic here
  };
  return (
    <DataBlock
      title='Customer'
      data={customer}
      columns={2}
      rows={5}
      minHeight={241}
      padColumns
      labelWidth='138px'
      className='col-span-2'
    >
      <div className='flex items-center justify-end gap-3'>
        <EditButton onEdit={onEditCustomer} />
        <DeleteButton type='customer' name={client?.clientName} onDelete={handleDelete} disabled={!client} />
      </div>
    </DataBlock>
  );
}
