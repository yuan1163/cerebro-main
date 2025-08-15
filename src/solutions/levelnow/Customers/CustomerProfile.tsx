import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';
import { useState } from 'react';

import { ClientData, TankData } from '@core/api/types';
import { Button } from '@core/ui/components/Button';
import { useDeleteTank, useUpdateTank } from '@core/storages/controllers/levelnow/tank';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Map, { Point } from '@core/ui/levelnow/Map';
import { getCustomerGWFields, getCustomerProfileFields } from '@constants/fieldSettings';

// Define the form schema using zod
const tankSchema = z.object({
  tankNo: z.string().optional(),
  deviceDescription: z.string().optional(),
  deviceOilType: z.string().optional(),
  deviceOilViscosity: z.string().optional(),
});
type FormValues = z.infer<typeof tankSchema>;

type CustomerProfileProps = {
  customer: ClientData | null;
};

export default function CustomerProfile({ customer }: CustomerProfileProps) {
  const [isEdit, setIsEdit] = useState(false);
  //   const updateTankMutation = useUpdateTank();
  //   const deleteTank = useDeleteTank();

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<FormValues>({
  //     resolver: zodResolver(tankSchema),
  //     defaultValues: {
  //       tankNo: tank?.tankNo || '',
  //       deviceDescription: tank?.deviceDescription || '',
  //       deviceOilType: tank?.deviceOilType || '',
  //       deviceOilViscosity: tank?.deviceOilViscosity || '',
  //     },
  //   });

  // If tank is null, return a placeholder DataBlock
  if (!customer) {
    return <DataBlock title='Customer Profile' className='h-full' />;
  }

  const fields = getCustomerProfileFields(customer);
  const gwFields = getCustomerGWFields(customer);

  //   const handleSubmitForm = async (data: FormValues) => {
  //     if (!tank.tankId) {
  //       console.error('Tank ID is required for update');
  //       return;
  //     }

  //     try {
  //       await updateTankMutation.mutateAsync({
  //         tankId: tank.tankId,
  //         data: {
  //           tankNo: data.tankNo,
  //           deviceDescription: data.deviceDescription,
  //           deviceOilType: data.deviceOilType,
  //           deviceOilViscosity: data.deviceOilViscosity,
  //         },
  //       });
  //       handleToggleEdit();
  //     } catch (error) {
  //       console.error('Failed to update tank:', error);
  //     }
  //   };

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    if (!customer.clientId) {
      console.error('Client ID is required for delete');
      return;
    }
    console.log('Deleting customer:', customer.clientId);

    // try {
    //   await deleteTank.mutateAsync(tank.tankId);
    // } catch (error) {
    //   console.error('Failed to delete tank:', error);
    // }
  };

  if (!isEdit) {
    return (
      <DataBlock title='Customer Profile' data={fields} columns={1} labelWidth='191px' className='h-full'>
        {/* <div className='flex items-center justify-end gap-3 '>
          <EditButton onEdit={handleToggleEdit} />
          <DeleteButton type='tank' name={tank.tankNo} onDelete={handleDelete} />
        </div> */}
        <div className='w-full h-40'>
          <Map points={[]} zoom={1} className='rounded-[10px]' />
        </div>
        <DataBlock data={gwFields} columns={1} labelWidth='191px' noPadding />
        <div className='flex items-center justify-end gap-3 '>
          <EditButton onEdit={handleToggleEdit} />
          <DeleteButton type='customer' name={customer.clientName} onDelete={handleDelete} />
        </div>
      </DataBlock>
    );
  }
  // return (
  //   <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-8'>
  //     <div className='grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-5 gap-y-3'>
  //       {fields.map((field) => (
  //         <div key={field.name} className='flex flex-col gap-1'>
  //           <label htmlFor={field.name} className='text-xs font-medium tracking-wide text-secondary-500'>
  //             {field.label}
  //           </label>
  //           {field.name === 'deviceFillingDate' ? (
  //             <div className='py-2 text-sm font-medium h-9 text-neutral-900'>{field.value}</div>
  //           ) : (
  //             <>
  //               <input
  //                 id={field.name}
  //                 {...register(field.name as keyof FormValues)}
  //                 type='text'
  //                 className='p-2 text-sm font-medium border rounded h-9 border-neutral-200 text-neutral-900 focus:outline-none'
  //               />
  //               {errors[field.name as keyof FormValues] && (
  //                 <p className='text-sm text-red-500'>{errors[field.name as keyof FormValues]?.message}</p>
  //               )}
  //             </>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //     <div className='flex items-center gap-3'>
  //       <Button type='button' variant='outlined' fullWidth onClick={handleToggleEdit}>
  //         Cancel
  //       </Button>
  //       <Button type='submit' variant='solid' fullWidth loading={updateTankMutation.isLoading}>
  //         Save changes
  //       </Button>
  //     </div>
  //   </form>
  // );
}
