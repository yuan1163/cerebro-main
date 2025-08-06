import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRoutes } from './AppRoutes';
import { DataAccessAdapter } from './DataAccessAdapter';
import { UIAdapter } from './UIAdapter';
import { Wrapper } from '@googlemaps/react-wrapper';
import ThemeContextWrapper from './ThemeAdapter/ThemeContextWrapper';
import { TranslationAdapter } from './TranslationAdapter';
export const App = () => (
  <ThemeContextWrapper>
    <DataAccessAdapter>
      <UIAdapter>
        <TranslationAdapter>
          <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Wrapper>
        </TranslationAdapter>
      </UIAdapter>
      <ReactQueryDevtools position='bottom-right' />
    </DataAccessAdapter>
  </ThemeContextWrapper>
);
