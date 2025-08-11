import React from 'react';
import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';

import { ClientData } from '@core/api/types';
type TankInfoCustomerProps = {
  client: ClientData | null;
};
export default function TankInfoCustomer({ client }: TankInfoCustomerProps) {
  if (!client) {
    return <DataBlock title='Customer' minHeight={241} />;
  }
  const customer = [
    { label: 'Customer Name', value: client.clientName },
    { label: 'Customer No.', value: client.clientNo },
    { label: 'Primary Contact', value: client.clientContact },
    { label: 'Phone', value: client.clientPhone },
    { label: 'Post Code', value: client.clientPostCode },
    { label: 'Address', value: client.clientAddress },
    { label: 'Country', value: client.clientCountry },
    { label: 'State', value: client.clientState },
    { label: 'City', value: client.clientCity },
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
        <EditButton />
        <DeleteButton type='customer' name={client.clientName} onDelete={handleDelete} />
      </div>
    </DataBlock>
  );
}
