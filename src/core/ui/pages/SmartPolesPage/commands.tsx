import { Command } from '@core/ui/types';
import { SmartPolesPage } from '.';

// utils

import { t } from '@core/utils/translate';

// icons

import LightBulb02LineIcon from '@assets/icons/line/lightbulb-02.svg?component';
import LightBulb02SolidIcon from '@assets/icons/solid/lightbulb-02.svg?component';
import PlugInLineIcon from '@assets/icons/line/plug-in.svg?component';
import PlugInSolidIcon from '@assets/icons/solid/plug-in.svg?component';
import Dataflow04LineIcon from '@assets/icons/line/dataflow-04.svg?component';
import Dataflow04SolidIcon from '@assets/icons/solid/dataflow-04.svg?component';
import SmartPoleLineIcon from '@assets/icons/line/smart-pole.svg?component';
import SmartPoleSolidIcon from '@assets/icons/solid/smart-pole.svg?component';
import Thermometer03LineIcon from '@assets/icons/line/thermometer-03.svg?component';
import Thermometer03SolidIcon from '@assets/icons/solid/thermometer-03.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';
import VideoRecorderSolidIcon from '@assets/icons/solid/video-recorder.svg?component';

export const commands: Command[] = [
  {
    id: '1',
    icon: <SmartPoleLineIcon />,
    iconSolid: <SmartPoleSolidIcon />,
    title: t('solutions.smartPoles.label', 'Smart Poles', 'Smart Poles'),
    subtitle: t(
      'solutions.smartPolesCaption.label',
      'Explore locations of smart poles and alerts',
      'Smart Poles caption.',
    ),
    url: 'smart-poles',
    element: <SmartPolesPage />,
  },
  {
    id: '2',
    icon: <PlugInLineIcon />,
    iconSolid: <PlugInSolidIcon />,
    title: t('solutions.power.label', 'Power', 'Power metrics.'),
    subtitle: t('solutions.powerCaption.label', 'Explore power metrics of selected area', 'Power metrics caption.'),
    url: 'null',
    element: null,
  },
  {
    id: '3',
    icon: <LightBulb02LineIcon />,
    iconSolid: <LightBulb02SolidIcon />,
    title: t('solutions.lighting.label', 'Lighting', 'Lighting metrics.'),
    subtitle: t('solutions.lightingCaption.label', 'Observe what happened with lights', 'Lighting metrics caption.'),
    url: 'null',
    element: null,
  },
  {
    id: '4',
    icon: <Thermometer03LineIcon />,
    iconSolid: <Thermometer03SolidIcon />,
    title: t('solutions.environment.label', 'Environment', 'Environment metrics.'),
    subtitle: t('solutionsd.environmentCaption.label', 'Explore environmental data', 'Environment metrics caption.'),
    url: 'null',
    element: null,
  },
  {
    id: '5',
    icon: <Dataflow04LineIcon />,
    iconSolid: <Dataflow04SolidIcon />,
    title: t('solutions.networks.label', 'Networks', 'Networks metrics.'),
    subtitle: t('solutions.networksCaption.label', 'Check connections and networks', 'Networks metrics caption.'),
    url: 'null',
    element: null,
  },
  {
    id: '6',
    icon: <VideoRecorderLineIcon />,
    iconSolid: <VideoRecorderSolidIcon />,
    title: t('solutions.cameras.label', 'Cameras', 'Cameras metrics.'),
    subtitle: t('solutions.camerasCaption.label', 'Observe what happened on cameras', 'Cameras metrics caption.'),
    url: 'null',
    element: null,
  },
];
