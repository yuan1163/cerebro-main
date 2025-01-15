// types

import { AlertPriority } from '@core/api/types';

export function getAlertPriority(priority: AlertPriority) {
  switch (priority) {
    case AlertPriority.Critical:
      return 'error';
    case AlertPriority.Normal:
      return 'success';
    case AlertPriority.Warning:
      return 'warning';
    case AlertPriority.Trivial:
      return 'trivial';
  }
}
