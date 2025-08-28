import { TankData, ClientData } from '@core/api/types';
import { useClients } from '@core/storages/controllers/levelnow/client';
import { Button } from '@core/ui/components/Button';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { cn } from '@core/utils/classnames';

// icon
import CustomerIcon from '@assets/icons/LevelNOW/customer.svg?component';
import { useUpdateTankClient } from '@core/storages/controllers/levelnow/tank';

type CustomerAssignProps = {
  tank: TankData;
  client: ClientData | null;
  onCancelEdit: () => void;
};

export default function CustomerAssign({ tank, client, onCancelEdit }: CustomerAssignProps) {
  const clients = useClients();

  const updateTankClient = useUpdateTankClient();
  const isLoading = updateTankClient.isLoading;

  const onAssignCustomer = async (clientId: number) => {
    try {
      await updateTankClient.mutateAsync({ tankId: tank.tankId, clientId });
      onCancelEdit();
    } catch (error) {
      console.error('Failed to assign customer:', error);
    }
  };

  return (
    <div className='grid h-full grid-cols-2 gap-5'>
      {/* description */}
      <div className='flex flex-col justify-between px-5 pb-5'>
        <header className='flex flex-col gap-1'>
          <div className='font-medium text-md tracking-32 text-neutral-900'>Choose a Customer</div>
          <div className='text-sm font-medium tracking-28 text-secondary-500'>
            Assign a customer to this tank ' {tank.tankNo} '
          </div>
        </header>
        <footer className='flex flex-col gap-5'>
          <div className='font-medium text-md tracking-32 text-neutral-900'>Help?</div>
          <div className='flex flex-col gap-1 text-sm font-medium tracking-28 text-secondary-500'>
            <div className='text-neutral-900'>How to creat a " Customer " ?</div>
            <p>{`(1) Click the button " Customers " on the left navigation bar`}</p>
            <p>{` (2) Fill in customer information`}</p>
          </div>
          <div className='flex flex-col gap-1 text-sm font-medium tracking-28 text-secondary-500'>
            <div className='text-neutral-900'>Clear " Customer " for tank</div>
            <p>{`Click " - Do not Assign " directly`}</p>
          </div>
        </footer>
      </div>
      {/* Customer list to assign  */}
      <div className='flex flex-col justify-between pb-5 rounded-lg bg-neutral-50'>
        <div className='h-[calc(100vh-360px)] overflow-auto grow pb-5'>
          <Scrollbar>
            {/* Remove Assign */}
            <div
              onClick={() => onAssignCustomer(0)}
              className='flex items-center gap-5 py-3 font-medium cursor-pointer px-9 text-md tracking-32 text-neutral-900 hover:bg-hover'
            >
              <span>-</span>
              <span>{`Do not Assign ( Clear Customer of the Tank )`}</span>
            </div>
            {clients.map((item) => {
              const isActived = client?.clientId === item.clientId;
              return (
                <CustomerItem
                  key={item.clientId}
                  client={item}
                  isActived={isActived}
                  onAssignCustomer={onAssignCustomer}
                />
              );
            })}
          </Scrollbar>
        </div>
        <Button variant='outlined' onClick={onCancelEdit} loading={isLoading} className='mx-5'>
          Cancel
        </Button>
      </div>
    </div>
  );
}

type CustomerItemProps = {
  client: ClientData;
  isActived: boolean;
  onAssignCustomer: (clientId: number) => void;
};

function CustomerItem({ client, isActived, onAssignCustomer }: CustomerItemProps) {
  return (
    <div
      onClick={() => onAssignCustomer(client.clientId)}
      className={cn(
        isActived ? 'bg-primary-50' : 'hover:bg-hover',
        'flex items-center gap-3 px-5 py-3 border-b-2 border-white cursor-pointer',
      )}
    >
      <div className='p-2 bg-white rounded-md '>
        <CustomerIcon className='w-5 h-5' />
      </div>
      <div className='flex items-center justify-start flex-1'>
        <p className='text-sm font-medium tracking-28 text-neutral-900'>{client.clientName}</p>
      </div>
    </div>
  );
}
