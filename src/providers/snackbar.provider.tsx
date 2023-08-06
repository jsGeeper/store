import React, { useState, useCallback } from 'react';
import { SnackbarContext } from '../contexts';

type SnackbarType = 'success' | 'error' | 'warning' | 'info';

interface ISnackbarContext {
  children: React.ReactNode;
}

export const SnackbarProvider = ({ children }: ISnackbarContext) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('success');
  const [description, setDescription] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [onClick, setOnClick] = useState(() => {});
  const [linkText, setLinkText] = useState('');

  const showSnackbar = useCallback(
    (
      message: React.SetStateAction<string>,
      description: React.SetStateAction<string> = '',
      type: React.SetStateAction<SnackbarType> = 'success',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick = () => {},
      linkText = ''
    ) => {
      setMessage(message);
      setType(type);
      setDescription(description);
      setIsVisible(true);
      setOnClick(() => onClick);
      setLinkText(linkText);
    },
    []
  );
  const hideSnackbar = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <SnackbarContext.Provider
      value={{ isVisible, message, description, linkText, type, onClick, showSnackbar, hideSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
