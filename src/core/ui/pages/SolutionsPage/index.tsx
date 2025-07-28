import { observer } from 'mobx-react';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { useAuth } from '@core/storages/auth';

// types

import { Solutions } from '@core/ui/types';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Container } from '@core/ui/components/Container';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { SolutionCard } from './SolutionCard';

// icons

import Lightning01LineIcon from '@assets/icons/line/lightning-01.svg?component';
import SmartPoleLineIcon from '@assets/icons/line/smart-pole.svg?component';
import TrackerIcon from '@assets/icons/line/tracker.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';

// pages

import { WaitingPage } from '../WaitingPage';

export const SolutionsPage = observer(() => {
  const auth = useAuth();
  const ui = useUI();
  const locations = useLocations();
  if (!locations.hasData()) return <WaitingPage />;

  return (
    <main className={styles['main']} role='main'>
      <Container className={styles['container']}>
        <Header
          solutionsDomainLink
          solutionSelector={false}
          title={t('solutions.solutionsPage.label', 'Solutions', 'Title of Solutions Page.')}
          widgets={false}
        />
        <Grid className={cn(styles['cards-container'], `grid-rows-${solutions.length / 2}`)}>
          {solutions.map((solution) => (
            <Grid key={solution.title}>
              <SolutionCard
                solution={solution}
                installed={auth.solutions.includes(solution.solutionTitle as Solutions)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
});

const contactUsPath = 'https://iveda.com/contact-us/';

const solutions = [
  {
    icon: <TrackerIcon />,
    installed: true,
    title: t('solutions.solutionsPage.pinPoint.label', 'IvedaRTLS', 'IvedaRTLS solution title.'),
    abbr: '',
    solutionTitle: 'ivedartls',
    caption: t(
      'solutions.solutionsPage.pinPoint.content.label',
      'Iveda RTLS centrally manages IoT trackers and sensors and display them on a map for exact location.',
      'Brief IvedaRTLS solution description label.',
    ),
    options: [
      t('solutions.solutionsPage.pinPoint.options.01', 'Assets', 'Assets option label.'),
      t(
        'solutions.solutionsPage.pinPoint.options.02',
        'Asset and human tracking',
        'Asset and human tracking option label.',
      ),
      t('solutions.solutionsPage.pinPoint.options.03', 'Rules and alerts', 'Rules and alerts option label.'),
      t('solutions.solutionsPage.pinPoint.options.04', 'Heatmaps', 'Heatmaps option label.'),
    ],
    linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for Learn more button.'),
    path: 'https://iveda.com/technology/ivedartls/',
    pathDescription: contactUsPath,
    solutionLink: '/ivedartls',
  },
  {
    icon: <Lightning01LineIcon />,
    installed: true,
    title: t(
      'solutions.solutionsPage.ems.label',
      'Energy Management System',
      'Energy Management System solution Title.',
    ),
    abbr: 'EMS',
    solutionTitle: 'ems',
    caption: t(
      'solutions.solutionsPage.ems.content.label',
      'Iveda Energy Management System solution to monitor and analyze energy usage and demand tracking.',
      'Brief EMS solution description label.',
    ),
    options: [
      t('solutions.solutionsPage.ems.options.01', 'Power management', 'Power management option label.'),
      t('solutions.solutionsPage.ems.options.02', 'Smart power saving', 'Smart power saving option label.'),
      t('solutions.solutionsPage.ems.options.03', 'Demand tracking', 'Demand tracking option label.'),
      t('solutions.solutionsPage.ems.options.04', 'Energy usage analytics', 'Energy usage analytics option label.'),
    ],
    linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
    path: 'https://iveda.com/technology/cerebro-smart-iot-platform/',
    pathDescription: 'null',
    solutionLink: '/ems',
  },
  {
    icon: <SmartPoleLineIcon />,
    installed: false,
    title: t('solutions.solutionsPage.utilus.label', 'Utilus', 'Utilus solution title.'),
    abbr: '',
    solutionTitle: 'utilus',
    caption: t(
      'solutions.solutionsPage.utilus.content.label',
      'IoT platform that manage energy, lightning, security and environmental data using smart sensors, embedded and cloud computing.',
      'Brief Utilus solution description Label.',
    ),
    options: [
      t('solutions.solutionsPage.utilus.options.01', 'Energy management', 'Energy management option label.'),
      t(
        'solutions.solutionsPage.utilus.options.02',
        'UV and ligtning control',
        'UV and ligtning control option label.',
      ),
      t(
        'solutions.solutionsPage.utilus.options.03',
        'Environmental measurements',
        'Environmental measurements option label.',
      ),
      t(
        'solutions.solutionsPage.utilus.options.04',
        'Security and utility alerts',
        'Security and utility alerts option label.',
      ),
    ],
    linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
    path: 'https://iveda.com/utilus/',
    pathDescription: contactUsPath,
    solutionLink: '/utilus',
  },
  {
    icon: <VideoRecorderLineIcon />,
    installed: false,
    title: t('solutions.solutionsPage.ivedaAI.label', 'IvedaAI', 'IvedaAI solution title.'),
    abbr: 'AI',
    solutionTitle: 'ai',
    caption: t(
      'solutions.solutionsPage.ivedaAI.content.label',
      'IvedaAI™ uses deep learning technology for advanced AI Video Search, similar to Google for text search.',
      'Brief IvedaAI solution description label.',
    ),
    options: [
      t(
        'solutions.solutionsPage.ivedaAI.options.01',
        'Real-time video monitoring',
        'Real-time video monitoring option label.',
      ),
      t('solutions.solutionsPage.ivedaAI.options.02', 'Perimeter protection', 'Perimeter protection option label.'),
      t(
        'solutions.solutionsPage.ivedaAI.options.03',
        'Objects and face recognition',
        'Objects and face recognition option label.',
      ),
      t('solutions.solutionsPage.ivedaAI.options.04', 'History of recordings', 'History of recordings option label.'),
    ],
    linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
    path: 'https://iveda.com/technology/ivedaai/',
    pathDescription: contactUsPath,
    solutionLink: '/ai',
  },
  {
    icon: <VideoRecorderLineIcon />,
    installed: true,
    title: t('solutions.solutionsPage.LevelNOW.label', 'LevelNOW', 'LevelNOW solution title.'),
    abbr: '',
    solutionTitle: 'levelnow',
    caption: t(
      'solutions.solutionsPage.levelnow.content.label',
      'IvedaAI™ uses deep learning technology for advanced AI Video Search, similar to Google for text search.',
      'Brief IvedaAI solution description label.',
    ),
    options: [
      t(
        'solutions.solutionsPage.levelnow.options.01',
        'Real-time video monitoring',
        'Real-time video monitoring option label.',
      ),
      t('solutions.solutionsPage.levelnow.options.02', 'Perimeter protection', 'Perimeter protection option label.'),
      t(
        'solutions.solutionsPage.levelnow.options.03',
        'Objects and face recognition',
        'Objects and face recognition option label.',
      ),
      t('solutions.solutionsPage.levelnow.options.04', 'History of recordings', 'History of recordings option label.'),
    ],
    linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
    path: 'https://iveda.com/technology/levelnow/',
    pathDescription: contactUsPath,
    solutionLink: '/levelnow',
  },
];
