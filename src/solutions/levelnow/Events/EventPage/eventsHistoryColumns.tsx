import { ColumnDef } from '@tanstack/react-table';
import IssueCell from '@core/ui/levelnow/IssueCell';
import { Button } from '@core/ui/components/Button';
import { formatDate } from '@core/utils/levelnow/format';

// Icon
import ChevronUpIcon from '@assets/icons/LevelNOW/chevrons-up.svg?component';
import ChevronDownIcon from '@assets/icons/LevelNOW/chevrons-down.svg?component';
// Types
import { Event, EventsHistoryItem } from '@core/api/types';
import { EventsIssue } from '@core/api/types';
import { t } from '@core/utils/translate';

export const columns: ColumnDef<EventsHistoryItem>[] = [
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
      return <div className='text-16 font-medium text-[#000] tracking-32'>{formatDate(eventDate)}</div>;
    },
  },
  {
    accessorKey: 'issue',
    header: ({ column }) => {
      return (
        <Button>
          {t('events.table.issue.label', 'Issue', 'Issue column header')}
          <ChevronDownIcon className='w-5 h-5 ' />
        </Button>
      );
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

      return <IssueCell issues={issues} />;
    },
  },
];
