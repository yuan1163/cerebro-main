import { useParams } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Header } from '@core/ui/utilus/Header';
import { SmartPoleDetails } from './SmartPoleDetails';
import { SmartPoleEvents } from './SmartPoleEvents';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// data
import { useSmartPole } from '@solutions/utilus/api/data/useSmartPole';

export const DetailsView = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;
  const pole = useSmartPole(id);
  return (
    <>
      <Header backLink title={t('solutions.smartPoles.label', 'Smart Poles', 'Smart Poles')} />
      <UnitContainer>
        <Unit>
          <SmartPoleDetails pole={pole} />
        </Unit>
        <Unit variant='sidebar'>
          <SmartPoleEvents pole={pole} />
        </Unit>
      </UnitContainer>
    </>
  );
};
