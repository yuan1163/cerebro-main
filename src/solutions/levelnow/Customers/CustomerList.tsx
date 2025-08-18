import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@core/ui/levelnow/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { ClientData } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import { useState } from 'react';

import { cn } from '@core/utils/classnames';

import Select from '@core/ui/levelnow/Select';
import { Link } from '@core/ui/components/Link';

type CustomerListProps = {
  customers: ClientData[];
  selectedClientId: number | null;
  searchQuery: string;
  isAdd: boolean;
  onToggleAdd: () => void;
};
type CustomerItemProps = {
  customer: ClientData;
  selectedClientId: number | null;
};

export default function CustomerList({
  customers,
  selectedClientId,
  searchQuery,
  isAdd,
  onToggleAdd,
}: CustomerListProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  const getUnique = (data: ClientData[], key: keyof ClientData): string[] => {
    return Array.from(
      new Set(
        data
          .map((item) => item[key])
          .filter((item) => item)
          .map((item) => String(item))
          .sort((a, b) => a.localeCompare(b)),
      ),
    );
  };
  const countries = getUnique(customers, 'clientCountry');
  const states = getUnique(customers, 'clientState');
  const cities = getUnique(customers, 'clientCity');

  const countryOptions = [
    { label: 'Country: All', value: 'all' },
    ...countries.map((country) => ({ label: country, value: country })),
  ];
  const stateOptions = [
    { label: 'State: All', value: 'all' },
    ...states.map((state) => ({ label: state, value: state })),
  ];
  const cityOptions = [{ label: 'City: All', value: 'all' }, ...cities.map((city) => ({ label: city, value: city }))];

  const handleCountrySelect = (selectedCountry: string) => {
    setCountryFilter(selectedCountry === 'all' ? null : selectedCountry);
  };
  const handleStateSelect = (selectedState: string) => {
    setStateFilter(selectedState === 'all' ? null : selectedState);
  };
  const handleCitySelect = (selectedCity: string) => {
    setCityFilter(selectedCity === 'all' ? null : selectedCity);
  };

  const handleFilter = (customers: ClientData[]) => {
    let filteredCustomers = customers;
    if (countryFilter) {
      filteredCustomers = filteredCustomers.filter((customer) => customer.clientCountry === countryFilter);
    }
    if (stateFilter) {
      filteredCustomers = filteredCustomers.filter((customer) => customer.clientState === stateFilter);
    }
    if (cityFilter) {
      filteredCustomers = filteredCustomers.filter((customer) => customer.clientCity === cityFilter);
    }
    if (searchQuery) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.clientNo.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return filteredCustomers;
  };

  const filteredCustomers = handleFilter(customers);

  const filterCounts = (() => {
    let counts = 0;
    if (countryFilter) {
      counts++;
    }
    if (stateFilter) {
      counts++;
    }
    if (cityFilter) {
      counts++;
    }
    return counts;
  })();

  const handleClearFilters = () => {
    setCountryFilter(null);
    setStateFilter(null);
    setCityFilter(null);
    setOpenFilter(false);
  };

  return (
    <Card className='grid grid-rows-[auto_1fr] h-full'>
      <CardHeader borderBottom>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span>All</span>
              <NumberBadge variant='gray' number={filteredCustomers.length} />
              <AddButton label='Customer' onClick={onToggleAdd} disabled={isAdd} />
            </div>
            <FilterButton
              onClick={() => setOpenFilter(!openFilter)}
              counts={filterCounts}
              onClear={handleClearFilters}
            />
          </div>
          {openFilter && (
            <div className='flex flex-col gap-3 mt-5'>
              <Select options={countryOptions} activedFilter={countryFilter} handleSelect={handleCountrySelect} />
              <Select options={stateOptions} activedFilter={stateFilter} handleSelect={handleStateSelect} />
              <Select options={cityOptions} activedFilter={cityFilter} handleSelect={handleCitySelect} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent
        scrollable
        className={cn(openFilter ? 'h-[calc(100vh-414px)]' : 'h-[calc(100vh-244px)]', 'p-0')}
        disablePaddingTop
      >
        <Scrollbar>
          <div className='flex flex-col'>
            {filteredCustomers.map((customer) => (
              <CustomerItem key={customer.clientId} selectedClientId={selectedClientId} customer={customer} />
            ))}
          </div>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}

function CustomerItem({ customer, selectedClientId }: CustomerItemProps) {
  const isSelected = selectedClientId === customer.clientId;
  const itemClass = isSelected ? 'bg-primary-50' : 'hover:bg-hover';

  const customerAddress = `${customer.clientAddress}, ${customer.clientCity}, ${customer.clientState}, ${customer.clientCountry}`;
  return (
    <Link
      to={`/levelnow/customers/${customer.clientId}`}
      className={cn(itemClass, 'flex flex-col gap-1 border-b px-10 py-7 border-neutral-200 cursor-pointer')}
    >
      <div className='text-sm font-medium tracking-28 text-neutral-900'>{customer.clientNo}</div>
      <div className='font-medium text-md tracking-32 text-neutral-900'>{customer.clientName}</div>
      <div className='font-medium text-md tracking-32 text-secondary-500'>{customerAddress}</div>
    </Link>
  );
}
