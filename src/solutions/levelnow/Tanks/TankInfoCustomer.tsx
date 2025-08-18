import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';

import { ClientData, TankData } from '@core/api/types';
import { getCustomerProfileFields } from '@constants/fieldSettings';
import { useUpdateTankClient } from '@core/storages/controllers/levelnow/tank';

type TankInfoCustomerProps = {
  tank: TankData | null;
  client: ClientData | null;
  onEditCustomer: () => void;
};
export default function TankInfoCustomer({ tank, client, onEditCustomer }: TankInfoCustomerProps) {
  const updateTankClient = useUpdateTankClient();

  // Get customer fields from centralized configuration
  const customerFields = getCustomerProfileFields(client);

  // Convert to the format expected by DataBlock (add address field)
  const customer = [
    ...customerFields.slice(0, 4), // customerName, customerNo, primaryContact, mobileNo
    customerFields[4], // postcode
    { label: 'Address', value: client?.clientAddress || '-' }, // Add address field
    ...customerFields.slice(5), // country, state, city
  ];

  const handleDelete = async (): Promise<void> => {
    if (!tank?.tankId) {
      console.error('Tank ID is not available for deletion');
      return;
    }
    if (client?.clientId === undefined || client.clientId === null) {
      // could be 0 to remove client
      console.error('Client ID is not available for deletion');
      return;
    }

    try {
      await updateTankClient.mutateAsync({ tankId: tank.tankId, clientId: 0 });
    } catch (error) {
      console.error('Failed to delete customer:', error);
      throw error;
    }
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
        <DeleteButton
          type='customer-assign'
          name={client?.clientName}
          onDelete={handleDelete}
          disabled={!client}
          isloading={updateTankClient.isLoading}
        />
      </div>
    </DataBlock>
  );
}
