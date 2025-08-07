import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@core/utils/classnames';
import { Button } from '@core/ui/components/Button';

type TabsProps = {
  tabs: string[];
  className?: string;
};

export default function Tabs({ tabs, className }: TabsProps) {
  return (
    <Tab.Group>
      <Tab.List className='p-1 border rounded-md border-neutral-200'>
        <div className='flex items-center gap-1.5'>
          {tabs.map((tab, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <Button
                  className={cn(
                    selected ? 'text-neutral-900 bg-common-white' : 'text-neutral-500 ',
                    'text-md font-medium tracking-wide px-3 py-2 rounded-md shadow-tab',
                  )}
                >
                  {tab}
                </Button>
              )}
            </Tab>
          ))}
        </div>
      </Tab.List>
    </Tab.Group>
  );
}
