import { Scrollbar } from '@core/ui/components/Scrollbar';
import { t } from '@core/utils/translate';

// Mock data for license plate recognition
const lprData = [
  {
    id: '1',
    detectedImage: '/src/assets/images/face.png',
    plateImage: '/src/assets/images/face.png',
    plateNumber: 'RBJ756',
    confidence: 0.9,
    make: 'honda',
    model: 'accord',
    vehicleType: 'Car',
    colors: ['#d8d8d8', '#000000'],
    list: 'Not in list',
    cameraName: '1st Road LPR VC',
    date: '2025-06-04',
    time: '19:29:04',
  },
  {
    id: '2',
    detectedImage: '/src/assets/images/face.png',
    plateImage: '/src/assets/images/face.png',
    plateNumber: 'AJF3017',
    confidence: 0.43,
    make: 'honda',
    model: 'sprinter',
    vehicleType: 'Truck',
    colors: ['#d8d8d8', '#000000'],
    list: 'Not in list',
    cameraName: '1st Road LPR VC',
    date: '2025-06-04',
    time: '19:25:23',
  },
  {
    id: '3',
    detectedImage: '/src/assets/images/face.png',
    plateImage: '/src/assets/images/face.png',
    plateNumber: 'TAJ227',
    confidence: 0.9,
    make: 'honda',
    model: 'odyssey',
    vehicleType: 'Car',
    colors: ['#ffde08'],
    list: 'Not in list',
    cameraName: '1st Road LPR VC',
    date: '2025-06-04',
    time: '19:20:04',
  },
];

type LPRItemProps = {
  detectedImage: string;
  plateImage: string;
  plateNumber: string;
  confidence: number;
  make: string;
  model: string;
  vehicleType: string;
  colors: string[];
  list: string;
  cameraName: string;
  date: string;
  time: string;
};

const LPRItem: React.FC<LPRItemProps> = ({
  detectedImage,
  plateImage,
  plateNumber,
  confidence,
  make,
  model,
  vehicleType,
  colors,
  list,
  cameraName,
  date,
  time,
}) => {
  return (
    <div className='flex items-start w-full gap-px'>
      {/* Detected & Plate Section */}
      <div className='flex flex-col gap-3 w-[160px] px-2'>
        {/* Detected Image */}
        <div className='relative overflow-hidden rounded-lg w-full h-[100px]'>
          <img src={detectedImage} alt='Detected Vehicle' className='object-cover size-full' />
        </div>

        {/* Plate Image */}
        <div className='relative overflow-hidden bg-white rounded-lg w-full h-[100px]'>
          <img src={plateImage} alt='License Plate' className='object-cover size-full' />
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-5 py-0.5 bg-[rgba(101,121,137,0.5)] backdrop-blur-[15.5px] flex items-center justify-center'>
            <p className='text-xs font-semibold text-center text-white'>{plateNumber}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Info Section */}
      <div className='flex-1 flex flex-col gap-2 w-[160px px-2'>
        <p className='text-sm font-semibold text-neutral-900'>
          {plateNumber} ({confidence})
        </p>
        <div className='flex flex-col gap-1 text-sm font-medium text-secondary-500'>
          <p>Make : {make}</p>
          <p>Model : {model}</p>
          <div className='flex items-center gap-1'>
            <p>{vehicleType}</p>
            {colors.map((color, index) => (
              <div key={index} className='rounded-full size-4' style={{ backgroundColor: color }} />
            ))}
          </div>
          <p>List : {list}</p>
        </div>
      </div>

      {/* Time Section */}
      <div className='flex-1 flex flex-col w-[112px px-2 gap-1'>
        <p className='text-sm font-medium text-secondary-500'>{date}</p>
        <p className='text-sm font-medium text-secondary-500'>{time}</p>
      </div>

      {/* Camera & File Section */}
      <div className='flex flex-col gap-1 px-2 w-[132px]'>
        <p className='text-sm font-medium text-secondary-500'>{cameraName}</p>
      </div>
    </div>
  );
};

export default function LPR() {
  return (
    <div className='flex flex-col flex-1 w-full min-h-0 gap-4 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center w-full gap-4 px-4 py-2 bg-neutral-50'>
        <div className='flex items-center justify-center w-32 gap-2'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('lpr.detectedPlate.label', 'Detected & Plate', 'Label for detected and plate column')}
          </p>
        </div>
        <div className='w-px h-5 bg-neutral-200' />
        <div className='flex items-center justify-center flex-1 w-32 gap-2'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('lpr.vehicleInfo.label', 'Vehicle Info', 'Label for vehicle info column')}
          </p>
        </div>
        <div className='w-px h-5 bg-neutral-200' />
        <div className='flex items-center justify-center flex-1 w-20 gap-2'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('lpr.time.label', 'Time', 'Label for time column')}
          </p>
        </div>
        <div className='w-px h-5 bg-neutral-200' />
        <div className='flex items-center justify-center gap-2 w-[100px]'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('lpr.cameraFile.label', 'Camera & File', 'Label for camera and file column')}
          </p>
        </div>
      </div>

      {/* Content */}
      <Scrollbar>
        <div className='flex flex-col gap-4'>
          {lprData.map((item) => (
            <LPRItem
              key={item.id}
              detectedImage={item.detectedImage}
              plateImage={item.plateImage}
              plateNumber={item.plateNumber}
              confidence={item.confidence}
              make={item.make}
              model={item.model}
              vehicleType={item.vehicleType}
              colors={item.colors}
              list={item.list}
              cameraName={item.cameraName}
              date={item.date}
              time={item.time}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}
