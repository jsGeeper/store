import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App';

import '@fontsource/inter';
import AuthProvider from './providers/auth.provider';
import ViewportProvider from './providers/viewport.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
      <ViewportProvider>
        <AuthProvider>
          <QueryClientProvider client={client}>
            <App />
          </QueryClientProvider>
        </AuthProvider>
      </ViewportProvider>
    </PersistGate>
  </Provider>
);
