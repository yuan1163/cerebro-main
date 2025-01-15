import React from 'react';

// types

import { SeverityPalette, SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Decorator } from '@core/ui/components/Decorator';

// icons

import AlertCircleSolidIcon from '@assets/icons/solid/alert-circle.svg?component';
import AlertTriangleSolidIcon from '@assets/icons/solid/alert-triangle.svg?component';
import CheckCircleSolidIcon from '@assets/icons/solid/check-circle.svg?component';
import InfoCircleSolidIcon from '@assets/icons/solid/info-circle.svg?component';

type Props = {
  className?: string;
  disabled?: boolean;
  severity?: SeverityPalette;
} & React.HTMLAttributes<HTMLElement>;

export const SeverityIcon: React.FC<Props> = ({ children, className, disabled, severity }) => {
  let severityIcon;
  switch (severity) {
    case 'error':
      severityIcon = <AlertCircleSolidIcon />;
      break;
    case 'success':
      severityIcon = <CheckCircleSolidIcon />;
      break;
    case 'warning':
      severityIcon = <AlertTriangleSolidIcon />;
      break;
    case 'trivial':
      severityIcon = <AlertCircleSolidIcon />;
      break;
    default:
      severityIcon = <InfoCircleSolidIcon />;
  }
  return (
    <Decorator className={cn(className)} color={severity} disabled={disabled} size='sm'>
      {severityIcon}
    </Decorator>
  );
};
