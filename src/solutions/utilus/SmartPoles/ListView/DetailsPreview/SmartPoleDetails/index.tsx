import React from 'react';

import { SmartPoleQuery } from '@solutions/utilus/api/generated';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { CardContent } from '@core/ui/components/CardContent';
import { SummaryTab } from './SummaryTab';
import { Scrollbar } from '@core/ui/components/Scrollbar';

type Props = {
  pole: SmartPoleQuery['smartPole'];
};

export const SmartPoleDetails: React.FC<Props> = ({ pole }) => {
  return <SummaryTab pole={pole} />;
};
