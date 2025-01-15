import React from 'react';

import { Errors } from './Errors';
import { Modals } from './Modals';
import { Popovers } from './Popovers';

type Props = {
  children?: React.ReactNode;
};

export const UIAdapter: React.FC<Props> = ({ children }) => {
  // useUI?
  //console.log('UIAdapter: render');

  return (
    <>
      {children}
      <Popovers />
      <Modals />
      <Errors />
    </>
  );
};
