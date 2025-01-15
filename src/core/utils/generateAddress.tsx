// utils

import { t } from '@core/utils/translate';

interface Address {
  city?: string;
  country?: string;
  state?: string;
  street?: string;
  zip?: string;
}

export function generateAddress(item: Address, separator: string = ', '): string {
  const addressComponents = [item.street, item.city, `${item.state || ''} ${item.zip}`, item.country];
  const filteredAddress = addressComponents.filter(Boolean);
  return filteredAddress.length > 0
    ? filteredAddress.join(separator)
    : t('general.notAvailable.label', 'n/a', 'Not Available.');
}
