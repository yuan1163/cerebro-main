import DataBlock from '@core/ui/levelnow/DataBlock';
import EditButton from '@core/ui/levelnow/EditButton';
import DeleteButton from '@core/ui/levelnow/DeleteButton';
import { useEffect, useState, useMemo } from 'react';

import { ClientData, TankData } from '@core/api/types';
import { Button } from '@core/ui/components/Button';
import { useDeleteTank, useUpdateTank } from '@core/storages/controllers/levelnow/tank';
import { useUpdateClient, useDeleteClient } from '@core/storages/controllers/levelnow/client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Map, { Point } from '@core/ui/levelnow/Map';
import { getCustomerGWFields, getCustomerProfileFields } from '@constants/fieldSettings';
import { t } from '@core/utils/translate';

// Define the form schema using zod
const customerSchema = z.object({
  customerName: z.string().optional(),
  customerNo: z.string().optional(),
  primaryContact: z.string().optional(),
  mobileNo: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  gwsalesrep: z.string().optional(),
  gwcustomerservicerep: z.string().optional(),
});
type FormValues = z.infer<typeof customerSchema>;

type CustomerProfileProps = {
  customer: ClientData | null;
};

export default function CustomerProfile({ customer }: CustomerProfileProps) {
  const [isEdit, setIsEdit] = useState(false);
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerName: '',
      customerNo: '',
      primaryContact: '',
      mobileNo: '',
      postcode: '',
      country: '',
      state: '',
      city: '',
      gwsalesrep: '',
      gwcustomerservicerep: '',
    },
  });

  // Reset form when customer data changes
  useEffect(() => {
    if (customer) {
      reset({
        customerName: customer.clientName || '',
        customerNo: customer.clientNo || '',
        primaryContact: customer.clientContact || '',
        mobileNo: customer.clientPhone || '',
        postcode: customer.clientPostCode || '',
        country: customer.clientCountry || '',
        state: customer.clientState || '',
        city: customer.clientCity || '',
        gwsalesrep: customer.salesRepUserId || '',
        gwcustomerservicerep: customer.customerServiceRepUserId || '',
      });
    }
  }, [customer, reset]);

  if (!customer) {
    return <DataBlock title='Customer Profile' className='h-full' />;
  }

  const basicFields = getCustomerProfileFields(customer);
  const ownerFields = getCustomerGWFields(customer);

  // Map Properties - memoize to prevent unnecessary re-renders
  const points: Point[] = useMemo(
    () =>
      customer.latitude && customer.longitude
        ? [
            {
              latitude: customer.latitude,
              longitude: customer.longitude,
            },
          ]
        : [],
    [customer.latitude, customer.longitude],
  );
  const zoom = points.length > 0 ? 16 : 1;

  const handleSubmitForm = async (data: FormValues) => {
    if (!customer.clientId) {
      console.error('Client ID is required for update');
      return;
    }

    try {
      await updateClientMutation.mutateAsync({
        clientId: customer.clientId,
        data: {
          clientName: data.customerName,
          clientNo: data.customerNo,
          clientContact: data.primaryContact,
          clientPhone: data.mobileNo,
          clientPostCode: data.postcode,
          clientCountry: data.country,
          clientState: data.state,
          clientCity: data.city,
          salesRepUserId: data.gwsalesrep,
          customerServiceRepUserId: data.gwcustomerservicerep,
        },
      });
      console.log('Client updated successfully');
      handleToggleEdit();
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    if (!customer.clientId) {
      console.error('Client ID is required for delete');
      return;
    }
    console.log('Deleting customer:', customer.clientId);

    try {
      await deleteClientMutation.mutateAsync(customer.clientId);
      console.log('Customer deleted successfully');
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  if (!isEdit) {
    return (
      <DataBlock
        title={t('customer.profile.label', 'Customer Profile', 'Customer Profile')}
        data={basicFields}
        columns={1}
        labelWidth='191px'
        className='h-full'
      >
        <div className='w-full h-40'>
          <Map points={points} zoom={zoom} className='rounded-[10px]' />
        </div>
        <DataBlock data={ownerFields} columns={1} labelWidth='191px' noPadding />
        <div className='flex items-center justify-end gap-3 '>
          <EditButton onEdit={handleToggleEdit} />
          <DeleteButton
            type='customer'
            name={customer.clientName}
            onDelete={handleDelete}
            isloading={deleteClientMutation.isLoading}
          />
        </div>
      </DataBlock>
    );
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-8'>
      <div className='flex flex-col gap-5'>
        <h1 className='font-medium text-md text-secondary-900'>
          {t('customer.basicInfo.label', 'Basic information', 'Basic information')}
        </h1>
        <div className='grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-5 gap-y-3'>
          {basicFields.map((field) => (
            <div key={field.name} className='flex flex-col gap-1'>
              <label htmlFor={field.name} className='text-xs font-medium tracking-wide text-secondary-500'>
                {field.label}
              </label>
              <input
                id={field.name}
                {...register(field.name as keyof FormValues)}
                type='text'
                className='p-2 text-sm font-medium border rounded h-9 border-neutral-200 text-neutral-900 focus:outline-none'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='font-medium text-md text-secondary-900'>
          {t('customer.owner.label', 'Customer Owner', 'Customer Owner')}
        </h1>
        <div className='grid grid-cols-2 gap-x-5'>
          {ownerFields.map((field) => (
            <div key={field.name} className='flex flex-col gap-1'>
              <label htmlFor={field.name} className='text-xs font-medium tracking-wide text-secondary-500'>
                {field.label}
              </label>
              <input
                id={field.name}
                {...register(field.name as keyof FormValues)}
                type='text'
                className='p-2 text-sm font-medium border rounded h-9 border-neutral-200 text-neutral-900 focus:outline-none'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center gap-3 mt-auto'>
        <Button
          type='button'
          variant='outlined'
          fullWidth
          onClick={handleToggleEdit}
          disabled={updateClientMutation.isLoading}
        >
          {t('general.cancelButton.label', 'Cancel', 'Cancel')}
        </Button>
        <Button type='submit' variant='solid' fullWidth loading={updateClientMutation.isLoading}>
          {t('general.saveButton.label', 'Save changes', 'Save changes')}
        </Button>
      </div>
    </form>
  );
}
