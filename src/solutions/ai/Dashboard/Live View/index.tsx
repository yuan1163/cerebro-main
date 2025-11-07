import React, { useState } from 'react';

// utils
import { t } from '@core/utils/translate';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Text } from '@core/ui/components/Text';

// icons
import CameraIcon from '@assets/icons/IvedaAI/camera.svg?component';

type Stream = {
  id: string;
  name: string;
  url: string;
};

export const LiveView: React.FC = () => {
  // const streams: Stream[] = useStreams();
  const streams: Stream[] = [];
  return (
    <Accordion
      customTitle={
        <Text component='h2' variant='lg' weight='semibold'>
          {t('dashboard.liveView.label', 'Live View', 'Label for live view section')}
        </Text>
      }
      divider
      defaultOpen
      shadow
      rounded
      variant='solid'
      summaryClass='p-5'
      detailsClass='py-4 px-5 flex flex-col gap-10'
    >
      <div className='grid grid-cols-3 gap-4'>
        <div id='main-stream' className='col-span-3 h-[360px] bg-neutral-200 rounded-[10px]'>
          <video src=''></video>
        </div>
        {Array.from({ length: 9 }).map((_, index) => {
          const stream = streams[index];
          return <StreamItem key={stream?.id || `placeholder-${index}`} stream={stream} />;
        })}
      </div>
    </Accordion>
  );
};

const StreamItem: React.FC<{ stream?: Stream }> = ({ stream }) => {
  const noStream = !stream || stream.url === '';

  return (
    <>
      <div className='w-full h-[120px] flex items-center justify-center rounded-[10px] bg-neutral-200'>
        {!noStream ? <video src={stream.url} className=' h-[120px] object-cover rounded-[10px]' /> : <CameraIcon />}
      </div>
    </>
  );
};
