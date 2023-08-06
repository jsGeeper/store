import { useContext } from 'react';
import { SnackbarContext } from '../contexts';

export const useSnackbar = () => {
  const context = useContext<any>(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};
