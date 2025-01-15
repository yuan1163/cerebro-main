import React from 'react';

// styles

import cn from 'classnames';
import buttonStyles from '@core/ui/components/Button/styles.module.scss';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { BadgeHint } from '@core/ui/components/BadgeHint';
import { Decorator } from '@core/ui/components/Decorator';
import { Tab } from '@headlessui/react';

type Props = {
  centered?: boolean;
  className?: string;
  fullWidth?: boolean;
  tabs?: {
    alert?: boolean;
    badge?: number;
    disabled?: boolean;
    endIcon?: React.ReactNode;
    name?: string;
    startIcon?: React.ReactNode;
  }[];
  tabPanels?: Array<any>;
} & React.HTMLAttributes<HTMLElement>;

export const Tabs: React.FC<Props> = ({ className, fullWidth, tabs, tabPanels, ...props }, ref) => {
  return (
    <div className={styles['tab-group']}>
      <Tab.Group>
        <Tab.List className={cn(styles['tab-list'], className)}>
          {tabs?.map((item, index) => (
            <React.Fragment key={index}>
              <Tab
                disabled={item.disabled}
                className={({ selected }) =>
                  cn(
                    buttonStyles['button-base'],
                    buttonStyles['button'],
                    fullWidth && styles['tab-full-width'],
                    item.disabled && styles['button-disabled'],
                    selected && styles['tab-selected'],
                    styles['tab'],
                  )
                }
                key={`tab-${index}`}
              >
                {item.startIcon && <Decorator disabled={item.disabled}>{item.startIcon}</Decorator>}
                {item.alert ? (
                  <BadgeHint color='error' disabled={item.disabled} size='sm' variant='text'>
                    {item.name}
                  </BadgeHint>
                ) : (
                  item.name
                )}
                {item.badge && (
                  <Badge color='secondary' disabled={item.disabled} size='sm' variant='tint'>
                    {item.badge}
                  </Badge>
                )}
                {item.endIcon && <Decorator disabled={item.disabled}>{item.endIcon}</Decorator>}
              </Tab>
            </React.Fragment>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabPanels?.map((item, index) => (
            <Tab.Panel key={index}>{item}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
