import { ColumnDef } from '@tanstack/react-table';
import IssueCell from '@core/ui/levelnow/IssueCell';
import { Button } from '@core/ui/components/Button';

// Icon
import ChevronUpIcon from '@assets/icons/LevelNOW/chevrons-up.svg?component';
import ChevronDownIcon from '@assets/icons/LevelNOW/chevrons-down.svg?component';

export interface TankData {
  eventDate: string;
  issue: string;
  issueType: 'warning' | 'info';
  tankNo: string;
  tankId: string;
  customerNo: string;
  customerId: string;
  address: string;
  contact: string;
  contactPhone: string;
  saleRep: string;
}

export const columns: ColumnDef<TankData>[] = [
  {
    accessorKey: 'eventDate',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Event Date
          {column.getIsSorted() === 'asc' ? (
            <ChevronDownIcon className='w-5 h-5 rotate-180' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventDate = row.getValue('eventDate') as string;
      return (
        <div className='text-16 font-medium text-[#000] tracking-32   '>
          {/* {new Date(eventDate).toLocaleDateString()} */}
          {eventDate}
        </div>
      );
    },
  },
  {
    accessorKey: 'issue',
    header: ({ column }) => {
      return (
        <Button>
          Issue
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const issue = row.getValue('issue') as string;
      const issueType = row.original.issueType;
      return <IssueCell issue={issue} issueType={issueType} />;
    },
  },
  {
    accessorKey: 'tankNo',
    header: ({ column }) => {
      return (
        <Button>
          Tank No.
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tankNo = row.getValue('tankNo') as string;
      const tankId = row.original.tankId;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{tankNo}</div>
          <div className='font-medium text-16 text-secondary-500'>{tankId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'customerNo',
    header: ({ column }) => {
      return (
        <Button>
          Customer No.
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customerNo = row.getValue('customerNo') as string;
      const customerId = row.original.customerId;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{customerNo}</div>
          <div className='font-medium text-16 text-secondary-500'>{customerId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Button>
          Address
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.getValue('address') as string;
      return <div className='text-16 font-medium text-[#000]'>{address}</div>;
    },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => {
      return (
        <Button>
          Contact
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contact = row.getValue('contact') as string;
      const contactPhone = row.original.contactPhone;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{contact}</div>
          <div className='font-medium text-16 text-secondary-500'>{contactPhone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'saleRep',
    header: ({ column }) => {
      return (
        <Button>
          Sales Rep.
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const saleRep = row.getValue('saleRep') as string;
      return <div className='text-16 font-medium text-[#000]'>{saleRep}</div>;
    },
  },
];
