import { Scrollbar } from '@core/ui/components/Scrollbar';
import { t } from '@core/utils/translate';

// icons
import UserAvatarFallbackIcon from '@assets/icons/IvedaAI/user_avatar_fallback.svg?component';

// Mock data for face recognition
const faceData = [
  {
    id: '1',
    eventFace: '/src/assets/images/face.png',
    targetFace: null,
    matchPercentage: null,
    targetName: null,
    targetList: null,
    targetDescription: null,
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '2',
    eventFace: '/src/assets/images/face.png',
    targetFace: null,
    matchPercentage: null,
    targetName: null,
    targetList: null,
    targetDescription: null,
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '3',
    eventFace: '/src/assets/images/face.png',
    targetFace: '/src/assets/images/face.png',
    matchPercentage: 80,
    targetName: 'Jonathon',
    targetList: 'Casino Managers',
    targetDescription: 'Casino ManagersCasino ManagersCasino ManagersCasino Managers',
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '4',
    eventFace: '/src/assets/images/face.png',
    targetFace: null,
    matchPercentage: null,
    targetName: null,
    targetList: null,
    targetDescription: null,
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '5',
    eventFace: '/src/assets/images/face.png',
    targetFace: '/src/assets/images/face.png',
    matchPercentage: 80,
    targetName: 'Jonathon',
    targetList: 'Casino Managers',
    targetDescription: 'Casino ManagersCasino ManagersCasino ManagersCasino Managers',
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '5',
    eventFace: '/src/assets/images/face.png',
    targetFace: '/src/assets/images/face.png',
    matchPercentage: 80,
    targetName: 'Jonathon',
    targetList: 'Casino Managers',
    targetDescription: 'Casino ManagersCasino ManagersCasino ManagersCasino Managers',
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '5',
    eventFace: '/src/assets/images/face.png',
    targetFace: '/src/assets/images/face.png',
    matchPercentage: 80,
    targetName: 'Jonathon',
    targetList: 'Casino Managers',
    targetDescription: 'Casino ManagersCasino ManagersCasino ManagersCasino Managers',
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
  {
    id: '5',
    eventFace: '/src/assets/images/face.png',
    targetFace: '/src/assets/images/face.png',
    matchPercentage: 80,
    targetName: 'Jonathon',
    targetList: 'Casino Managers',
    targetDescription: 'Casino ManagersCasino ManagersCasino ManagersCasino Managers',
    cameraName: 'Ocean City FR',
    date: '2025-06-04',
    time: '19:30:09',
  },
];

type FaceItemProps = {
  eventFace: string;
  targetFace: string | null;
  matchPercentage: number | null;
  targetName: string | null;
  targetList: string | null;
  targetDescription: string | null;
  cameraName: string;
  date: string;
  time: string;
};

const FaceItem: React.FC<FaceItemProps> = ({
  eventFace,
  targetFace,
  matchPercentage,
  targetName,
  targetList,
  targetDescription,
  cameraName,
  date,
  time,
}) => {
  return (
    <div className='flex items-center w-full gap-2'>
      {/* Face Section */}
      <div className='flex items-center flex-1 gap-4'>
        {/* Event Face */}
        <div className='relative overflow-hidden bg-white rounded-lg shrink-0 size-[100px] ml-2'>
          <img src={eventFace} alt='Event Face' className='object-cover size-full' />
          {matchPercentage && (
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-5 py-0.5 bg-[rgba(101,121,137,0.5)] backdrop-blur-[15.5px] flex items-center justify-center'>
              <p className='text-xs font-semibold text-white'>{matchPercentage}%</p>
            </div>
          )}
        </div>

        {/* Target Face Section */}
        <div className='flex items-center flex-1 gap-3'>
          {targetFace ? (
            <>
              {/* Target Face with Name */}
              <div className='relative overflow-hidden bg-white rounded-lg shrink-0 size-[100px]'>
                <img src={targetFace} alt='Target Face' className='object-cover size-full' />
                {targetName && (
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-5 py-0.5 bg-primary-500 backdrop-blur-[15.5px] flex items-center justify-center'>
                    <p className='text-xs font-semibold text-right text-white'>{targetName}</p>
                  </div>
                )}
              </div>

              {/* Target Details */}
              {targetName && (
                <div className='flex flex-col justify-center gap-1 px-3'>
                  <p className='text-sm font-semibold text-neutral-900'>{targetName}</p>
                  <div className='text-sm font-medium text-secondary-500'>
                    <p>List :</p>
                    <p>{targetList}</p>
                    <p>Description :</p>
                    <p>{targetDescription}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No Match - Empty State */
            <UserAvatarFallbackIcon />
          )}
        </div>
        {/* Camera & Time Section */}
        <div className='w-[148px] px-4 flex flex-col justify-center gap-2'>
          <p className='text-sm font-medium text-secondary-500'>{cameraName}</p>
          <div className='text-sm font-medium text-neutral-500'>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Face() {
  return (
    <div className='flex flex-col flex-1 w-full min-h-0 gap-4 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-center w-full gap-4 px-4 py-2 bg-neutral-50'>
        <div className='flex items-center justify-center w-20 gap-2'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('face.eventFace.label', 'Event Face', 'Label for event face column')}
          </p>
        </div>
        <div className='w-px h-5 bg-neutral-200' />
        <div className='flex items-center justify-center flex-1 gap-2'>
          <p className='text-sm font-medium text-black whitespace-pre'>
            {t('face.targetFace.label', 'Target Face', 'Label for target face column')}
          </p>
        </div>
        <div className='w-px h-5 bg-neutral-200' />
        <div className='flex items-center justify-center gap-2 w-[116px]'>
          <p className='text-sm font-medium whitespace-pre text-neutral-900'>
            {t('face.cameraTime.label', 'Camera & Time ', 'Label for camera and time column')}
          </p>
        </div>
      </div>

      {/* Content */}
      <Scrollbar>
        <div className='flex flex-col gap-4'>
          {faceData.map((item) => (
            <FaceItem
              key={item.id}
              eventFace={item.eventFace}
              targetFace={item.targetFace}
              matchPercentage={item.matchPercentage}
              targetName={item.targetName}
              targetList={item.targetList}
              targetDescription={item.targetDescription}
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
