import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from '@core/storages/translation';

type Props = {
  children?: React.ReactNode;
};

export const TranslationAdapter: React.FC<Props> = observer(({ children }) => {
  const translation = useTranslation();
  console.log(`Language switched to ${translation.language}`);
  return <>{children}</>;
});
