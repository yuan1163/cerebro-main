import path from 'path';

import { defineConfig } from 'vite';
import packageJson from './package.json';

import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['preval'], // TODO Test
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
    svgr({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'prefixIds',
              params: {
                prefixIds: true,
                prefixClassNames: false,
              },
            },
            'removeViewBox',
            'cleanupIds',
          ],
        },
      },
    }),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
    VitePluginHtmlEnv(),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@nodemodules': path.resolve(__dirname, './node_modules'),
      '@solutions': path.resolve(__dirname, './src/solutions'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@styles': path.resolve(__dirname, './src/styles'),
      'tailwind.config.js': path.resolve(__dirname, './tailwind.config.js'),
      '@config': path.resolve(__dirname, './src/config'),
  // Map CKEditor meta package deep imports to actual source directory.
  'ckeditor5/src': path.resolve(__dirname, './node_modules/ckeditor5/src'),
    },
  },
  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**'],
    },
  // Let @ckeditor/vite-plugin-ckeditor5 handle bundling CKEditor modules.
  // Do not mark ckeditor5 modules as external, otherwise the browser will try
  // to load bare imports like "ckeditor5/src/ui.js" at runtime and fail.
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
  server: {
    proxy: {
      '/api/rsapi': {
        target: 'https://cerebro.sce.pccu.edu.tw/rsapi/cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rsapi/, ''),
        secure: true,
      },
      '/api/lvapi': {
        target: 'https://cerebro.sce.pccu.edu.tw/lvapi/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lvapi/, ''),
        secure: true,
      },
    },
  },
});
