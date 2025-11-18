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

  const solutions = [
    {
      icon: <TrackerIcon />,
      installed: true,
      title: t('solutions.solutionsPage.pinPoint.label', 'IvedaRTLS', 'IvedaRTLS solution title.'),
      abbr: '',
      solutionTitle: 'ivedartls',
      caption: t(
        'solutions.solutionsPage.pinPoint.content.label',
        'Track anything smarter.',
        'Brief IvedaRTLS solution description label.',
      ),
      options: [
        t(
          'solutions.solutionsPage.pinPoint.options.01',
          'Track staff, equipment, and more',
          'Track staff, equipment, and more option label.',
        ),
        t(
          'solutions.solutionsPage.pinPoint.options.02',
          'Manage inventory smarter',
          'Manage inventory smarter option label.',
        ),
        t(
          'solutions.solutionsPage.pinPoint.options.03',
          'Accurate location tracking',
          'Accurate location tracking option label.',
        ),
      ],
      linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for Learn more button.'),
      path: 'https://iveda.com/technology/ivedartls/',
      pathDescription: contactUsPath,
      solutionLink: '/ivedartls',
    },
    {
      icon: <Lightning01LineIcon />,
      installed: true,
      title: t('solutions.solutionsPage.ems.label', 'IvedaEMS', 'Energy Management System solution Title.'),
      abbr: 'EMS',
      solutionTitle: 'ems',
      caption: t(
        'solutions.solutionsPage.ems.content.label',
        'Measure your carbon footprint.',
        'Brief EMS solution description label.',
      ),
      options: [
        t(
          'solutions.solutionsPage.ems.options.01',
          'Smarter power management',
          'Smarter power management option label.',
        ),
        t('solutions.solutionsPage.ems.options.02', 'Track carbon output', 'Track carbon output option label.'),
        t(
          'solutions.solutionsPage.ems.options.03',
          'Simplify energy compliance',
          'Simplify energy compliance option label.',
        ),
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
        'Powering smarter living.',
        'Brief Utilus solution description Label.',
      ),
      options: [
        t(
          'solutions.solutionsPage.utilus.options.01',
          'Transform your city lights',
          'Transform your city lights option label.',
        ),
        t(
          'solutions.solutionsPage.utilus.options.02',
          'Connect environmental sensors',
          'Connect environmental sensors option label.',
        ),
        t(
          'solutions.solutionsPage.utilus.options.03',
          'Monitor and protect your city',
          'Monitor and protect your city option label.',
        ),
      ],
      linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
      path: 'https://iveda.com/utilus/',
      pathDescription: contactUsPath,
      solutionLink: '/utilus',
    },
    {
      icon: <VideoRecorderLineIcon />,
      installed: true,
      title: t('solutions.solutionsPage.ivedaAI.label', 'IvedaAI', 'IvedaAI solution title.'),
      abbr: 'AI',
      solutionTitle: 'ai',
      caption: t(
        'solutions.solutionsPage.ivedaAI.content.label',
        'Transform vision into action.',
        'Brief IvedaAI solution description label.',
      ),
      options: [
        t(
          'solutions.solutionsPage.ivedaAI.options.01',
          'Real-time detection & alerts',
          'Real-time detection & alerts option label.',
        ),
        t(
          'solutions.solutionsPage.ivedaAI.options.02',
          'Sub-2 second forensic search',
          'Sub-2 second forensic search option label.',
        ),
        t(
          'solutions.solutionsPage.ivedaAI.options.03',
          '30+ AI analytic engines',
          '30+ AI analytic engines option label.',
        ),
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
        'Revolutionize liquid management.',
        'Brief IvedaAI solution description label.',
      ),
      options: [
        t(
          'solutions.solutionsPage.levelnow.options.01',
          'Simple oil & fluid level monitoring',
          'Simple oil & fluid level monitoring option label.',
        ),
        t(
          'solutions.solutionsPage.levelnow.options.02',
          'GPS tracking with centralized visibility',
          'GPS tracking with centralized visibility option label.',
        ),
        t(
          'solutions.solutionsPage.levelnow.options.03',
          'Unlock faster sales & operations',
          'Unlock faster sales & operations option label.',
        ),
      ],
      linkContent: t('solutions.solutionsPage.learnMoreButton.label', 'Learn more', 'Label for learn more button.'),
      path: 'https://iveda.com/technology/levelnow/',
      pathDescription: contactUsPath,
      solutionLink: '/levelnow',
    },
  ];

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
