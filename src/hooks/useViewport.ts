import React from 'react';
import { viewportContext } from '../contexts';

const useViewport = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

export { useViewport };
