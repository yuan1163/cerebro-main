import { t } from '@core/utils/translate';
import { ClientData, ClientTank, TankData } from '@core/api/types';

// Tank
export const getTankFields = (tank: ClientTank | null) => [
  {
    name: 'tankNo',
    label: t('tank.tankNo.label', 'Tank No.', 'Tank number field.'),
    value: tank?.tankNo || '-',
  },
  {
    name: 'deviceDescription',
    label: t('tank.description.label', 'Description', 'Tank description field.'),
    value: tank?.deviceDescription || '-',
  },
  {
    name: 'deviceOilType',
    label: t('tank.oilType.label', 'Oil Type', 'Tank oil type field.'),
    value: tank?.deviceOilType || '-',
  },
  {
    name: 'deviceOilViscosity',
    label: t('tank.oilViscosity.label', 'Oil Viscosity', 'Tank oil viscosity field.'),
    value: tank?.deviceOilViscosity || '-',
  },
  {
    name: 'deviceFillingDate',
    label: t('tank.lastOilFillingDate.label', 'Last Oil Filling Date', 'Tank last oil filling date field.'),
    value: tank?.deviceFillingDate ? new Date(tank.deviceFillingDate).toLocaleDateString() : '-',
  },
];

export const getTankLevelFields = (tank: TankData | null) => [
  {
    name: 'deviceReference',
    label: t('tank.deviceReference.label', 'Device Reference', 'Tank device reference field.'),
    value: tank?.deviceReference || '-',
  },
  {
    name: 'deviceBattery',
    label: t('tank.batteryLevel.label', 'Battery Level', 'Tank battery level field.'),
    value: tank?.deviceBattery || '-',
  },
  {
    name: 'gatewayVersion',
    label: t('tank.gatewayVersion.label', 'Gateway Version', 'Tank gateway version field.'),
    value: tank?.gatewayVersion || '-',
  },
  {
    name: 'deviceConnection',
    label: t('tank.gatewayStatus.label', 'Gateway Status', 'Tank gateway status field.'),
    value: tank?.deviceConnection || '-',
  },
];

// Customer
export const getCustomerProfileFields = (customer: ClientData | null) => [
  {
    name: 'customerName',
    label: t('customer.customerName.label', 'Customer Name', 'Customer name field.'),
    value: customer?.clientName || '-',
    placeholder: 'Enter customer name',
  },
  {
    name: 'customerNo',
    label: t('customer.customerNo.label', 'Customer No.', 'Customer number field.'),
    value: customer?.clientNo || '-',
    placeholder: 'Enter customer no.',
  },
  {
    name: 'primaryContact',
    label: t('customer.primaryContact.label', 'Primary Contact', 'Primary contact field.'),
    value: customer?.clientContact || '-',
    placeholder: 'Enter primary contact',
  },
  {
    name: 'mobileNo',
    label: t('customer.mobileNo.label', 'Mobile No.', 'Mobile number field.'),
    value: customer?.clientPhone || '-',
    placeholder: 'Enter mobile number',
  },
  {
    name: 'address',
    label: t('customer.address.label', 'Address', 'Address field.'),
    value: customer?.clientAddress || '-',
    placeholder: 'Enter address',
  },
  {
    name: 'postcode',
    label: t('customer.postcode.label', 'Post code', 'Post code field.'),
    value: customer?.clientPostCode || '-',
    placeholder: 'Enter post code',
  },
  {
    name: 'country',
    label: t('customer.country.label', 'Country', 'Country field.'),
    value: customer?.clientCountry || '-',
    placeholder: 'Enter country',
  },
  {
    name: 'state',
    label: t('customer.state.label', 'State', 'State field.'),
    value: customer?.clientState || '-',
    placeholder: 'Enter state',
  },
  {
    name: 'city',
    label: t('customer.city.label', 'City', 'City field.'),
    value: customer?.clientCity || '-',
    placeholder: 'Enter city',
  },
];

export const getCustomerPositionFields = (customer: ClientData | null) => [
  {
    name: 'latitude',
    label: t('customer.latitude.label', 'Latitude', 'Latitude field.'),
    value: customer?.latitude || '-',
    placeholder: 'Enter latitude',
  },
  {
    name: 'longitude',
    label: t('customer.longitude.label', 'Longitude', 'Longitude field.'),
    value: customer?.longitude || '-',
    placeholder: 'Enter longitude',
  },
];

export const getCustomerGWFields = (customer: ClientData | null) => [
  {
    name: 'gwsalesrep',
    label: t('customer.gwsalesrep.label', 'GW Sales Rep', 'Sales representative field.'),
    value: customer?.salesRepUserId || '-',
    placeholder: 'Enter sales rep',
  },
  {
    name: 'gwcustomerservicerep',
    label: t(
      'customer.gwcustomerservicerep.label',
      'GW Customer Service Rep',
      'Customer service representative field.',
    ),
    value: customer?.customerServiceRepUserId || '-',
    placeholder: 'Enter customer service rep',
  },
];
export const getCustomerGWNameFields = (customer: ClientData | null) => [
  {
    label: t('customer.gwsalesrep.name.label', 'GW Sales Rep Name', 'Sales representative field.'),
    value: customer?.salesRepUserName || '-',
  },
  {
    label: t(
      'customer.gwcustomerservicerep.name.label',
      'GW Customer Service Rep Name',
      'Customer service representative field.',
    ),
    value: customer?.customerServiceRepUserName || '-',
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
