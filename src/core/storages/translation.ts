import React from 'react';

import { action, computed, makeObservable, observable } from 'mobx';
import { Language } from '@core/ui/types';

class LanguageStorage {
  @observable
  language: Language;

  @action
  setLanguage(language: Language) {
    this.language = language;
    localStorage.setItem('language', language);
  }

  constructor() {
    this.language = (localStorage.getItem('language') as Language) || import.meta.env.VITE_DEFAULT_LANGUAGE || 'en';
    makeObservable(this);
  }
}

export const languageStorage = new LanguageStorage();

export const useTranslation = () => {
  return languageStorage;
};
