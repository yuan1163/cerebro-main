import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Chip } from '@core/ui/components/Chip';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Link } from '@core/ui/components/Link';
import { Text } from '@core/ui/components/Text';
import { UnorderedList } from '@core/ui/components/UnorderedList';

// icons

import CheckIcon from '@assets/icons/line/check.svg?component';
import LinkExternalIcon from '@assets/icons/line/link-external-01.svg?component';

// images

import MapActiveLight from '@assets/images/worldMap/map_active_light.svg?component';
import MapActiveDark from '@assets/images/worldMap/map_active_dark.svg?component';
import MapDisabledDark from '@assets/images/worldMap/map_disabled_dark.svg?component';
import MapDisabledLight from '@assets/images/worldMap/map_disabled_light.svg?component';

type Solution = {
  abbr?: string;
  caption?: string;
  coordinates?: string;
  icon?: React.ReactNode;
  linkContent?: string;
  options?: Array<string>;
  path?: string;
  pathDescription?: string;
  solutionLink?: string;
  title?: string;
};

type Props = {
  installed?: boolean;
  solution: Solution;
};

const MapActive = () => (
  <>
    <span className='dark:hidden'>
      <MapActiveLight />
    </span>
    <span className='light:hidden'>
      <MapActiveDark />
    </span>
  </>
);

const MapDisabled = () => (
  <>
    <span className='dark:hidden'>
      <MapDisabledLight />
    </span>
    <span className='light:hidden'>
      <MapDisabledDark />
    </span>
  </>
);

export const SolutionCard: React.FC<Props> = ({ solution, installed }) => {
  return (
    <Card className={cn(styles['card'], installed && styles['card-installed'])} elevation='xs'>
      {installed && solution.solutionLink && <Link className={styles['link']} to={`${solution.solutionLink}`} />}
      <Card square className='flex-1'>
        <CardContent
          fullHeight
          fullWidth
          className={cn(
            styles['content-container'],
            installed && styles['content-container-installed'],
            installed
              ? 'before:bg-gradient-primary-tint dark:before:bg-gradient-primary-tint-dark'
              : 'before:bg-gradient-secondary-tint dark:before:bg-gradient-secondary-tint-dark',
          )}
          size='lg'
        >
          <span
            className={cn(
              styles['content-container-bg-image'],
              installed && styles['content-container-bg-image-installed'],
            )}
          >
            {installed ? <MapActive /> : <MapDisabled />}
          </span>
          <Grid justifyContent='between' direction='column' fullWidth fullHeight className={styles['content']}>
            <Grid alignItems='start' justifyContent='between' className={styles['content-header']}>
              <Icon size='3xl' color={installed ? 'primary' : 'secondary'} variant='tint'>
                {solution.icon}
              </Icon>
              {installed ? (
                <Chip className={styles['chip']} color='primary'>
                  {t('solutions.solutionsPage.installedChip.label', 'Installed', 'Label for installed chip.')}
                </Chip>
              ) : (
                <Chip className={styles['chip']} color='trivial'>
                  {t(
                    'solutions.solutionsPage.notInstalledChip.label',
                    'Not installed',
                    'Label for Not installed chip.',
                  )}
                </Chip>
              )}
            </Grid>

            <Grid className={styles['content']}>
              <Grid container direction='column' justifyContent='start' spacing={2}>
                <Grid item>
                  <Text component='h2' variant='xl' weight='semibold'>
                    {solution.title}
                  </Text>
                </Grid>
                <Grid item>
                  <Text color='typography-secondary' variant='paragraph-md' weight='medium'>
                    {solution.caption}
                  </Text>
                </Grid>
                <Grid item>
                  <Button
                    className={styles['button-link']}
                    component={Link}
                    disabled={solution.path === 'null' && true}
                    endIcon={<LinkExternalIcon />}
                    to={solution.path!}
                    variant='link'
                    target='_blank'
                  >
                    {solution.linkContent}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* DESCRIPTION */}

      <Card className={styles['description-container']} square>
        <CardContent fullHeight size='lg'>
          <Grid direction='column' fullHeight justifyContent='between'>
            <UnorderedList
              color='typography-secondary'
              className={styles['list-item']}
              listMarker={<CheckIcon />}
              listMarkerColor='primary'
              options={solution.options}
              size='sm'
            />
            {installed ? (
              <Button
                className={styles['button']}
                component={Link}
                fullWidth
                to={solution.solutionLink!}
                variant='solid'
              >
                {t('general.goToButton.label', 'Go to', 'Label for Go to button.')} {solution.abbr || solution.title}
              </Button>
            ) : (
              <Button
                className={styles['button']}
                component={Link}
                fullWidth
                target='_blank'
                to={solution.pathDescription!}
                variant='outlined'
              >
                {t(
                  'solutions.solutionsPage.contactSalesButton.label',
                  'Contact sales',
                  'Label for contact sales button.',
                )}
              </Button>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Card>
  );
};
