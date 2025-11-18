import { Scrollbar } from '@core/ui/components/Scrollbar';
import { t } from '@core/utils/translate';

// Mock data for the statistics table
const statisticsData = [
  {
    objectType: 'Backpack',
    cameraName: 'Ocean City - People and Object Counting Ocean City - People and Object Counting',
    line: '1',
  },
  { objectType: 'Bag', cameraName: 'Ocean City - People and Object Counting', line: '1' },
  { objectType: 'Car', cameraName: 'VN Motorcycle Test 1', line: '1,2' },
  { objectType: 'Motorcycle', cameraName: 'VN Motorcycle Test 1', line: '1,2' },
  { objectType: 'Backpack', cameraName: 'Ocean City - People and Object Counting', line: '1,2' },
  { objectType: 'Backpack', cameraName: 'Ocean City - People and Object Counting', line: '1,2' },
  { objectType: 'Backpack', cameraName: 'Ocean City - People and Object Counting', line: '1,2' },
];

export default function ObjectCountingStatistic() {
  return (
    <div className='flex flex-col flex-1 w-full min-h-0 gap-5'>
      <p className='text-base font-medium text-neutral-900'>
        {t('counting.static.label', 'Object Counting Statistic', 'Label for object counting statistic section')}
      </p>
      <div className='flex flex-col flex-1 w-full min-h-0 gap-1'>
        {/* Header */}
        <div className='flex justify-center gap-4 px-4 py-2'>
          <div className='flex items-center w-[85px]'>
            <p className='text-sm font-medium text-neutral-900'>
              {t('counting.static.objectType.label', 'Object Type', 'Label for object type column')}
            </p>
          </div>
          <div className='w-px h-5 bg-neutral-200' />
          <div className='flex items-center justify-center flex-1 gap-2'>
            <p className='text-sm font-medium text-neutral-900'>
              {t('counting.static.cameraName.label', 'Camera Name', 'Label for camera name column')}
            </p>
          </div>
          <div className='w-px h-5 bg-neutral-200' />
          <div className='flex items-center w-[28px]'>
            <p className='text-sm font-medium text-neutral-900'>
              {t('counting.static.line.label', 'Line', 'Label for line column')}
            </p>
          </div>
        </div>
        {/* Body */}
        <div className='flex-1 w-full min-h-0 '>
          <Scrollbar>
            <div className='flex flex-col justify-center flex-1 w-full'>
              {statisticsData.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center w-full gap-4 px-4 py-2 text-sm font-medium text-secondary-500'
                >
                  <div className='flex items-center justify-center w-[85px]'>
                    <p>{item.objectType}</p>
                  </div>
                  <div className='w-px h-5 bg-transparent' />
                  <div className='flex items-center justify-start flex-1 min-w-0'>
                    <p className='line-clamp-2'>{item.cameraName}</p>
                  </div>
                  <div className='w-px h-5 bg-transparent' />
                  <div className='flex items-center justify-center w-[28px]'>
                    <p>{item.line}</p>
                  </div>
                </div>
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  );
}
