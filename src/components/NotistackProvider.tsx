import React from 'react';
import { SnackbarProvider } from 'notistack';

interface NotistackProviderProps {
  children: React.ReactNode;
}

const NotificationProvider = ({ children }: NotistackProviderProps) => {
  return (
    <SnackbarProvider
      dense
      maxSnack={1}
      // preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      classes={{
        variantSuccess: 'notification-success',
        variantError: 'notification-error',
        variantInfo: 'notification-info'
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;
