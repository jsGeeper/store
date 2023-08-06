import React from 'react';
import { authContext } from '../contexts';

const useGlobalAuth = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { triggerlogin, triggerSignUp, triggerLogout } = React.useContext(authContext);
  return {
    triggerlogin,
    triggerSignUp,
    triggerLogout
  };
};

export { useGlobalAuth };
