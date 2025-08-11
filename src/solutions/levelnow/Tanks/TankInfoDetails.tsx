import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';
import { useState } from 'react';

import { TankData } from '@core/api/types';
import { FormButton } from '@core/ui/components/FormButton';
import { FormControl } from '@core/ui/components/FormControl';
type TankInfoDetailsProps = {
  tank: TankData | null;
};
export default function TankInfoDetails({ tank }: TankInfoDetailsProps) {
  const [isEdit, setIsEdit] = useState(false);
  if (!tank) {
    return <DataBlock title='Oils' minHeight={255} />;
  }
  const info = [
    {
      label: 'Tank No.',
      value: tank.tankNo,
    },
    { label: 'Description', value: '-' },
    { label: 'Oil Type', value: tank.deviceOilType },
    { label: 'Oil Viscosity', value: tank.deviceOilViscosity },
    { label: 'Last Oil Filling Date', value: new Date(tank.deviceFillingDate).toISOString().split('T')[0] },
  ];

  const handleDelete = () => {
    // Handle delete logic here
  };
  if (!isEdit) {
    return (
      <DataBlock title='Oils' data={info} columns={1} minHeight={255} labelWidth='138px'>
        <div className='flex items-center justify-end gap-3 '>
          <EditButton />
          <DeleteButton type='tank' name={tank.tankNo} onDelete={handleDelete} />
        </div>
      </DataBlock>
    );
  }
  return <div>form</div>;
}
