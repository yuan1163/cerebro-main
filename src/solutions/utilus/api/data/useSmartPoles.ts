import { useSmartPolesQuery } from '../generated';
import { useCompany } from './useCompany';

export const useSmartPoles = () => {
  const company = useCompany();
  const { data } = useSmartPolesQuery(
    {
      'where': {
        'zone': {
          'is': {
            'formation': {
              'is': {
                'region': {
                  'is': {
                    'companyId': {
                      equals: company?.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    { enabled: !!company?.id },
  );
  return data?.smartPoles;
};
