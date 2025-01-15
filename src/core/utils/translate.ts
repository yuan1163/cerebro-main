import _ from 'lodash';

import { Language } from '@core/ui/types';
import { languageStorage } from '@core/storages/translation';
import { lazy } from 'react'; // TODO lazy load dictionaries

import en from './translations/en.json';
import zh_cn from './translations/zh_CN.json';
import zh_tw from './translations/zh_TW.json';
import vi from './translations/vi.json';

const dictionaries: Record<Language, object> = {
  'en': en,
  'zh-CN': zh_cn,
  'zh-TW': zh_tw,
  'vi': vi,
};

export const t = (key: string, defaultValue: string, description: string): string => {
  const dictionary = dictionaries[languageStorage.language];
  return _.get(dictionary, `${key}.translation`) || defaultValue;
};
