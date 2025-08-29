// types
import { ClientData } from '@core/api/types';
// ui components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Button } from '@core/ui/components/Button';

import CustomerProfile from './CustomerProfile';
import CustomerTanks from './CustomerTanks';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCustomerGWFields, getCustomerProfileFields } from '@constants/fieldSettings';
import { useAddClient } from '@core/storages/controllers/levelnow/client';
// flags
import { countryFlagIcons } from '@core/utils/levelnow/countryFlagIcons';
import CountryCodeSelect from './CountryCodeSelect';
import { t } from '@core/utils/translate';

type CustomerInfoProps = {
  customer: ClientData | null;
  isAdd: boolean;
  onToggleAdd: () => void;
};

// Define the form schema using zod
const customerSchema = z.object({
  customerName: z.string().optional(),
  customerNo: z.string().optional(),
  primaryContact: z.string().optional(),
  mobileNo: z.string().optional(),
  countryCode: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  gwsalesrep: z.string().optional(),
  gwcustomerservicerep: z.string().optional(),
});
type FormValues = z.infer<typeof customerSchema>;

export default function CustomerInfo({ customer, isAdd, onToggleAdd }: CustomerInfoProps) {
  const addClient = useAddClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerName: '',
      customerNo: '',
      primaryContact: '',
      mobileNo: '',
      countryCode: '1',
      postcode: '',
      country: '',
      state: '',
      city: '',
      gwsalesrep: '',
      gwcustomerservicerep: '',
    },
  });

  const basicFields = getCustomerProfileFields(customer);
  const basicFieldsLeftSide = basicFields.slice(0, 3);
  const basicFieldsRightSide = basicFields.slice(4);
  const ownerFields = getCustomerGWFields(customer);

  const onAddClient = async (data: FormValues) => {
    console.log('Add client:', data);

    const fullPhoneNumber = data.mobileNo
      ? data.mobileNo.startsWith('0')
        ? `+${data.countryCode}${data.mobileNo.slice(1)}`
        : `+${data.countryCode}${data.mobileNo}`
      : data.mobileNo;

    console.log('Full phone number:', fullPhoneNumber);

    const requestData = {
      clientName: data.customerName,
      clientNo: data.customerNo,
      clientContact: data.primaryContact,
      clientPhone: fullPhoneNumber,
      clientPostCode: data.postcode,
      clientCountry: data.country,
      clientState: data.state,
      clientCity: data.city,
      salesRepUserId: data.gwsalesrep,
      customerServiceRepUserId: data.gwcustomerservicerep,
    };

    try {
      const result = await addClient.mutateAsync(requestData);
      if (!result.success) {
        throw new Error(result.message || 'Failed to add tank');
      }
      console.log('Client added result:', result);

      onToggleAdd();
      reset();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to add client. Please try again.',
      });
    }
  };

  const handleCancelEdit = () => {
    reset();
    onToggleAdd();
  };

  if (isAdd) {
    return (
      <div className='flex grow'>
        <Card className='flex flex-col flex-1'>
          <CardHeader borderBottom className=' min-h-[69px]'>
            <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
              {t('customer.addCustomer.label', 'Add Customer', 'Add Customer')}
            </h1>
          </CardHeader>
          <CardContent className='p-5 grow'>
            <div className='flex flex-col h-full gap-5'>
              <h1 className='font-medium text-md tracking-32 text-secondary-900'>
                {t('customer.profile.label', 'Customer Profile', 'Customer Profile')}
              </h1>
              <form onSubmit={handleSubmit(onAddClient)} className='flex flex-col gap-8 grow'>
                <div className='flex flex-col gap-5'>
                  <h1 className='font-medium text-md text-secondary-900'>
                    {t('customer.basicInfo.label', 'Basic information', 'Customer Basic information')}
                  </h1>
                  <div className='grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-5 gap-y-3'>
                    {/* Left Side */}
                    {basicFieldsLeftSide.map((field) => (
                      <div key={field.name} className='flex flex-col gap-1'>
                        <label htmlFor={field.name} className='text-xs font-medium tracking-wide text-secondary-500'>
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          {...register(field.name as keyof FormValues)}
                          type='text'
                          placeholder={field.placeholder}
                          className='p-2 text-sm font-medium border rounded h-9 border-neutral-200 text-neutral-900 focus:outline-none'
                        />
                      </div>
                    ))}
                    {/* Phone Select */}
                    <div className='flex flex-col gap-1'>
                      <label className='text-xs font-medium tracking-wide text-secondary-500'>
                        {t('customer.mobileNo.label', 'Mobile No.', 'Customer Mobile No.')}
                      </label>
                      <CountryCodeSelect options={countryFlagIcons} setValue={setValue} watch={watch} />
                    </div>
                    {/* Right Side */}
                    {basicFieldsRightSide.map((field) => (
                      <div key={field.name} className='flex flex-col gap-1'>
                        <label htmlFor={field.name} className='text-xs font-medium tracking-wide text-secondary-500'>
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          {...register(field.name as keyof FormValues)}
                          type='text'
                          placeholder={field.placeholder}
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
                          placeholder={field.placeholder}
                          className='p-2 text-sm font-medium border rounded h-9 border-neutral-200 text-neutral-900 focus:outline-none'
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex items-center gap-3 mt-auto'>
                  {errors.root && <div className='mb-2 text-sm text-red-500'>{errors.root.message}</div>}
                  <Button
                    type='button'
                    variant='outlined'
                    fullWidth
                    onClick={handleCancelEdit}
                    disabled={addClient.isLoading}
                  >
                    {t('general.cancelButton.label', 'Cancel', 'Cancel')}
                  </Button>
                  <Button type='submit' variant='solid' fullWidth loading={addClient.isLoading}>
                    {t('general.saveButton.label', 'Cancel', 'Cancel')}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
