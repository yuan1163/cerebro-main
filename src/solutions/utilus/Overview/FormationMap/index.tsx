import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Map } from '@core/ui/utilus/Map';

// icons

// data
import { useSmartPolesFormation } from '@solutions/utilus/api/data/useSmartPolesFormation';
import { useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
  formationId?: number;
};

const OVERVIEW_ZOOM = 16;

export const FormationMap: React.FC<Props> = ({ formationId, className }) => {
  const smartPoles = useSmartPolesFormation(formationId);
  const navigate = useNavigate();
  return smartPoles ? (
    <Map
      points={smartPoles}
      zoom={OVERVIEW_ZOOM}
      className={className}
      onSelect={(pole) => navigate(`/utilus/poles/${formationId}/details/${pole.id}`)}
    />
  ) : null;
};
