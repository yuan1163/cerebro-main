// styles

import styles from './styles.module.scss';

// utils

import { t } from '@core/utils/translate';

// components

import { AuthPageLayout } from '@core/ui/templates/AuthPageLayout';
import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import AlertTriangleLineIcon from '@assets/icons/line/alert-triangle.svg?component';
import Key01LineIcon from '@assets/icons/line/key-01.svg?component';
import Lock01LineIcon from '@assets/icons/line/lock-01.svg?component';
import SearchMdLineIcon from '@assets/icons/line/search-md.svg?component';
import ServerErrorLineIcon from '@assets/icons/line/server-error.svg?component';

export const ErrorPage = () => {
  const getResponseStatus = (responseStatus: any) => {
    switch (responseStatus) {
      case 400:
        return {
          icon: <AlertTriangleLineIcon />,
          title: t(
            'general.badRequest.label',
            'Bad request',
            'Error response indicating that a server cannot process the request due to client-side issues.',
          ),
          caption: t(
            'general.badRequestCaption.label',
            'Sorry, your browser sent a request that this server could not understand.',
            "This message indicates that the server couldn't process the request due to incompatible or unexpected input from the user's browser.",
          ),
          statusCode: 400,
        };
      case 401:
        return {
          icon: <Key01LineIcon />,
          title: t(
            'general.unauthorized.label',
            'Unauthorized',
            'Indicates that a user lacks the necessary permissions to access a specific resource.',
          ),
          caption: t(
            'general.unauthorizedCaption.label',
            'Sorry, we couldn’t validate your credentials, you are need authorized to access this page.',
            "This message means the user's credentials are invalid or insufficient, restricting access to the desired page.",
          ),
          statusCode: 401,
        };
      case 403:
        return {
          icon: <Lock01LineIcon />,
          title: t(
            'general.accessDenied.label',
            'Access denied',
            'Permission to access a specific resource or action has been refused.',
          ),
          caption: t('general.accessDeniedCaption.label', 'Access denied', 'Prohibited entry.'),
          statusCode: 403,
        };
      case 404:
        return {
          icon: <SearchMdLineIcon />,
          title: t('general.pageNotFound.label', 'Page not found.', 'The requested webpage is unavailable.'),
          caption: t(
            'general.pageNotFoundCaption.label',
            'Sorry, the page you’re looking for doesn’t exist anymore or has been moved or archived.',
            'This message informs users that the desired webpage is no longer available or has been relocated or stored elsewhere.',
          ),
          statusCode: 404,
        };
      case 500:
        return {
          icon: <ServerErrorLineIcon />,
          title: t(
            'general.internalServerError.label',
            'Internal server error.',
            'Signifies a generic problem on the server side, preventing it from fulfilling the request.',
          ),
          caption: t(
            'general.internalServerErrorCaption.label',
            'Sorry, something went wrong.',
            'This caption conveys that an unexpected issue occurred.',
          ),
          statusCode: 500,
        };
      case 501:
        return {
          icon: <ServerErrorLineIcon />,
          title: t(
            'general.notImplemented.label',
            'Not implemented.',
            "Indicates that the server recognizes the request method but hasn't been programmed to handle or support it.",
          ),
          caption: t(
            'general.notImplementedCaption.label',
            'Sorry, the server either does not recognize the request method, or it lacks the ability to fulfill the request.',
            "This message means the server can't process the request due to an unrecognized method or an inability to execute the desired action.",
          ),
          statusCode: 501,
        };
      case 502:
        return {
          icon: <ServerErrorLineIcon />,
          title: t(
            'general.notImplemented.label',
            'Not implemented.',
            "Indicates that the server recognizes the request method but hasn't been programmed to handle or support it.",
          ),
          caption: t(
            'general.notImplementedCaption.label',
            'Sorry, the server either does not recognize the request method, or it lacks the ability to fulfill the request.',
            "This message means the server can't process the request due to an unrecognized method or an inability to execute the desired action.",
          ),
          statusCode: 502,
        };
      case 503:
        return {
          icon: <ServerErrorLineIcon />,
          title: t(
            'general.serviceUnavailable.label',
            'Service unavailable.',
            'Indicates that the server is temporarily unable to handle the request due to various reasons such as maintenance or overload.',
          ),
          caption: t(
            'general.serviceUnavailableCaption.label',
            'Sorry, the server temporarily busy, try again later.',
            'The server is currently busy, and user should retry a request later.',
          ),
          statusCode: 503,
        };
      case 504:
        return {
          icon: <ServerErrorLineIcon />,
          title: t(
            'general.gatewayTimeout.label',
            'Gateway timeout.',
            "Error message indicating that a server acting as a gateway or intermediary didn't receive a timely response from another server it was trying to access.",
          ),
          caption: t(
            'general.gatewayTimeoutCaption.label',
            'Sorry, this page is taking way too long to load.',
            'This message notifies users that the webpage is loading very slowly, suggesting that they may need to wait longer for it to become accessible.',
          ),
          statusCode: 504,
        };
    }
  };

  return (
    <AuthPageLayout>
      <Grid>
        <Grid alignItems='center' container direction='column' justifyContent='center'>
          <Grid item>
            <Icon className={styles['icon']} color='secondary' rounded size='3xl' variant='tint'>
              {getResponseStatus(404)?.icon}
            </Icon>
          </Grid>
          <Grid item>
            <Text align='center' className={styles['title']} component='h1' variant='3xl' weight='semibold'>
              {getResponseStatus(404)?.title}
            </Text>
          </Grid>
          <Grid item>
            <Text align='center' className={styles['caption']} color='typography-secondary' variant='lg'>
              {getResponseStatus(404)?.caption}
            </Text>
          </Grid>
          <Grid item>
            <Text
              align='center'
              casing='uppercase'
              className={styles['error']}
              color='typography-tertiary'
              variant='base'
              weight='medium'
            >
              HTTP ERROR {getResponseStatus(404)?.statusCode}
            </Text>
          </Grid>
          <Grid item className={styles['buttons-wrapper']}>
            <Grid alignItems='center' justifyContent='center' container spacing={4}>
              <Grid item>
                <Button size='lg' variant='outlined'>
                  {t('general.goBack.label', 'Go back', 'Go back button or link.')}
                </Button>
              </Grid>
              <Grid item>
                <Button size='lg' variant='solid'>
                  {t('general.takeMeHome.label', 'Take me home', 'Take me home button or link.')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthPageLayout>
  );
};
