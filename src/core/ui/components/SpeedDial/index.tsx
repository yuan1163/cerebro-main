import React from 'react';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { NavLink } from 'react-router-dom';

// styles

import { cn } from '@core/utils/classnames';
import popoverStyles from './styles.module.scss';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Popover } from '@headlessui/react';

type ListItem = {
  id?: string | number;
  listItemicon?: React.ReactNode;
  title?: string;
};

type Props = {
  className?: string;
  icon?: React.ReactNode;
  listItems?: Array<ListItem>;
} & React.HTMLAttributes<HTMLElement>;

export const SpeedDial: React.FC<Props> = ({ children, className, icon, listItems, ...props }) => {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  // let { styles, attributes } = usePopper(referenceElement, popperElement);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
    strategy: 'fixed',
    modifiers: [],
  });

  return (
    <Popover className='relative'>
      <Popover.Button as='div' ref={setReferenceElement} className={cn(className)}>
        <IconButton size='lg' variant='control'>
          {icon}
        </IconButton>
      </Popover.Button>
      <Popover.Panel
        className={popoverStyles['popover-panel']}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <Card fullWidth>
          <CardContent size='sm'>
            <Grid direction='column'>
              {listItems?.map((item) => (
                <Button
                  key={item.id}
                  component={NavLink}
                  startIcon={item.listItemicon}
                  to='/'
                  variant='ghost'
                  style={{ justifyContent: 'start' }}
                >
                  {item.title}
                </Button>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Popover.Panel>
    </Popover>
  );
};
