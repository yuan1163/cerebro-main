import { observer } from 'mobx-react';

// storages

import { useModals } from '@core/storages/modals';

// styles

import styles from './styles.module.scss';

// components

import { Backdrop } from '@core/ui/components/Backdrop';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';

export const Modals = observer(() => {
  const modals = useModals();
  //console.log('Modals: render', JSON.stringify(modals.stack));

  return (
    <>
      {modals.stack.map((view, key) => (
        <Backdrop key={`modals:${key}`}>
          <Card className={styles['card']}>
            <CardContent>{view}</CardContent>
          </Card>
        </Backdrop>
      ))}
    </>
  );

  return null;
});
