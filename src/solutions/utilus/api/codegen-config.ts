import { CodegenConfig } from '@graphql-codegen/cli';

export const endpoint = 'https://ntest.iveda.ai/backend/';
export const secret = '253e0b53b2f5addb33cbc4c12921c415';

const config: CodegenConfig = {
  schema: {
    [endpoint]: {
      headers: {
        'x-bag-secret': secret,
      },
    },
  },
  documents: ['src/solutions/utilus/api/graphql/*.graphql'],
  generates: {
    'src/solutions/utilus/api/generated/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: {
          func: '../service#fetcher',
        },
      },
    },
  },
};

export default config;
