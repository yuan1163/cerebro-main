/// <reference types="vite/client" />
declare module '*.svg?component';

type ElementOf<ArrayType> = ArrayType extends Array<infer ElementType> ? ElementType : never;

declare module 'tailwind.config.js' {
  const config: Config;
  export default config;
}

interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}