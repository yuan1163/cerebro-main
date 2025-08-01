import { useState } from 'react';

import { Listbox } from '@headlessui/react';

// UI components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Text } from '@core/ui/components/Text';
import { Button } from '@core/ui/components/Button';
import { Link } from '@core/ui/components/Link';

// Utils
import { t } from '@core/utils/translate';

// Icons
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import { cn } from '@core/utils/classnames';

const data = [
  { name: '>205L', value: 3, color: '#2CD232' },
  { name: '100-250L', value: 6, color: '#FF982F' },
  { name: '<100L', value: 3, color: '#FF4545' },
];

const people = [
  { id: 1, name: 'Durward' },
  { id: 2, name: 'Kenton' },
  { id: 3, name: 'Therese' },
  { id: 4, name: 'Benedict' },
  { id: 5, name: 'Katelyn' },
];

export default function ResponsibleTanks() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card fullWidth fullHeight elevation='xs' className='flex flex-col'>
      <CardHeader className='flex items-center justify-between'>
        <Text component='h3' variant='lg' weight='medium' className='flex items-center tracking-32 text-[#000]'>
          {t(
            'solutions.domainOverview.responsibleTanks',
            'Responsible Tanks',
            "A list of tanks responsible for the domain's operations.",
          )}
        </Text>

        {/* Select */}
        <div className='relative flex items-center ml-auto'>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            {({ open }) => (
              <>
                <Listbox.Button
                  className={cn(
                    open ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300',
                    'flex bg-[#FFF] hover:bg-hover items-center gap-2 px-3 py-1 border rounded-md',
                  )}
                >
                  {selectedPerson.name}
                </Listbox.Button>
                <Listbox.Options
                  className={cn(
                    'absolute bottom-0 right-0 z-10 gap-3 p-3 bg-[#FFF] rounded-lg shadow-select min-w-56 -translate-y-[50px]',
                  )}
                >
                  {people.map((person) => {
                    return (
                      <Listbox.Option key={person.id} value={person}>
                        {({ active, selected }) => (
                          <li
                            className={cn(
                              'flex items-center justify-between p-3 rounded',
                              active && 'bg-hover',
                              selected && 'bg-primary-50 text-primary-500',
                            )}
                          >
                            <span>{person.name}</span>
                            {selected && <CheckIcon className='text-primary-500' />}
                          </li>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </div>
      </CardHeader>
      <CardContent disablePaddingTop className='flex-1'>
        <div className='px-5 py-10 bg-neutral-50 rounded-[10px] flex flex-col justify-between h-full'>
          <div className='flex items-center justify-evenly'>
            {/* Total Counts */}
            <div className='flex flex-col justify-center gap-5'>
              <span className='text-base font-medium tracking-32 text-neutral-900'>Tanks</span>
              <span className='text-[40px] font-medium tracking-[0.8px] text-neutral-900'>{total}</span>
            </div>

            {/* Each Counts */}
            <div className='flex flex-col gap-5'>
              {data.map((item) => (
                <div key={item.name} className='flex items-center justify-between gap-2'>
                  <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: item.color }} />
                  <span className='text-sm font-medium text-secondary-500 min-w-[85px]'>{item.name}</span>
                  <span className='text-sm font-medium text-neutral-900'>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <Button
            component={Link}
            fullWidth
            to='/levelnow/domain/responsibletanks'
            variant='outlined'
            className='text-[18px] font-medium tracking-32 text-neutral-900 rounded-md border-[#0000001F]'
          >
            {t('general.details.label', 'More Details', 'Button or link that allows to access additional information.')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
