import { t } from '@core/utils/translate';
import { ClientData, ClientTank } from '@core/api/types';

// Customer
export const getCustomerProfileFields = (customer: ClientData | null) => [
  {
    name: 'customerName',
    label: t('customer.customerName.label', 'Customer Name', 'Customer name field.'),
    value: customer?.clientName || '-',
  },
  {
    name: 'customerNo',
    label: t('customer.customerNo.label', 'Customer No.', 'Customer number field.'),
    value: customer?.clientNo || '-',
  },
  {
    name: 'primaryContact',
    label: t('customer.primaryContact.label', 'Primary Contact', 'Primary contact field.'),
    value: customer?.clientContact || '-',
  },
  {
    name: 'mobileNo',
    label: t('customer.mobileNo.label', 'Mobile No.', 'Mobile number field.'),
    value: customer?.clientPhone || '-',
  },
  {
    name: 'postcode',
    label: t('customer.postcode.label', 'Post code', 'Post code field.'),
    value: customer?.clientPostCode || '-',
  },
  {
    name: 'country',
    label: t('customer.country.label', 'Country', 'Country field.'),
    value: customer?.clientCountry || '-',
  },
  {
    name: 'state',
    label: t('customer.state.label', 'State', 'State field.'),
    value: customer?.clientState || '-',
  },
  {
    name: 'city',
    label: t('customer.city.label', 'City', 'City field.'),
    value: customer?.clientCity || '-',
  },
];

export const getCustomerGWFields = (customer: ClientData | null) => [
  {
    name: 'gwsalesrep',
    label: t('customer.gwsalesrep.label', 'GW Sales Rep', 'Sales representative field.'),
    value: customer?.salesRepUserId || '-',
  },
  {
    name: 'gwcustomerservicerep',
    label: t(
      'customer.gwcustomerservicerep.label',
      'GW Customer Service Rep',
      'Customer service representative field.',
    ),
    value: customer?.customerServiceRepUserId || '-',
  },
];

export const getCustomerTankFields = (clientTank: ClientTank | null) => [
  {
    name: 'tankNo',
    label: t('tank.tankNo.label', 'Tank No.', 'Tank number field.'),
    value: clientTank?.tankNo || '-',
  },
  {
    name: 'description',
    label: t('tank.description.label', 'Description', 'Tank description field.'),
    value: clientTank?.deviceDescription || '-',
  },
  {
    name: 'oilType',
    label: t('tank.oilType.label', 'Oil Type', 'Tank oil type field.'),
    value: clientTank?.deviceOilType || '-',
  },
  {
    name: 'oilViscosity',
    label: t('tank.oilViscosity.label', 'Oil Viscosity', 'Tank oil viscosity field.'),
    value: clientTank?.deviceOilViscosity || '-',
  },
  {
    name: 'lastOilFillingDate',
    label: t('tank.lastOilFillingDate.label', 'Last Oil Filling Date', 'Tank last oil filling date field.'),
    value: clientTank?.deviceFillingDate ? new Date(clientTank.deviceFillingDate).toLocaleDateString() : '-',
  },
];
