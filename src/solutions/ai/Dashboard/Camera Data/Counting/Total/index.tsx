import { t } from '@core/utils/translate';

type TotalDataItem = {
  label: string;
  value: string;
};

const mockTotalData: TotalDataItem[] = [
  {
    label: t('counting.total.totalIn.label', 'Total In', 'Label for total in count'),
    value: '133,742',
  },
  {
    label: t('counting.total.totalOut.label', 'Total Out', 'Label for total out count'),
    value: '1,948',
  },
  {
    label: t('counting.total.totalOccupancy.label', 'Total Occupancy', 'Label for total occupancy count'),
    value: '131,794',
  },
];

export default function Total() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-base font-medium text-neutral-900'>
        {t('counting.total.label', 'Total', 'Label for total section')}
      </p>
      <div className='flex items-center'>
        {mockTotalData.map((item) => (
          <TotalItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

const TotalItem = ({ label, value }: TotalDataItem) => {
  return (
    <div className='flex flex-col items-center justify-center flex-1 gap-2 px-5'>
      <div className='flex flex-col items-center w-full gap-2 leading-none'>
        <p className='text-sm font-medium text-neutral-900'>{label}</p>
        <p className='text-2xl truncate text-secondary-500'>{value}</p>
      </div>
    </div>
  );
};
