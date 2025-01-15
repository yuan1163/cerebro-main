import { Language } from '@core/ui/types';

export const languages: {
  id: Language;
  name: string;
  localName: string;
}[] = [
  { id: 'en', name: 'English', localName: 'English' },
  { id: 'zh-TW', name: 'Chinese (Traditional)', localName: '繁體中文' },
  { id: 'zh-CN', name: 'Chinese (Simplified)', localName: '简体中文' },
  { id: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt' },
];

// MAPBOX

export type LanguageCode = 'en' | 'zh-Hant' | 'zh-Hans' | 'vi';

const LANGUAGE_MAP: Record<LanguageCode, string> = languages.reduce((acc, { id, name }) => {
  let key: LanguageCode;
  switch (id) {
    case 'zh-TW':
      key = 'zh-Hant';
      break;
    case 'zh-CN':
      key = 'zh-Hans';
      break;
    default:
      key = id as LanguageCode;
  }
  acc[key] = name;
  return acc;
}, {} as Record<LanguageCode, string>);

export function transformLanguageCode(language: Language): LanguageCode {
  switch (language) {
    case 'zh-CN':
      return 'zh-Hans';
    case 'zh-TW':
      return 'zh-Hant';
    default:
      return language as LanguageCode;
  }
}

const getLanguageName = (language: Language): string => {
  const languageCode = transformLanguageCode(language);
  return LANGUAGE_MAP[languageCode] || 'browser';
};

export { LANGUAGE_MAP, getLanguageName };
