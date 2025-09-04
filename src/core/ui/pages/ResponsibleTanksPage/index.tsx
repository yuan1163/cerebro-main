import { useState, useRef } from 'react';
import { columns } from './responsibleTanksColumns';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

// core ui components
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import FilterButton from '@core/ui/levelnow/FilterButton';

import { Header } from '@core/ui/cerebro/Header';
import NumberBadge from '@core/ui/levelnow/NumberBadge';

import { Scrollbar } from '@core/ui/components/Scrollbar';
import { DataTable } from '@app/components/ui/data-table';
import { Listbox } from '@headlessui/react';

// utils
import { t } from '@core/utils/translate';
import { cn } from '@core/utils/classnames';
import { useEvents } from '@core/storages/controllers/levelnow/event';
import { Event, EventsIssue } from '@core/api/types';

// icons
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import ChevronsUpDownIcon from '@assets/icons/LevelNOW/chevrons-up-down.svg?component';
import EventsIcon from '@assets/icons/line/notification-text.svg?component';

type Date = {
  month: number;
  year: number;
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const issueOptions = [
  { label: 'Issue: All', value: null },
  { label: 'Level Low', value: 'Level Low' },
  { label: 'Fault', value: 'Fault' },
  { label: 'Battery Low', value: 'Battery Low' },
  { label: 'Offline', value: 'Offline' },
  { label: 'Oil Filling', value: 'Oil Filling' },
];

const ResponsibleTanksPage = observer(() => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<keyof Event | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const navigate = useNavigate();

  // initial events data
  const events = useEvents();

  // Transform issue value to match event properties
  const transformIssueValue = (issue: EventsIssue | null) => {
    switch (issue) {
      case 'Level Low':
        return 'eventLevelLow';
      case 'Fault':
        return 'eventFault';
      case 'Battery Low':
        return 'eventBatteryLow';
      case 'Offline':
        return 'eventOffline';
      case 'Oil Filling':
        return 'eventOilFilling';
      default:
        return null;
    }
  };

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    if (selectedDate) {
      const dateMatch = compareDates(selectedDate, {
        month: new Date(event.eventDate).getUTCMonth() + 1,
        year: new Date(event.eventDate).getUTCFullYear(),
      });
      if (!dateMatch) return false;
    }
    if (selectedIssue) {
      const issueValue = transformIssueValue(selectedIssue as EventsIssue);
      if (!issueValue || !event[issueValue]) return false;
    }
    // if (selectedIssue && !event[selectedIssue]) return false;
    if (selectedDevice && event.deviceReference !== selectedDevice) return false;
    return true;
  });

  // Refs for Listbox options width same with buttons
  const dateRef = useRef<HTMLButtonElement>(null);
  const issueRef = useRef<HTMLButtonElement>(null);
  const deviceRef = useRef<HTMLButtonElement>(null);

  // Format date for date filter display
  const formatDate = (date: string | Date) => {
    if (typeof date === 'object') {
      const { month, year } = date;
      return `${monthNames[month - 1]} ${year}`;
    } else {
      const year = new Date(date).getUTCFullYear();
      const month = new Date(date).getUTCMonth() + 1;

      return `${monthNames[month - 1]} ${year}`;
    }
  };

  // Get date range for display date select value
  const getDateRange = () => {
    if (events.length === 0) return '-';
    const sortedDates = events
      .map((event) => event.eventDate)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const latestDate = formatDate(sortedDates[0]);
    const previousMonth = new Date(sortedDates[0]).getUTCMonth();

    if (previousMonth === 0) {
      return latestDate;
    } else {
      return `${monthNames[previousMonth - 1]} - ${latestDate}`;
    }
  };
  const dateRange = getDateRange();

  // Get date options for date options value
  const getDateOptions = (): Date[] => {
    const options: Date[] = [];

    const years = events.map((event) => event.eventDate).map((date) => new Date(date).getUTCFullYear());
    const uniqueYears = Array.from(new Set(years));
    uniqueYears.forEach((year) => {
      monthNames.forEach((_, index) => {
        options.push({
          month: index + 1,
          year: year,
        });
      });
    });
    return options.reverse();
  };
  const dateOptions = getDateOptions();

  // Compare selected date with event date
  function compareDates(a: Date | null, b: Date) {
    if (!a) {
      return false;
    }
    return a.month === b.month && a.year === b.year;
  }

  // Get device options for device select
  const getDeviceOptions = () => {
    const devices = events.map((event) => event.deviceReference);
    const options = Array.from(new Set(devices))
      .sort((a, b) => a.localeCompare(b))
      .map((device) => ({
        label: device,
        value: device,
      }));
    return [
      {
        label: 'Device Reference: All',
        value: null,
      },
      ...options,
    ];
  };
  const deviceOptions = getDeviceOptions();

  // Get active filter count for number badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedIssue) count++;
    if (selectedDevice) count++;
    return count;
  };
  const activeFilterCount = getActiveFilterCount();

  const isFiltering = !!(selectedDate || selectedIssue || selectedDevice);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedIssue(null);
    setSelectedDevice(null);
    setIsFilterOpen(false);
  };

  return (
    <>
      <Header
        icon={<EventsIcon />}
        title={t('domain.responsibletanks.label', 'Responsible Tanks', 'Responsible Tanks title.')}
        widgets={false}
      />
      <Card className='rounded-[10px] shadow-card flex-1 flex flex-col mt-5'>
        <CardHeader justifyContent='between'>
          <div className='flex items-center gap-3'>
            <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
              {t('solutions.events.label', 'Events', 'A list of events related to the solution.')}
            </h1>
            <NumberBadge variant='gray' number={events.length} />
          </div>
          <div>
            <FilterButton
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              counts={activeFilterCount}
              onClear={handleClearFilters}
            />
          </div>
        </CardHeader>
        <CardContent className='flex-1 p-0'>
          {isFilterOpen && (
            <div className='flex items-center flex-1 gap-3 p-5'>
              {/* Date Select*/}
              <div className='flex-1'>
                <Listbox value={selectedDate} by={compareDates} onChange={setSelectedDate}>
                  {({ open }) => (
                    <div className='relative'>
                      <Listbox.Button
                        ref={dateRef}
                        className={cn(
                          open ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300',
                          'flex w-full bg-[#FFF] items-center justify-between px-3 py-2 border rounded-md hover:bg-hover',
                        )}
                      >
                        <span className='font-medium text-md tracking-32 text-neutral-900'>
                          {selectedDate ? formatDate(selectedDate) : dateRange}
                        </span>
                        <ChevronsUpDownIcon />
                      </Listbox.Button>
                      <Listbox.Options
                        className={cn('absolute h-56 left-0 top-14 z-10 gap-3 p-3 bg-[#FFF] rounded-lg shadow-select')}
                        style={{ width: dateRef.current?.offsetWidth }}
                      >
                        <Scrollbar>
                          {dateOptions.map((date) => {
                            return (
                              <Listbox.Option key={`${date.month}/${date.year}`} value={date}>
                                {({ active, selected }) => (
                                  <li
                                    className={cn(
                                      'flex items-center justify-between p-3 rounded text-neutral-900 bg-[#FFF]',
                                      active && 'bg-hover',
                                      selected && 'bg-primary-50 text-primary-500',
                                    )}
                                  >
                                    <span className='font-medium text-md tracking-32'>{formatDate(date)}</span>
                                    {selected && <CheckIcon className='text-primary-500' />}
                                  </li>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Scrollbar>
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>

              {/* Issue Select*/}
              <div className='flex-1'>
                <Listbox value={selectedIssue} onChange={setSelectedIssue}>
                  {({ open }) => (
                    <div className='relative'>
                      <Listbox.Button
                        ref={issueRef}
                        className={cn(
                          open ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300',
                          'flex w-full bg-[#FFF] items-center justify-between px-3 py-2 border rounded-md hover:bg-hover',
                        )}
                      >
                        <span className='font-medium text-md tracking-32 text-neutral-900'>
                          {selectedIssue
                            ? selectedIssue
                            : t('events.filter.issueAll', 'Issue: All', 'Issue all filter')}
                        </span>
                        <ChevronsUpDownIcon />
                      </Listbox.Button>
                      <Listbox.Options
                        className={cn('absolute h-56 left-0 top-14 z-10 gap-3 p-3 bg-[#FFF] rounded-lg shadow-select')}
                        style={{ width: dateRef.current?.offsetWidth }}
                      >
                        <Scrollbar>
                          {issueOptions.map((issue) => {
                            const { label, value } = issue;
                            return (
                              <Listbox.Option key={label} value={value}>
                                {({ active, selected }) => (
                                  <li
                                    className={cn(
                                      'flex items-center justify-between p-3 rounded text-neutral-900 bg-[#FFF]',
                                      active && 'bg-hover',
                                      selected && 'bg-primary-50 text-primary-500',
                                    )}
                                  >
                                    <span className='font-medium text-md tracking-32'>{label}</span>
                                    {selected && <CheckIcon className='text-primary-500' />}
                                  </li>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Scrollbar>
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>
              {/* Device Select*/}
              <div className='flex-1'>
                <Listbox value={selectedDevice} onChange={setSelectedDevice}>
                  {({ open }) => (
                    <div className='relative'>
                      <Listbox.Button
                        ref={deviceRef}
                        className={cn(
                          open ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300',
                          'flex w-full bg-[#FFF] items-center justify-between px-3 py-2 border rounded-md hover:bg-hover',
                        )}
                      >
                        <span className='font-medium text-md tracking-32 text-neutral-900'>
                          {selectedDevice
                            ? selectedDevice
                            : t('filter.deviceAll.label', 'Device Reference: All', 'Device reference all filter')}
                        </span>
                        <ChevronsUpDownIcon />
                      </Listbox.Button>
                      <Listbox.Options
                        className={cn('absolute h-56 left-0 top-14 z-10 gap-3 p-3 bg-[#FFF] rounded-lg shadow-select')}
                        style={{ width: dateRef.current?.offsetWidth }}
                      >
                        <Scrollbar>
                          {deviceOptions.map((device) => {
                            const { label, value } = device;
                            return (
                              <Listbox.Option key={label} value={value}>
                                {({ active, selected }) => (
                                  <li
                                    className={cn(
                                      'flex items-center justify-between p-3 rounded text-neutral-900 bg-[#FFF]',
                                      active && 'bg-hover',
                                      selected && 'bg-primary-50 text-primary-500',
                                    )}
                                  >
                                    <span className='font-medium text-md tracking-32'>{label}</span>
                                    {selected && <CheckIcon className='text-primary-500' />}
                                  </li>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Scrollbar>
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>
            </div>
          )}
          <DataTable columns={columns} data={filteredEvents} fixHeight={277} isFiltering={isFiltering} />
        </CardContent>
      </Card>
    </>
  );
});

export default ResponsibleTanksPage;
