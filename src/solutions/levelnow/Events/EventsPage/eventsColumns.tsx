import { ColumnDef } from '@tanstack/react-table';
import IssueCell from '@core/ui/levelnow/IssueCell';
import { Button } from '@core/ui/components/Button';
import { formatDate } from '@core/utils/levelnow/format';

// Icon
import ChevronUpIcon from '@assets/icons/LevelNOW/chevrons-up.svg?component';
import ChevronDownIcon from '@assets/icons/LevelNOW/chevrons-down.svg?component';
// Types
import { Event } from '@core/api/types';
import { EventsIssue } from '@core/api/types';
import { t } from '@core/utils/translate';

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'eventDate',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('events.table.eventDate.label', 'Event Date', 'Event date column header')}
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
      return <div className='text-16 font-medium text-[#000] tracking-32   '>{formatDate(eventDate)}</div>;
    },
  },
  {
    accessorKey: 'issue',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className='pl-8'
        >
          {t('events.table.issue.label', 'Issue', 'Issue column header')}
          {column.getIsSorted() === 'asc' ? (
            <ChevronDownIcon className='w-5 h-5 rotate-180' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )}
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const getIssues = (row: any) => {
        const issues: string[] = [];
        if (row.original.eventBatteryLow === 1) issues.push('Battery Low');
        if (row.original.eventFault === 1) issues.push('Fault');
        if (row.original.eventLevelLow === 1) issues.push('Level Low');
        if (row.original.eventOffline === 1) issues.push('Offline');
        if (row.original.eventOilFilling === 1) issues.push('Oil Filling');
        return issues.sort().join(', ');
      };

      const issuesA = getIssues(rowA);
      const issuesB = getIssues(rowB);

      return issuesA.localeCompare(issuesB);
    },

    cell: ({ row }) => {
      let issues: { issue: EventsIssue; issueType: 'warning' | 'info' }[] = [];

      const hasLevelLowIssue = row.original.eventLevelLow === 1;
      const hasFaultIssue = row.original.eventFault === 1;
      const hasBatteryLowIssue = row.original.eventBatteryLow === 1;
      const hasOfflineIssue = row.original.eventOffline === 1;
      const hasOilFillingIssue = row.original.eventOilFilling === 1;

      if (hasLevelLowIssue) {
        issues.push({
          issue: 'Level Low',
          issueType: 'warning',
        });
      }
      if (hasFaultIssue) {
        issues.push({
          issue: 'Fault',
          issueType: 'warning',
        });
      }
      if (hasBatteryLowIssue) {
        issues.push({
          issue: 'Battery Low',
          issueType: 'warning',
        });
      }
      if (hasOfflineIssue) {
        issues.push({
          issue: 'Offline',
          issueType: 'warning',
        });
      }
      if (hasOilFillingIssue) {
        issues.push({
          issue: 'Oil Filling',
          issueType: 'info',
        });
      }

      issues.sort((a, b) => a.issue.localeCompare(b.issue));

      return <IssueCell issues={issues} />;
    },
  },
  {
    accessorKey: 'tankNo',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.tankNo.label', 'Tank No.', 'Tank number column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tankNo = row.getValue('tankNo') as string;
      const tankId = row.original.tankId;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{tankNo || '-'}</div>
          <div className='font-medium text-16 text-secondary-500'>{tankId || '-'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'customerNo',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.customerNo.label', 'Customer No.', 'Customer number column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customerNo = row.getValue('customerNo') as string;
      const customerName = row.original.customerName;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{customerNo || '-'}</div>
          <div className='font-medium text-16 text-secondary-500'>{customerName || '-'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.address.label', 'Address', 'Address column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.getValue('address') as string;
      return <div className='text-16 font-medium text-[#000]'>{address || '-'}</div>;
    },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.contact.label', 'Contact', 'Contact column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contact = row.getValue('contact') as string;
      const phone = row.original.phone;

      return (
        <div className='flex flex-col gap-1'>
          <div className='text-16 font-medium text-[#000]'>{contact || '-'}</div>
          <div className='font-medium text-16 text-secondary-500'>{phone || '-'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'salesRepUserName',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.salesRep.label', 'Sales Rep', 'Sales representative column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const salesRep = row.getValue('salesRepUserName') as string;
      return <div className='text-16 font-medium text-[#000]'>{salesRep || '-'}</div>;
    },
  },
];
