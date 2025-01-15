// types

import { IssuePriority } from '@core/api/types';
import { BrandPalette, SeverityPalette } from '@core/api/typesDesignSystem';

// icons

import AlertCircleSolidIcon from '@assets/icons/solid/alert-circle.svg?component';
import AlertTriangleSolidIcon from '@assets/icons/solid/alert-triangle.svg?component';
import CheckCircleSolidIcon from '@assets/icons/solid/check-circle.svg?component';

function getDeviceCountPriority(riskLevel: number): IssuePriority {
  if (riskLevel > 80) {
    return IssuePriority.Critical;
  } else if (riskLevel >= 45) {
    return IssuePriority.High;
  } else {
    return IssuePriority.Medium;
  }
}

function getSeverity(priority?: IssuePriority): {
  color: BrandPalette | SeverityPalette;
  iconColor: BrandPalette | SeverityPalette;
  icon: React.ReactNode;
} {
  switch (priority) {
    case IssuePriority.Critical:
      return { color: 'error', iconColor: 'error', icon: <AlertCircleSolidIcon /> };
    case IssuePriority.High:
      return { color: 'warning', iconColor: 'warning', icon: <AlertTriangleSolidIcon /> };
    case IssuePriority.Medium:
      return { color: 'primary', iconColor: 'trivial', icon: <CheckCircleSolidIcon /> };
    default:
      return { color: 'primary', iconColor: 'trivial', icon: <CheckCircleSolidIcon /> };
  }
}

export function getDeviceSeverity(riskLevel: number) {
  const priority = getDeviceCountPriority(riskLevel);
  return getSeverity(priority);
}
